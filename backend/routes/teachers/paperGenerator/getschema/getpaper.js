var express = require('express');
var schemaRouter = express.Router();
var authenticate = require('../../../../authenticate');
var cors = require('../../../cors');

var question = require('../../../../models/questions');

const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars')
const readFile = utils.promisify(fs.readFile);

const random = require('random');
var seedrandom = require('seedrandom');
random.use(seedrandom('qpgenerator'));

schemaRouter.use(express.json());
schemaRouter.route('/:uid')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        question.findById(req.params.uid)
            .then((questions) => {
                var lens = {
                    easy: {
                        u1: questions['easy']['u1'].length,
                        u2: questions['easy']['u2'].length,
                        u3: questions['easy']['u3'].length,
                        u4: questions['easy']['u4'].length,
                        u5: questions['easy']['u5'].length,
                    },
                    medium: {
                        u1: questions['medium']['u1'].length,
                        u2: questions['medium']['u2'].length,
                        u3: questions['medium']['u3'].length,
                        u4: questions['medium']['u4'].length,
                        u5: questions['medium']['u5'].length,
                    },
                    hard: {
                        u1: questions['hard']['u1'].length,
                        u2: questions['hard']['u2'].length,
                        u3: questions['hard']['u3'].length,
                        u4: questions['hard']['u4'].length,
                        u5: questions['hard']['u5'].length,
                    }
                }
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/pdf');
                res.json({ sublens: lens });
            }).catch((err) => next(err));
    })
    .post((req, res, next) => {
        res.end('PUT Operation is not Performed');
    })
    .put((req, res, next) => {
        res.end('PUT Operation is not Performed');
    })
    .delete((req, res, next) => {
        res.end('DELETE Operation is not Performed');
    })


schemaRouter.route('/')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .get((req, res, next) => {
        res.end('GET Operation is not Performed');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, response, next) => {
        async function getTemplateHtml() {
            console.log("Loading template file in memory")
            try {
                const invoicePath = path.resolve("routes/teachers/paperGenerator/getschema" + "/demo.html");
                console.log(invoicePath);
                return await readFile(invoicePath, 'utf8');
            } catch (err) {
                return Promise.reject("Could not load html template");
            }
        }
        async function generatePdf() {
            const questions = await question.findById(req.body.id);
            let data = {
                code: req.body.value,
                subyear: req.body.deptYear,
                subsem: req.body.deptSem,
                month: req.body.month,
                year: req.body.year,
                subjectname: req.body.label,
                time: req.body.duration,
                maxMarks: req.body.maxMarks,
                details: req.body.sections
            };


            const randomBetween = (a, b) => {
                return Math.ceil((Math.random() * (b - a)) + a);
            };
            const randomBetweenRange = (num, range) => {
                const res = [];
                for (let i = 0; i < num;) {
                    const random = randomBetween(range[0], range[1]);
                    if (!res.includes(random)) {
                        res.push(random);
                        i++;
                    };
                };
                return res;
            }

            var units = ['u1', 'u2', 'u3', 'u4', 'u5'];

            for (var i = 0; i < data.details.length; i++) {
                data.details[i]['questions'] = [];
                for (var j = 0; j < units.length; j++) {
                    if (data.details[i][units[j]] !== '') {
                        var num = Number(data.details[i][units[j]]);
                        var range = [0, questions[data.details[i]['type']][units[j]].length - 1];
                        if (num <= (range[1]+1)) {
                            var randArray = randomBetweenRange(num, range);
                            for (var k = 0; k < randArray.length; k++){
                                data.details[i]['questions'].push(questions[data.details[i]['type']][units[j]][randArray[k]].name);
                                // console.log(questions[data.details[i]['type']][units[j]][randArray[k]]);
                            }
                        }
                    }
                }
            }

            function romanize(num) {
                if (isNaN(num))
                    return NaN;
                var digits = String(+num).split(""),
                    key = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM",
                        "", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC",
                        "", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"],
                    roman = "",
                    i = 3;
                while (i--)
                    roman = (key[+digits.pop() + (i * 10)] || "") + roman;
                return Array(+digits.join("") + 1).join("M") + roman;
            }

            getTemplateHtml().then(async (res) => {
                hb.registerHelper('section', function (data) {
                    console.log(data);
                    var str = '<section>';
                    for (var i = 1; i <= data.length; i++) {
                        if (data[i-1]['questions'].length > 0) {
                            str += '<section class="secdetails">\
                              <div>'+ romanize(i)+'. ' + data[i-1]['sname'] + '</div>\
                              <div>Marks: '+ data[i-1]['marks'] + '</div>\
                            </section>';
                            str += '<div> \
                                <ol> '
                            for (var j = 0; j < data[i-1]['questions'].length; j++) {
                                str+='<li class="question" style="margin-left: 5px;"> '+data[i-1]['questions'][j]+'</li>'
                            }
                            str += '</ol></div>';
                        }
                    }
                    str += '</section>'
                    return new hb.SafeString(str);
                });

                console.log("Compiling the template with handlebars")
                const template = hb.compile(res, { strict: true });
                const result = template(data);
                const html = result;
                const browser = await puppeteer.launch({
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                    ],
                });
                const page = await browser.newPage()
                await page.setContent(html)
                await page.pdf({
                    path: __dirname + '/demo.pdf',
                    preferCSSPageSize: true,
                    format: 'A4',
                    margin: {
                        top: '50px',
                        left: '20px',
                        right: '20px',
                        bottom: '20px'
                    }
                })
                await browser.close();
                console.log("PDF Generated");
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/pdf');
                response.sendFile(__dirname + '/demo.pdf');
            }).catch(err => {
                console.error(err)
            });
        }
        generatePdf();
    })
    .put((req, res, next) => {
        res.end('PUT Operation is not Performed');
    })
    .delete((req, res, next) => {
        res.end('DELETE Operation is not Performed');
    })
module.exports = schemaRouter;
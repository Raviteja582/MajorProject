var express = require('express');
var semRouter = express.Router();
var bodyparser = require('body-parser');
var authenticate = require('../../../../authenticate');
var cors = require('../../../cors');
var random = require('random');
var seedrandom = require('seedrandom');

var question = require('../../../../models/questions');

const fs = require('fs')
const path = require('path')
const utils = require('util')
const puppeteer = require('puppeteer')
const hb = require('handlebars');
const readFile = utils.promisify(fs.readFile);

random.use(seedrandom('qpgenerator'));
semRouter.use(express.json());
semRouter.route('/')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .get((req, res, next) => {
        res.end('GET Operation is not Performed');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, response, next) => {
        async function getTemplateHtml() {
            console.log("Loading template file in memory")
            try {
                const invoicePath = path.resolve(__dirname + "/demo.html");
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
                regulation: "R15",
                year: req.body.deptYear,
                sem: req.body.deptSem,
                subjectname: req.body.label,
                subjecttype: 'ACADEMIC',
                time: '3',
                marks: '70',
                squestion: [],
                lquestion: []
            };

            var units = ['u1', 'u2', 'u3', 'u4', 'u5']
            if (questions.easy[units[0]].length < 3 ||
                questions.easy[units[1]].length < 3 ||
                questions.easy[units[2]].length < 3 ||
                questions.easy[units[3]].length < 3 ||
                questions.easy[units[4]].length < 3 ||
                questions.medium[units[0]].length < 5 ||
                questions.medium[units[1]].length < 5 ||
                questions.medium[units[2]].length < 5 ||
                questions.medium[units[3]].length < 5 ||
                questions.medium[units[4]].length < 5 ||
                questions.hard[units[0]].length < 3 ||
                questions.hard[units[1]].length < 3 ||
                questions.hard[units[2]].length < 3 ||
                questions.hard[units[3]].length < 3 ||
                questions.hard[units[4]].length < 3) {

                response.statusCode = 403;
                response.send("Couldn't generate Paper for less number of questions.");

            }
            else {
                const ints = random.uniformInt(0, 5);
                var selectQuestions = new Set();
                var s2 = ints()
                while (selectQuestions.size < s2) {
                    var p = ints()
                    selectQuestions.add(p);
                }
                units.forEach((value) => {
                    var s1 = random.uniformInt(0, questions.easy[value].length - 1);
                    var a = s1(), b = s1();
                    while (a === b)
                        b = s1();
                    data.squestion.push(questions.easy[value][a].name)
                    data.squestion.push(questions.easy[value][b].name)
                })

                units.forEach((value, index) => {
                    if (selectQuestions.has(index)) {
                        var ser = new Set();
                        var serrand = random.uniformInt(0, questions.medium[value].length - 1);
                        while (ser.size < 4) {
                            ser.add(serrand());
                        }
                        var iterator = ser.keys();
                        // console.log(questions.medium[value][iterator.next()]);
                        data.lquestion.push({
                            '1': [
                                questions.medium[value][iterator.next().value].name,
                                questions.medium[value][iterator.next().value].name
                            ],
                            '2': [
                                questions.medium[value][iterator.next().value].name,
                                questions.medium[value][iterator.next().value].name,
                            ]
                        })
                    } else {
                        var s1 = random.uniformInt(0, questions.hard[value].length - 1);
                        var a = s1(), b = s1();
                        while (a === b)
                            b = s1();
                        data.lquestion.push({
                            '1': questions.hard[value][a].name,
                            '2': questions.hard[value][b].name
                        })
                    }
                })

                getTemplateHtml().then(async (res) => {

                    hb.registerHelper('small', function (data) {
                        var str = '<div class="questions">';
                        str += '<div class="question">' + '1. a)&nbsp' + data[0] + '</div>';
                        for (var i = 1; i < data.length; i++) {
                            str += '<div class="question">' + '&nbsp&nbsp&nbsp&nbsp' + String.fromCharCode(97 + i) + ')&nbsp' + data[i] + '</div>';
                        }
                        str += '</div>';
                        return new hb.SafeString(str);
                    });

                    hb.registerHelper('large', function (data) {
                        var str = '<div class="questions">';
                        var c = 2
                        for (var i = 0; i < data.length; i++) {
                            if (selectQuestions.has(i)) {
                                for (var j in data[i]) {
                                    str += '<div class="question">' + c + " " + '<span>' + String.fromCharCode(97) + ") " + data[i][j][0] + '</span>';
                                    str += '<div class="multi">';
                                    for (var k = 1; k < data[i][j].length; k++) {
                                        str += '<span>' + String.fromCharCode(97 + k) + ") " + data[i][j][k] + '</span>';
                                    }
                                    str += '</div></div>'
                                    if (j === '1') str += '<div class="limiters">OR</div>'
                                    else str += '<div class="limiters">***</div>'
                                    c += 1;
                                }
                            } else {
                                for (var key in data[i]) {
                                    str += '<div class="question">' + c + ' ' + data[i][key] + '</div>';
                                    if (key === '1') str += '<div class="limiters">OR</div>'
                                    else str += '<div class="limiters">***</div>'
                                    c += 1;
                                }
                            }
                        }
                        str += '</div>';
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
                    console.log("PDF Generated")
                    response.statusCode = 200;
                    response.setHeader('Content-Type', 'application/pdf');
                    response.sendFile(__dirname + '/demo.pdf');
                }).catch(err => {
                    console.error(err);
                    next(err);
                });
            }
        }
        generatePdf()
    })
    .put((req, res, next) => {
        res.end('PUT Operation is not Performed');
    })
    .delete((req, res, next) => {
        res.end('DELETE Operation is not Performed');
    })
module.exports = semRouter;
var express = require('express');
var mid2Router = express.Router();
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


mid2Router.use(express.json());
mid2Router.route('/')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .post(cors.corsWithOptions, authenticate.verifyUser, (req, response, next) => {
        async function getTemplateHtml() {
            console.log("Loading template file in memory")
            try {
                const invoicePath = path.resolve("routes/teachers/paperGenerator/getmid2" + "/demo.html");
                console.log(invoicePath);
                return await readFile(invoicePath, 'utf8');
            } catch (err) {
                return Promise.reject("Could not load html template");
            }
        }
        async function generatePdf() {
            const questions = await question.findById(req.body.id, { easy: 1, medium: 1 });
            let data = {
                image: "http://localhost:4200/demo.png",
                code: req.body.value,
                year: req.body.deptYear,
                sem: req.body.deptSem,
                subjectname: req.body.label,
                marks: '15',
                branch: 'CSE',
                starttime: req.body.starttime,
                endtime: req.body.endtime,
                date: req.body.date,
                month: req.body.month,
                Year: req.body.year,
                questions: []
            };

            var units = ['u3', 'u4', 'u5'];
            const ints = random.uniformInt(0, 2);

            var a = ints(), b = ints();
            while (a === b) {
                b = ints();
            }
            units.forEach((value, index) => {
                if (index == 2) {
                    if (a == index || b == index) {
                        var eas = random.uniformInt(1, questions.easy[value].length - 1);
                        var x1 = eas();
                        var x2 = eas();
                        while (x1 === x2) {
                            x2 = eas();
                        }
                        data.questions.push([
                            questions.easy[value][x1].name,
                            questions.easy[value][x2].name
                        ])
                    } else {
                        var med = random.uniformInt(1, questions.medium[value].length - 1);
                        var p = med();
                        data.questions.push(questions.medium[value][p].name);
                    }
                }
                else if (a === index || b === index) {
                    var ser = new Set();
                    var serrand = random.uniformInt(0, questions.easy[value].length - 1);
                    while (ser.size < 4) {
                        ser.add(serrand());
                    }
                    var iterator = ser.keys();
                    data.questions.push([
                        questions.easy[value][iterator.next().value].name,
                        questions.easy[value][iterator.next().value].name
                    ])
                    data.questions.push([
                        questions.easy[value][iterator.next().value].name,
                        questions.easy[value][iterator.next().value].name
                    ])
                } else {
                    var med = random.uniformInt(1, questions.medium[value].length - 1);
                    var p = med();
                    var q = med();
                    while (p === q) {
                        q = med();
                    }
                    data.questions.push(questions.medium[value][p].name);
                    data.questions.push(questions.medium[value][q].name);
                }
            })
            //console.log(data.questions);
            getTemplateHtml().then(async (res) => {

                hb.registerHelper('img', function (data) {

                    var str = '<img src = ' + '"' + data + '" ' + ' width="100px" height="90px" style="margin-left: 4em;" /> '
                    console.log(str);
                    return new hb.SafeString(str);
                })
                hb.registerHelper('question', function (data) {
                    var str = '';
                    for (var i = 0; i < data.length; i++) {
                        if (typeof (data[i]) === 'object') {
                            str + '<tr>'
                            str += '<td class="quetable cen">' + (i + 1) + String.fromCharCode(97) + ').' + '</td>';
                            str += '<td class="quetable tdcenter">' + data[i][0] + '</td>';
                            str += '<td class="quetable cen">' + 2 + '</td>';
                            str += '</tr>'
                            str += '<tr>'
                            str += '<td class="quetable cen">' + (i + 1) + String.fromCharCode(98) + ').' + '</td>';
                            str += '<td class="quetable tdcenter">' + data[i][1] + '</td>';
                            str += '<td class="quetable cen">' + 3 + '</td>';
                            str += '</tr>'
                        } else {
                            str += '<tr>'
                            str += '<td class="quetable cen">' + (i + 1) + ').' + '</td>';
                            str += '<td class="quetable tdcenter">' + data[i] + '</td>';
                            str += '<td class="quetable cen">' + 5 + '</td>';
                            str += '</tr>'
                        }
                        str += '</tr>';
                    }
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
                    landscape: true,
                    margin: {
                        top: '50px',
                        left: '20px',
                        right: '20px'
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
module.exports = mid2Router;
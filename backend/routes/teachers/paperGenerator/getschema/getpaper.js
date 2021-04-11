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
schemaRouter.route('/post')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .get((req, res, next) => {
        res.end('PUT Operation is not Performed');
    })
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
            //console.log(data.questions);
            getTemplateHtml().then(async (res) => {

                hb.registerHelper('question', function (data) {
                    var str = '';
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
    .put((req, res, next) => {
        res.end('PUT Operation is not Performed');
    })
    .delete((req, res, next) => {
        res.end('DELETE Operation is not Performed');
    })
module.exports = schemaRouter;
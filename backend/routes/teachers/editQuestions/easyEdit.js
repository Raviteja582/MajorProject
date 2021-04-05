var express = require('express');
var easyEditRouter = express.Router();
var authenticate = require('../../../authenticate');
var question = require('../../../models/questions');
var cors = require('../../cors');

easyEditRouter.use(express.json());
easyEditRouter.route('/get')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .get((req, res, next) => {
        res.end('GET operation is not Perfomed');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, response, next) => {
        try {
            if (req.body.unit === 'u1') {
                var questions = await question.findById(req.body.id, { "easy.u1": 1 })
                var teacherQuestions = questions.easy.u1.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else if (req.body.unit === 'u2') {
                var questions = await question.findById(req.body.id, { "easy.u2": 1 })
                var teacherQuestions = questions.easy.u2.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else if (req.body.unit === 'u3') {
                var questions = await question.findById(req.body.id, { "easy.u3": 1 })
                var teacherQuestions = questions.easy.u3.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else if (req.body.unit === 'u4') {
                var questions = await question.findById(req.body.id, { "easy.u4": 1 })
                var teacherQuestions = questions.easy.u4.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else {
                var questions = await question.findById(req.body.id, { "easy.u5": 1 })
                var teacherQuestions = questions.easy.u5.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    })
    .put((req, res, next) => {
        res.end('PUT operation is not perfromed');
    })
    .delete((req, res, next) => {
        res.end('DELETE Operation is not Performed');
    })
easyEditRouter.route('/put')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .get((req,res,next)=>{
        res.end('GET operation is not perfromed');
    })
    .post((req,res,next)=>{
        res.end('POST operation is not perfromed');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, async (req, response, next) => {
        try {
            if (req.body.unit === 'u1') {
                question.updateOne({ _id: req.body.id }, { $pull: { "easy.u1": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "easy.u1": 1 });
                for (var i = 0; i < req.body.easy.length; i++) {
                    data.easy.u1.push(req.body.easy[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });
            } else if (req.body.unit === 'u2') {
                question.updateOne({ _id: req.body.id }, { $pull: { "easy.u2": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "easy.u2": 1 });
                for (var i = 0; i < req.body.easy.length; i++) {
                    data.easy.u2.push(req.body.easy[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });

            } else if (req.body.unit === 'u3') {
                question.updateOne({ _id: req.body.id }, { $pull: { "easy.u3": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "easy.u3": 1 });
                for (var i = 0; i < req.body.easy.length; i++) {
                    data.easy.u3.push(req.body.easy[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });

            } else if (req.body.unit === 'u4') {
                question.updateOne({ _id: req.body.id }, { $pull: { "easy.u4": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "easy.u4": 1 });
                for (var i = 0; i < req.body.easy.length; i++) {
                    data.easy.u4.push(req.body.easy[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });

            } else {
                question.updateOne({ _id: req.body.id }, { $pull: { "easy.u5": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "easy.u5": 1 });
                for (var i = 0; i < req.body.easy.length; i++) {
                    data.easy.u5.push(req.body.easy[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });
            }
        } catch (err) {
            console.log(err);
            next(err);
        }
    })
    .delete((req,res,next)=>{
        res.end('DELETE Operation is not Performed');
    })
module.exports = easyEditRouter;
var express = require('express');
var hardEditRouter = express.Router();
var authenticate = require('../../../authenticate');
var question = require('../../../models/questions');
var cors = require('../../cors');

hardEditRouter.use(express.json());
hardEditRouter.route('/get')
    .options(cors.corsWithOptions, (req, resp) => { resp.sendStatus(200); })
    .get((req, res, next) => {
        res.end('GET operation is not Perfomed');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, async (req, response, next) => {
        try {
            if (req.body.unit === 'u1') {
                var questions = await question.findById(req.body.id, { "hard.u1": 1 })
                var teacherQuestions = questions.hard.u1.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else if (req.body.unit === 'u2') {
                var questions = await question.findById(req.body.id, { "hard.u2": 1 })
                var teacherQuestions = questions.hard.u2.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else if (req.body.unit === 'u3') {
                var questions = await question.findById(req.body.id, { "hard.u3": 1 })
                var teacherQuestions = questions.hard.u3.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else if (req.body.unit === 'u4') {
                var questions = await question.findById(req.body.id, { "hard.u4": 1 })
                var teacherQuestions = questions.hard.u4.filter((data) => {
                    return data.teacher.equals(req.user._id);
                })
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json(teacherQuestions);
            } else {
                var questions = await question.findById(req.body.id, { "hard.u5": 1 })
                var teacherQuestions = questions.hard.u5.filter((data) => {
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
hardEditRouter.route('/put')
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
                question.updateOne({ _id: req.body.id }, { $pull: { "hard.u1": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "hard.u1": 1 });
                for (var i = 0; i < req.body.hard.length; i++) {
                    data.hard.u1.push(req.body.hard[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });
            } else if (req.body.unit === 'u2') {
                question.updateOne({ _id: req.body.id }, { $pull: { "hard.u2": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "hard.u2": 1 });
                for (var i = 0; i < req.body.hard.length; i++) {
                    data.hard.u2.push(req.body.hard[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });

            } else if (req.body.unit === 'u3') {
                question.updateOne({ _id: req.body.id }, { $pull: { "hard.u3": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "hard.u3": 1 });
                for (var i = 0; i < req.body.hard.length; i++) {
                    data.hard.u3.push(req.body.hard[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });

            } else if (req.body.unit === 'u4') {
                question.updateOne({ _id: req.body.id }, { $pull: { "hard.u4": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "hard.u4": 1 });
                for (var i = 0; i < req.body.hard.length; i++) {
                    data.hard.u4.push(req.body.hard[i]);
                }
                await data.save()
                response.statusCode = 200;
                response.setHeader('Content-Type', 'application/json');
                response.json({ success: true });

            } else {
                question.updateOne({ _id: req.body.id }, { $pull: { "hard.u5": { teacher: req.user._id } } }, { multi: true }).then((sx) => {
                    console.log('success');
                }).catch((err) => next(err));
                var data = await question.findById(req.body.id, { "hard.u5": 1 });
                for (var i = 0; i < req.body.hard.length; i++) {
                    data.hard.u5.push(req.body.hard[i]);
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
module.exports = hardEditRouter;
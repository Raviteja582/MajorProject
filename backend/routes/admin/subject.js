var express = require('express');
var subjectRouter = express.Router();
var bodyparser = require('body-parser');
var authenticate = require('../../authenticate');
var cors = require('../cors');
var subject = require('../../models/subject');
var department = require('../../models/department');

subjectRouter.use(express.json());

subjectRouter.route('/get')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET Operation is not Permitted');
    })
    .post(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, async (req, res, next) => {
        if (req.body.name && req.body.year && req.body.sem) {
            department.findOne({
                $and: [
                    { name: req.body.name },
                    { year: req.body.year },
                    { semester: req.body.sem }
                ]
            })
                .then(async (dept) => {
                    if (dept !== null) {
                        var list1 = [];
                        var subs = await subject.find({ department: dept._id })
                        for (var j = 0; j < subs.length; j++) {
                            list1.push({
                                sname: subs[j].name,
                                scode: subs[j].code,
                                dname: dept.value,
                                year: dept.year,
                                sem: dept.semester
                            })
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            success: true,
                            list: list1
                        })
                    } else {
                        err = new Error('Cannot find the department');
                        err.statusCode = 404;
                        return next(err);
                    }
                })
                .catch((err) => next(err));
        }
        else if (req.body.name && req.body.year) {
            department.find({
                $and: [
                    { name: req.body.name },
                    { year: req.body.year }
                ]
            })
                .then(async (dept) => {
                    if (dept !== null) {
                        var list1 = [];
                        for (var i = 0; i < dept.length; i++) {
                            var subs = await subject.find({ department: dept[i]._id })
                            for (var j = 0; j < subs.length; j++) {
                                list1.push({
                                    sname: subs[j].name,
                                    scode: subs[j].code,
                                    dname: dept[i].value,
                                    year: dept[i].year,
                                    sem: dept[i].semester
                                })
                            }
                        }
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({
                            success: true,
                            list: list1
                        });
                    }
                })
                .catch((err) => next(err));
        }
        else if (req.body.code) {
            var sub = await subject.findOne({ code: req.body.code });
            if (sub !== null) {
                console.log(sub);
                var dept = await department.findById(sub.department);
                console.log(dept);
                var list1 = [{
                    scode: sub.code,
                    sname: sub.name,
                    dname: dept.value,
                    year: dept.year,
                    sem: dept.semester
                }]
                res.statusCode = 200;
                console.log(list1);
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    success: true,
                    list: list1
                });
            }
            else {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json({
                    success: false,
                });
            }
        }
        else {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({
                success: false,
            });
        }
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT Operation is not Permitted');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT Operation is not Permitted');
    })

subjectRouter.route('/GetandAddandRemove')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET Operation is not Permitted');
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        department.findOne({
            $and: [
                { name: req.body.department.value },
                { year: req.body.year.value },
                { semester: req.body.semester.value }
            ]
        })
            .then((dept) => {
                if (dept !== null) {
                    subject.insertMany({
                        name: req.body.sname,
                        code: req.body.scode,
                        department: dept._id,
                    }, { ordered: false })
                        .then(subs => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json({
                                success: true
                            });
                        })
                        .catch((err) => next(err));
                } else {
                    err = new Error('Cannot find the department');
                    err.statusCode = 404;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })

    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT Operation is not Permitted');
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        subject.deleteOne({ code: req.body.id })
            .then((resp) => {
                if (resp.n !== 0) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        success: true,
                    });
                } else {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json({
                        success: false,
                    });
                }
            }).catch((err) => next(err));
    })

subjectRouter.route('/:subjectId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        subject.findById(req.params.subjectId)
            .then((sub) => {
                if (sub !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(sub);
                }
                else {
                    err = new Error('Cannot find Subject');
                    err.statusCode = 403;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST Operation is not permitted');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        subject.findById(req.params.subjectId)
            .then((sub) => {
                if (sub !== null) {
                    subject.findByIdAndUpdate(req.params.subjectId, {
                        $set: req.body
                    }, { new: true })
                        .then((sub) => {
                            res.statusCode = 200;
                            res.setHeader('Content-Type', 'application/json');
                            res.json(sub);
                        })
                        .catch((err) => next(err));
                }
                else {
                    err = new Error('No Subject found');
                    err.statusCode = 403;
                    return next(err);
                }
            })
            .catch((sub) => next(err));
    })
    .delete(cors.corsWithOptions, authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        subject.findByIdAndDelete(req.params.subjectId)
            .then((resp) => {
                if (resp !== null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(resp);
                }
                else {
                    err = new Error('Cannot find Subject');
                    err.statusCode = 403;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })

module.exports = subjectRouter

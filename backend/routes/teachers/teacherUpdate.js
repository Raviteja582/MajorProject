var express = require('express');
var updateRouter = express.Router();
var mongoose = require('mongoose');
var teacher = require('../../models/teachers');
var authenticate = require('../../authenticate');
var cors = require('../cors');
updateRouter.use(express.json());

updateRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end('GET operation is not permitted');
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation is not permitted');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        teacher.findById(req.user._id)
            .then((user) => {
                if (user !== null) {
                    console.log(user);
                    teacher.findByIdAndUpdate(req.user._id, {
                        $set: req.body
                    }, { new: true })
                        .then((user) => {
                            user.setPassword(req.body.password)
                                .then((user) => {
                                    user.save();
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(user);
                                })
                                .catch((err) => next(err));
                        })
                        .catch((err) => next(err));
                }
                else {
                    err = new Error('No user found');
                    err.statusCode = 403;
                    return next(err);
                }
            })
            .catch((err) => next(err));
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE Operation is not permitted');
    });

module.exports = updateRouter;

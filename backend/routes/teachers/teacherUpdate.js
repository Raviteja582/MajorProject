var express = require('express');
var updateRouter = express.Router();
var mongoose = require('mongoose');
var teacher = require('../../models/teachers');
var authenticate = require('../../authenticate');
var cors = require('../cors');
const nodemailer = require("nodemailer");
updateRouter.use(express.json());

updateRouter.route('/')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, authenticate.verifyUser, (req, res, next) => {
        teacher.findById(req.user._id, { hash: 0, salt: 0 })
            .then((user) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            }).catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation is not permitted');
    })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        teacher.findById(req.user._id)
            .then((user) => {
                if (user !== null) {
                    if (user.username !== req.body.username) {
                        req.body.isauth = false
                        let transporter = nodemailer.createTransport({
                            service: "gmail",
                            auth: {
                                user: "qpgeneratorbvrit@gmail.com",
                                pass: "uamaeefhzwwnlrtq",
                            },
                        });
                        var url =
                            "http://localhost:3000/user/" + user._id;
                        var mailOptions = {
                            from:
                                "no-replyAdmin <qpgeneratorbvrit@gmail.com>",
                            to: req.body.username,
                            subject: "Email Id is Changed",
                            text: "Email for the Account is Changed",
                            html: `<p>To Complete Your Email Updation, please click on the below link</p><br><br><a href=${url}>Update</a>`,
                        };
                        transporter
                            .sendMail(mailOptions)
                            .then((err, info) => {
                                if (!err) {
                                    res.statusCode = 200;
                                    res.setHeader("Content-Type", "application/json");
                                    res.json({
                                        success: false,
                                        message: "Cannot Sent Mail to your email-id, Please Provide a Valid Eamil ID."
                                    });
                                } else {
                                    teacher.findByIdAndUpdate(req.user._id, {
                                        $set: req.body
                                    }, { new: true })
                                        .then((user) => {
                                            user.setPassword(req.body.password)
                                                .then((user) => {
                                                    user.save();
                                                    res.statusCode = 200;
                                                    res.setHeader('Content-Type', 'application/json');
                                                    res.json({
                                                        success: true,
                                                        user: user,
                                                    });
                                                })
                                                .catch((err) => next(err));
                                        })
                                        .catch((err) => next(err));
                                }
                            })
                            .catch((err) => next(err));
                    } else {
                        teacher.findByIdAndUpdate(req.user._id, {
                            $set: req.body
                        }, { new: true })
                            .then((user) => {
                                user.setPassword(req.body.password)
                                    .then((user) => {
                                        user.save();
                                        res.statusCode = 200;
                                        res.setHeader('Content-Type', 'application/json');
                                        res.json({
                                            success: true,
                                            user: user,
                                        });
                                    })
                                    .catch((err) => next(err));
                            })
                            .catch((err) => next(err));
                    }
                }
                else {
                    err = new Error('No user found');
                    err.statusCode = 403;
                    return next(err);
                }
            })
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE Operation is not permitted');
    });

module.exports = updateRouter;

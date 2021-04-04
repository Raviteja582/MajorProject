var express = require("express");
var teacherRouter = express.Router();
var passport = require("passport");

const cors = require("../cors");
const nodemailer = require("nodemailer");

var teacher = require("../../models/teachers");

teacherRouter.use(express.json());

teacherRouter
    .route("/")
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.end("Get operation is not permitted");
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        teacher.register(
            new teacher({ username: req.body.username }),
            req.body.password,
            (err, user) => {
                if (err) {
                    res.statusCode = 500;
                    res.setHeader("Content-Type", "application/json");
                    console.log(err);
                    res.json({ err: err });
                } else {
                    user.firstname = req.body.firstname;
                    user.lastname = req.body.lastname;
                    user.email = req.body.email;
                    user.phno = req.body.phno;
                    user.dob = req.body.dob;
                    user.save((err, user) => {
                        if (err) {
                            res.statusCode = 500;
                            res.setHeader("Content-Type", "application-json");
                            res.json({ err: err });
                            return;
                        } else {
                            let transporter = nodemailer.createTransport({
                                service: "gmail",
                                auth: {
                                    user: "qpgeneratorbvrit@gmail.com",
                                    pass: "uamaeefhzwwnlrtq",
                                },
                            });
                            // var url = 'https://questionpaper07.herokuapp.com/user/'+user._id;
                            var url =
                                "http://localhost:3000/user/" +
                                user._id;
                            var mailOptions = {
                                from:
                                    "no-replyAdmin <qpgeneratorbvrit@gmail.com>",
                                to: user.email,
                                subject: "Confirmation of Registration",
                                text: "You are Successful Registered",
                                html: `<p>To Complete Your Registration, please click on the link</p><br><a href=${url}>Register</a>`,
                            };
                            transporter
                                .sendMail(mailOptions)
                                .then((err, info) => {
                                    if (!err) {
                                        console.log(err);
                                        err = new Error(
                                            "Cannot Sent Mail to your email-id"
                                        );
                                        err.statusCode = 404;
                                        return next(err);
                                    } else {
                                        passport.authenticate("local")(
                                            req,
                                            res,
                                            () => {
                                                res.statusCode = 200;
                                                res.setHeader(
                                                    "Content-Type",
                                                    "application/json"
                                                );
                                                res.json({
                                                    success: true,
                                                    status:
                                                        "Registration Successful!",
                                                });
                                            }
                                        );
                                    }
                                })
                                .catch((err) => next(err));
                        }
                    });
                }
            }
        );
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation is not permitted");
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end("DELETE operation is not permitted");
    });
module.exports = teacherRouter;

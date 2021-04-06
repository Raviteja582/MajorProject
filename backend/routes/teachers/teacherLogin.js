var express = require("express");
var TeacherRouter = express.Router();
var cors = require("../cors");
var passport = require("passport");
var authenticate = require("../../authenticate");


TeacherRouter.use(express.json());

TeacherRouter.route("/")
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors, (req, res, next) => {
        res.statusCode = 403;
        res.setHeader("Content-Type", "text");
        res.end("Get Operation is not permitted");
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        passport.authenticate("local", (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({
                    status: false,
                    err: "Cannot find Username with " + req.body.username,
                });
            }

            req.logIn(user, (err) => {
                if (err) {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                        status: false,
                        err: "Username or Password is incorrect!!!",
                    });
                } else if (user.isauth) {
                    var token = authenticate.getToken({ _id: req.user._id });
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                        token: token,
                        status: true,
                        user: {
                            user: user.username,
                            id: user._id,
                        }
                    });
                } else {
                    res.statusCode = 200;
                    res.setHeader("Content-Type", "application/json");
                    res.json({
                        status: "VERIFY",
                        err:
                            "Please Complete your Signin process with verification by Email!!!",
                    });
                }
            });
        })(req, res, next);
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end("PUT operation not supported");
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 403;
        res.end("Delete operation not supported");
    });

module.exports = TeacherRouter;

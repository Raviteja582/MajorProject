var express = require('express');
var user = require('../../models/teachers');
var userRouter = express.Router();
var cors = require('../cors');
userRouter.use(express.json());

userRouter.route('/:userId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.cors, (req, res, next) => {
        user.findById(req.params.userId)
            .then((teacher) => {
                user.findByIdAndUpdate(req.params.userId, {
                    $set: { 'isauth': true }
                })
                    .then((teacher) => {
                        res.statusCode = 200;
                        res.setHeader('Content-Type', 'application/json');
                        res.json({ sucess: true });
                    })
                    .catch((err) => next(err));
            })
            .catch((err) => next(err));
    })
    .post(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 401;
        res.end('POST Operation is not Permitted');
    })
    .put(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 401;
        res.end('PUT Operation is not Permitted');
    })
    .delete(cors.corsWithOptions, (req, res, next) => {
        res.statusCode = 401;
        res.end('DELETE Operation is not Permitted');
    })

module.exports = userRouter;

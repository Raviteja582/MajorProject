var express = require('express');
var questionRouter = express.Router()
var bodyParser = require('body-parser');
var question = require('../../models/questions');
var authenticate = require('../../authenticate');
var cors = require('../cors');
questionRouter.use(bodyParser.json());

questionRouter.route('/post')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        for (sub in req.body) {
            question.findOne({ subject: sub })
                .then((subjec) => {
                    if (subjec === null) {
                        question.create({
                            subject: sub,
                            easy: req.body[sub].easy,
                            medium: req.body[sub].medium,
                            hard: req.body[sub].hard
                        })
                            .then((resp) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({ success: true });
                            }).catch((err) => {
                                console.log(err);
                                next(err);
                            })
                    }
                    else {
                        // easy push

                        // U1 push
                        if (req.body[sub].easy.u1.length != 0)
                            for (var i = 0; i < req.body[sub].easy.u1.length; i++)
                                subjec.easy.u1.push(req.body[sub].easy.u1[i]);
                        
                        // U2 push
                        if (req.body[sub].easy.u2.length != 0)
                            for (var i = 0; i < req.body[sub].easy.u2.length; i++)
                                subjec.easy.u2.push(req.body[sub].easy.u2[i]);
                        
                        // U3 push
                        if (req.body[sub].easy.u3.length != 0)
                            for (var i = 0; i < req.body[sub].easy.u3.length; i++)
                                subjec.easy.u3.push(req.body[sub].easy.u3[i]);
                        
                        //U4 push
                        if (req.body[sub].easy.u4.length != 0)
                            for (var i = 0; i < req.body[sub].easy.u4.length; i++)
                                subjec.easy.u4.push(req.body[sub].easy.u4[i]);
                        
                        //U5 push
                        if (req.body[sub].easy.u5.length != 0)
                            for (var i = 0; i < req.body[sub].easy.u5.length; i++)
                                subjec.easy.u5.push(req.body[sub].easy.u5[i]);

                        // medium push

                        // U1 push
                        if (req.body[sub].medium.u1.length != 0)
                            for (var i = 0; i < req.body[sub].medium.u1.length; i++)
                                subjec.medium.u1.push(req.body[sub].medium.u1[i]);
                        
                        // U2 push
                        if (req.body[sub].medium.u2.length != 0)
                            for (var i = 0; i < req.body[sub].medium.u2.length; i++)
                                subjec.medium.u2.push(req.body[sub].medium.u2[i]);
                        
                        // U3 push
                        if (req.body[sub].medium.u3.length != 0)
                            for (var i = 0; i < req.body[sub].medium.u3.length; i++)
                                subjec.medium.u3.push(req.body[sub].medium.u3[i]);
                        
                        // U4 push
                        if (req.body[sub].medium.u4.length != 0)
                            for (var i = 0; i < req.body[sub].medium.u4.length; i++)
                                subjec.medium.u4.push(req.body[sub].medium.u4[i]);
                        
                        // U5 push
                        if (req.body[sub].medium.u5.length != 0)
                            for (var i = 0; i < req.body[sub].medium.u5.length; i++)
                                subjec.medium.u5.push(req.body[sub].medium.u5[i]);

                        // hard push

                        // U1 push
                        if (req.body[sub].hard.u1.length != 0)
                            for (var i = 0; i < req.body[sub].hard.u1.length; i++)
                                subjec.hard.u1.push(req.body[sub].hard.u1[i]);
                        
                        // U2 push
                        if (req.body[sub].hard.u2.length != 0)
                            for (var i = 0; i < req.body[sub].hard.u2.length; i++)
                                subjec.hard.u2.push(req.body[sub].hard.u2[i]);
                        
                        // U3 push
                        if (req.body[sub].hard.u3.length != 0)
                            for (var i = 0; i < req.body[sub].hard.u3.length; i++)
                                subjec.hard.u3.push(req.body[sub].hard.u3[i]);
                        
                        // U4 push
                        if (req.body[sub].hard.u4.length != 0)
                            for (var i = 0; i < req.body[sub].hard.u4.length; i++)
                                subjec.hard.u4.push(req.body[sub].hard.u4[i]);
                        
                        // U5 push
                        if (req.body[sub].hard.u5.length != 0)
                            for (var i = 0; i < req.body[sub].hard.u5.length; i++)
                                subjec.hard.u5.push(req.body[sub].hard.u5[i]);
                        
                        subjec.save()
                            .then((resps) => {
                                res.statusCode = 200;
                                res.setHeader('Content-Type', 'application/json');
                                res.json({ success: true });
                            }).catch(err => next(err))
                    }
                }).catch(err => next(err))
        }
    })
    
module.exports = questionRouter;
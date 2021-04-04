var express = require('express');
var questionRouter = express.Router()
var question = require('../../models/questions');
var authenticate = require('../../authenticate');
var cors = require('../cors');
questionRouter.use(express.json());

questionRouter.route('/get')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .get(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        question.find({}, { subject: 1, _id: 1 })
            .populate({
                path: "subject",
                populate: {
                    path: "department"
                }
            })
            .then((list) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(list);
            }).catch((err) => next(err))
    })


questionRouter.route('/post')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
    .put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
        async function insert(id) {
            var data = await question.findOne({ subject: id });
            if (data === null) {
                var sub = await question.insertMany({
                    subject: id,
                    easy: req.body[id].easy,
                    medium: req.body[id].medium,
                    hard: req.body[id].hard
                })
                return sub;
            } else {
                if (req.body[id].easy.u1.length != 0)
                    for (var i = 0; i < req.body[id].easy.u1.length; i++)
                        data.easy.u1.push(req.body[id].easy.u1[i]);

                // U2 push
                if (req.body[id].easy.u2.length != 0)
                    for (var i = 0; i < req.body[id].easy.u2.length; i++)
                        data.easy.u2.push(req.body[id].easy.u2[i]);

                // U3 push
                if (req.body[id].easy.u3.length != 0)
                    for (var i = 0; i < req.body[id].easy.u3.length; i++)
                        data.easy.u3.push(req.body[id].easy.u3[i]);

                //U4 push
                if (req.body[id].easy.u4.length != 0)
                    for (var i = 0; i < req.body[id].easy.u4.length; i++)
                        data.easy.u4.push(req.body[id].easy.u4[i]);

                //U5 push
                if (req.body[id].easy.u5.length != 0)
                    for (var i = 0; i < req.body[id].easy.u5.length; i++)
                        data.easy.u5.push(req.body[id].easy.u5[i]);

                // medium push

                // U1 push
                if (req.body[id].medium.u1.length != 0)
                    for (var i = 0; i < req.body[id].medium.u1.length; i++)
                        data.medium.u1.push(req.body[id].medium.u1[i]);

                // U2 push
                if (req.body[id].medium.u2.length != 0)
                    for (var i = 0; i < req.body[id].medium.u2.length; i++)
                        data.medium.u2.push(req.body[id].medium.u2[i]);

                // U3 push
                if (req.body[id].medium.u3.length != 0)
                    for (var i = 0; i < req.body[id].medium.u3.length; i++)
                        data.medium.u3.push(req.body[id].medium.u3[i]);

                // U4 push
                if (req.body[id].medium.u4.length != 0)
                    for (var i = 0; i < req.body[id].medium.u4.length; i++)
                        data.medium.u4.push(req.body[id].medium.u4[i]);

                // U5 push
                if (req.body[id].medium.u5.length != 0)
                    for (var i = 0; i < req.body[id].medium.u5.length; i++)
                        data.medium.u5.push(req.body[id].medium.u5[i]);

                // hard push

                // U1 push
                if (req.body[id].hard.u1.length != 0)
                    for (var i = 0; i < req.body[id].hard.u1.length; i++)
                        data.hard.u1.push(req.body[id].hard.u1[i]);

                // U2 push
                if (req.body[id].hard.u2.length != 0)
                    for (var i = 0; i < req.body[id].hard.u2.length; i++)
                        data.hard.u2.push(req.body[id].hard.u2[i]);

                // U3 push
                if (req.body[id].hard.u3.length != 0)
                    for (var i = 0; i < req.body[id].hard.u3.length; i++)
                        data.hard.u3.push(req.body[id].hard.u3[i]);

                // U4 push
                if (req.body[id].hard.u4.length != 0)
                    for (var i = 0; i < req.body[id].hard.u4.length; i++)
                        data.hard.u4.push(req.body[id].hard.u4[i]);

                // U5 push
                if (req.body[id].hard.u5.length != 0)
                    for (var i = 0; i < req.body[id].hard.u5.length; i++)
                        data.hard.u5.push(req.body[id].hard.u5[i]);
                
                var x = await data.save()
                return x;
            }
        }
        for (id in req.body) {
            v = insert(id);
            v.then(async (res) => {
                console.log(res);
            }).catch((err) => next(err));
        }
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true });
    })

module.exports = questionRouter;
var express = require('express');
var questionRouter = express.Router()
var bodyParser = require('body-parser');
var question = require('../../models/question');
var authenticate = require('../../authenticate');

questionRouter.use(bodyParser.json());

questionRouter.route('/:subjectId')
.get(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=503;
    res.end('Not yet Done');
})
.post(authenticate.verifyUser,(req,res,next)=>{
    req.body.teacher=req.user._id;
    req.body.subject=req.params.subjectId;
    question.create(req.body)
    .then((quest)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quest);
    })
    .catch((err)=>{
        next(err);
    })
})
.put((req,res,next)=>{
    res.statusCode=404;
    res.end('PUT Operaion is permitted');
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    question.deleteMany({subject:req.params.subjectId})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err)=> next(err));
})


module.exports=questionRouter;

var express = require('express');
var subjectRouter = express.Router();
var bodyparser = require('body-parser');
var authenticate = require('../../authenticate');
var cors = require('../cors');
var subject = require('../../models/subject');

subjectRouter.use(bodyparser.json());
subjectRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, authenticate.verifyUser,(req,res,next)=>{
    subject.find()
    .populate({
        path: "department"
    })
    .then((subs) => {
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(subs);
    })
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.end('POST operation is not Perfomed');
})
.put((req,res,next)=>{
    res.end('PUT operation is not perfromed');
})
.delete((req,res,next)=>{
    res.end('DELETE Operation is not Performed');
})

module.exports=subjectRouter;

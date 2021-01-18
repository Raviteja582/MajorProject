var express=require('express');
var updateRouter= express.Router();
var bodyParser= require('body-parser');
var mongoose= require('mongoose');
var teacher= require('../../models/teachers');
var authenticate=require('../../authenticate');

updateRouter.use(bodyParser.json());

updateRouter.route('/')
.get((req,res,next)=>{
    res.statusCode=403;
    res.end('GET operation is not permitted');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation is not permitted');
})
.put(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=200;
    res.setHeader('Content-Type', 'application/json');
    res.json(req.user);
})
.delete((req,res,next)=>{
    res.statusCode=403;
    res.end('DELETE Operation is not permitted');
});

module.exports=updateRouter;

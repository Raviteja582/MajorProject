var express = require('express');
var subjectRouter = express.Router();
var bodyparser = require('body-parser');
var authenticate = require('../../authenticate');
var cors = require('../cors');
var subject = require('../../models/subject');
var department=require('../../models/department');

subjectRouter.use(bodyparser.json());
subjectRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    if(req.body.departmentName&&req.body.year&&req.body.semester){
        department.findOne({
            $and:[
              {name:req.body.departmentName},
              {year:req.body.year},
              {semester:req.body.semester}
            ]
        })
        .then((dept)=>{
            if(dept!==null){
                subject.find({department:dept._id})
                .then((sub)=>{
                    res.statusCode=200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(sub);
                })
            }else{
                err = new Error('Cannot find the department');
                err.statusCode=404;
                return next(err);
            }
        })
        .catch((err)=> next(err));
    }
    else if(req.body.departmentName&&req.body.year){
        department.find({
            $and:[
                {name:req.body.departmentName},
                {year:req.body.year}
            ]
        })
        .then((dept)=>{
            if(dept!==null){
              a=Array();
              dept.map((depart)=>{
                  subject.findById(depart._id)
                  .then((sub)=>{
                      a.push(sub);
                  })
              })
              res.statusCode=200;
              res.setHeader('Content-Type', 'application/json');
              res.json(a);
            }
        })
        .catch((err)=> next(err));
    }
    else{
        err = new Error('Specify Year for the Department');
        err.statusCode=404;
        return next(err);
    }
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    subject.insertMany(req.body,{ordered: false})
    .then( subs => {
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(subs);
    })
    .catch((err) => next(err));
})

.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT Operation is not Permitted');
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    if(req.body.departmentName&&req.body.year&&req.body.semester){
        department.findOne({
            $and:[
                {name:req.body.departmentName},
                {year:req.body.year},
                {semester:req.body.semester}
            ]
        })
        .then((dept)=>{
            subject.deleteMany({department:dept._id})
            .then((resp)=>{
                res.statusCode=200;
                res.setHeader('Content-Type','application/json');
                res.json(resp);
            })
            .catch((err)=>next(err));
        })
        .catch((err)=>next(err));
    }
    else{
        err = new Error('Cannot find the Department');
        err.statusCode=403;
        return next(err);
    }
})

subjectRouter.route('/:subjectId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    subject.findById(req.params.subjectId)
    .then((sub)=>{
      if(sub!==null){
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(sub);
      }
      else{
          err = new Error('Cannot find Subject');
          err.statusCode=403;
          return next(err);
      }
    })
    .catch((err)=>next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('POST Operation is not permitted');
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    subject.findById(req.params.subjectId)
    .then((sub)=>{
      if(sub!==null){
        subject.findByIdAndUpdate(req.params.subjectId, {
            $set:req.body
        }, {new :true})
        .then((sub)=>{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json(sub);
        })
        .catch((err)=>next(err));
      }
      else{
          err = new Error('No Subject found');
          err.statusCode=403;
          return next(err);
      }
    })
    .catch((sub)=>next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    subject.findByIdAndDelete(req.params.subjectId)
    .then((resp)=>{
      if(resp!==null){
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json(resp);
      }
      else{
          err = new Error('Cannot find Subject');
          err.statusCode=403;
          return next(err);
      }
    })
    .catch((err)=>next(err));
})

module.exports=subjectRouter

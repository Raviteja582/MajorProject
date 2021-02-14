const express = require('express');
const bodyParser =require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../../authenticate');
const department=require('../../models/department');
var cors = require('../cors');
const addDepartment= express.Router();

addDepartment.use(bodyParser.json());

addDepartment.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    department.find({})
    .then((department)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(department);
    })
    .catch((err)=>{
        next(err);
    })
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
  department.findOne({
      $and:[
          {name:req.body.name},
          {year:req.body.year},
          {semester:req.body.semester}
      ]
  })
  .then((dept)=>{
      if(dept==null){
        department.create(req.body)
        .then((department)=>{
            res.statusCode=200;
            res.setHeader('Content-Type','application/json');
            res.json(department);
        })
        .catch((err)=> next(err));
      }
      else{
          err= new Error('Department already Exists');
          err.statusCode=404;
          return next(err);
      }
  })
  .catch((err)=>next(err));
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=403;
    res.end('PUT Opeartion is not permitted');
})
.delete(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=403;
    res.end('DELETE Operation is not permitted');
})

addDepartment.route('/:departmentId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    department.findById(req.params.departmentId)
    .then((department)=>{
        if(department!==null){
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json(department);
        }
        else{
            err = new Error('No Department is found');
            err.statusCode=404;
            return next(err);
        }
    })
    .catch((err) => next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    res.statusCode=403;
    res.end('POST operation is not permitted');
})
.put(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    department.findById(req.params.departmentId)
    .then((dept)=>{
          if(dept!==null){
              department.findByIdAndUpdate(req.params.departmentId, { $set: req.body}, {new: true})
            .then((depart)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
              res.send(depart);
            })
            .catch((err)=>next(err));
          }
      else{
          err = new Error('Department not found');
          err.statusCode=404;
          return next(err);
      }
    })
    .catch((err)=> next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    department.findById(req.params.departmentId)
    .then((depart)=>{
        if(depart!=null){
            department.findByIdAndRemove(req.params.departmentId)
            .then((resp)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
              res.json(resp);
            })
            .catch((err)=> next(err));
        }
      else{
          err = new Error('Department not found');
          err.statusCode=404;
          return next(err);
      }
    })
    .catch((err)=> next(err));
})
module.exports=addDepartment;

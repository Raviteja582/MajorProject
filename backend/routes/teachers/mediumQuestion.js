var express = require('express');
var mediumRouter= express.Router()
var bodyParser = require('body-parser');
var medium= require('../../models/medium');
var authenticate = require('../../authenticate');
const cors =require('../cors');
mediumRouter.use(bodyParser.json());

//Insert and fetch questions in Easy level of subject

mediumRouter.route('/subject/:subjectId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    medium.find({subject:req.params.subjectId})
    .then((questions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(questions);
    })
    .catch((err)=> next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    medium.insertMany(req.body)
    .then((quest)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quest);
    })
    .catch((err)=>{
        next(err);
    })
})
.put(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=404;
    res.end('PUT Operaion is permitted');
})
.delete(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=404;
    res.end('DELETE Operaion is not permitted');

})


//Finding Question on its ID

mediumRouter.route('/:questionId')
    .options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    medium.findById(req.params.questionId)
    .then((question)=>{
      if(question!==null){
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(question);
      }
      else{
          err=new Error('Cannot find Question');
          err.statusCode=403;
          return next(err);
      }
    })
    .catch((err)=> next(err));
})
.post(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=403;
    res.end('POST Operation is not Permitted');
})
.put(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    medium.findById(req.params.questionId)
    .then((quest)=>{
        if(quest.teacher.equals(req.user._id)){
          medium.findByIdAndUpdate(quest._id, {
                $set:req.body
            }, {new:true})
            .then((resp)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err)=> next(err));
        }
        else{
            err = new Error('Your are not authorized to perform these action');
            err.statusCode=403;
            return next(err);
        }
    })
    .catch((err)=> next(err));
})
.delete(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    medium.findById(req.params.questionId)
    .then((quest)=>{
        if(quest.teacher.equals(req.user._id)){
            medium.findByIdAndDelete(quest._id)
            .then((resp)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err)=> next(err));
        }
        else{
            err = new Error('Your are not authorized to perform this action');
            err.statusCode=403;
            return next(err);
        }
    })
    .catch((err)=> next(err));
})


module.exports=mediumRouter;

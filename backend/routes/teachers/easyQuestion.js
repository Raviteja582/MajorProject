var express = require('express');
var easyRouter= express.Router()
var bodyParser = require('body-parser');
var easy = require('../../models/easy');
var authenticate = require('../../authenticate');
var cors = require('../cors');
easyRouter.use(bodyParser.json());

//Insert and fetch questions in Easy level of subject

easyRouter.route('/subject/:subjectId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    easy.find({subject:req.params.subjectId})
    .then((questions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(questions);
    })
    .catch((err)=> next(err));
})
.post(cors.corsWithOptions,authenticate.verifyUser,(req,res,next)=>{
    easy.insertMany(req.body)
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

easyRouter.route('/:questionId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,authenticate.verifyUser,(req,res,next)=>{
    easy.findById(req.params.questionId)
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
    easy.findById(req.params.questionId)
    .then((quest)=>{
        if(quest.teacher.equals(req.user._id)){
          easy.findByIdAndUpdate(quest._id, {
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
    easy.findById(req.params.questionId)
    .then((quest)=>{
        if(quest.teacher.equals(req.user._id)){
            easy.findByIdAndDelete(quest._id)
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


module.exports=easyRouter;

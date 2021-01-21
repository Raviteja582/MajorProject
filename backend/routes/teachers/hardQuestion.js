var express = require('express');
var hardRouter= express.Router()
var bodyParser = require('body-parser');
var hard = require('../../models/hard');
var authenticate = require('../../authenticate');

hardRouter.use(bodyParser.json());

//Insert and fetch questions in Easy level of subject

hardRouter.route('/subject/:subjectId')
.get(authenticate.verifyUser,(req,res,next)=>{
    hard.find({subject:req.params.subjectId})
    .then((questions)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(questions);
    })
    .catch((err)=> next(err));
})
.post(authenticate.verifyUser,(req,res,next)=>{
    hard.insertMany(req.body)
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
.delete((req,res,next)=>{
    res.statusCode=404;
    res.end('DELETE Operaion is not permitted');

})


//Finding Question on its ID

hardRouter.route('/questionId')
.get(authenticate.verifyUser,(req,res,next)=>{
    hard.findById(req.params.questionId)
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
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST Operation is not Permitted');
})
.put(authenticate.verifyUser,(req,res,next)=>{
    hard.findById(req.params.questionId)
    .then((quest)=>{
        if(quest.teacher.equals(req.user._id)){
          hard.findByIdAndUpdate(quest._id, {
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
.delete(authenticate.verifyUser,(req,res,next)=>{
    hard.findById(req.params.questionId)
    .then((quest)=>{
        if(quest.teacher.equals(req.user._id)){
            hard.findByIdAndDelete(quest._id)
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


module.exports=hardRouter;

var express = require('express');
var questionRouter = express.Router()
var bodyParser = require('body-parser');
var question = require('../../models/question');
var authenticate = require('../../authenticate');

questionRouter.use(bodyParser.json());

//Finding Question on particular Subject

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
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req,res,next)=>{
    question.deleteMany({subject:req.params.subjectId})
    .then((resp)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    })
    .catch((err)=> next(err));
})

//Finding Question on its ID

questionRouter.route('/:subjectId/:questionId')
.get(authenticate.verifyUser,(req,res,next)=>{
    question.findById(req.params.questionId)
    .then((quest)=>{
      if(quest!==null){
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quest);
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
    question.findById(req.params.questionId)
    .then((quest)=>{
        console.log(quest.teacher.equals(req.user._id));
        if(quest.teacher.equals(req.user._id)){
            req.body.teacher=req.user._id;
            req.body.subject=req.params.subjectId;
            question.findByIdAndUpdate(quest._id, {
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
    question.findById(req.params.questionId)
    .then((quest)=>{
        if(quest.teacher.equals(req.user._id)){
            question.findByIdAndDelete(quest._id)
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


//Finding Question on Subject in particular Unit

questionRouter.route('/:subjectId/:unit')
.get(authenticate.verifyUser,(req,res,next)=>{
    res.statusCode=200;
    res.end('Not Yet Done');
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST Operaion in NOT PERMITED');
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT Operaion is not permitted');
})
.delete((req,res,next)=>{
    res.statusCode=403;
    res.end('DELETE Operaion is not permitted');
})

//Finding particular question in subject in particular unit 

questionRouter.route('/:subjectId/:unit/:questionId')
.get(authenticate.verifyUser,(req,res,next)=>{
    question.findById(req.params.questionId)
    .then((quest)=>{
        res.statusCode=200;
        res.setHeader('Content-Type', 'application/json');
        res.json(quest);
    })
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.statusCode=403;
    res.end('POST Operation is not permitted');
})
.put((req,res,next)=>{
    question.findById(req.params.questionId)
    .then((quest)=>{
        if(quest!==null){
          if(req.user._id.equals(quest.teacher)){
            question.findByIdAndUpdate(quest._id, {
                $set:req.body,
            
            }, {new:true})
            .then((quest)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(quest);
            })
            .catch((err)=> next(err));
          }
          else{
              err = new Error('Your Not authorized');
              err.statusCode=404;
              return next(err);
          }
        }
        else{
            err = new Error('Cannot find question');
            err.statusCode=404;
            return next(err);
        }
    })
    .catch((err)=> next(err));
})
.delete(authenticate.verifyUser,(req,res,next)=>{
    question.findById(req.params.questionId)
    .then((quest)=>{
        if(quest!==null && quest.teacher.equals(req.user._id)){
            question.findByIdAndDelete(quest._id)
            .then((resp)=>{
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            })
            .catch((err)=> next(err));
        }
        else{
            err = new Error('Cannot find Question');
            err.statusCode=403;
            return next(err);
        }
    })
    .catch((err)=> next(err));
})

module.exports=questionRouter;

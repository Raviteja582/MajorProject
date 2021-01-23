var express = require('express');
var bodyParser = require('body-parser');
var user = require('../../models/teachers');
var authenticate = require('../../authenticate');
var userRouter = express.Router();

userRouter.use(bodyParser.json());

userRouter.route('/:userId')
.get((req,res,next)=>{
    user.findById(req.params.userId)
    .then((teacher)=>{
        user.findByIdAndUpdate(req.params.userId, {
            $set:{ 'isauth': true }
        })
        .then((teacher)=>{
            res.statusCode=200;
            res.setHeader('Content-Type', 'application/json');
            res.json({sucess:true});
        })
        .catch((err)=>next(err));
    })
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.statusCode=401;
    res.end('POST Operation is not Permitted');
})
.put((req,res,next)=>{
    res.statusCode=401;
    res.end('PUT Operation is not Permitted');
})
.delete((req,res,next)=>{
    res.statusCode=401;
    res.end('DELETE Operation is not Permitted');
})

module.exports=userRouter;

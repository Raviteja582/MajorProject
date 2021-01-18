var express = require('express');
var teacherRouter = express.Router();
var passport = require('passport');

const bodyParser = require('body-parser');
var teacher = require('../../models/teachers');

teacherRouter.use(bodyParser.json());

teacherRouter.route('/')
.get((req,res,next)=>{
    res.statusCode=403;
    res.end('Get operation is not permitted');
})
.post((req, res, next) => {
		teacher.register(new teacher({username:req.body.username}), req.body.password, (err, user) => {
	        if(err) {
			    res.statusCode = 500;
			    res.setHeader('Content-Type', 'application/json');
                console.log(err);
			    res.json({err: err});
	  	    }
	    	else {
                user.firstname= req.body.firstname;
                user.lastname= req.body.lastname;
                user.email= req.body.email;
                user.phno= req.body.phno;
                user.dob= req.body.dob;
                user.save((err,user)=>{
                    if(err){
                        res.statusCode=500;
                        res.setHeader('Content-Type', 'application-json');
                        res.json({err:err});
                        return;
                    }
                });
          	    passport.authenticate('local')(req, res, () => {
			        res.statusCode = 200;
			        res.setHeader('Content-Type', 'application/json');
			        res.json({success: true, status: 'Registration Successful!'});
			  });
        }
    });
})
.put((req,res,next)=>{
    res.statusCode=403;
    res.end('PUT operation is not permitted');
})
.delete((req,res,next)=>{
    res.statusCode=403;
    res.end('DELETE operation is not permitted');
})
module.exports = teacherRouter;

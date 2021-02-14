var express = require('express');
var TeacherRouter = express.Router();
const cors = require('../cors');
var passport = require('passport');
var authenticate = require('../../authenticate');

const bodyParser = require('body-parser');

TeacherRouter.use(bodyParser.json());

TeacherRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors,(req,res,next) => {
    res.statusCode=403;
    res.setHeader('Content-Type', 'text');
    res.end('Get Operation is not permitted');
})
.post(cors.corsWithOptions,(req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)
            return next(err);
        if (!user) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, status: 'Login Unsuccessful!', err: info});
        }

        req.logIn(user, (err) => {
            if (err) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.json({success: false, status: 'Login Unsuccessful!', err: 'Could not log in user!'});
            }
            else if(user.isauth){
              var token = authenticate.getToken({_id: req.user._id});
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.json({success: true, token: token, status: 'You are successfully logged in!'});
            }
            else{
                res.statusCode=401;
                res.setHeader('Content-Type', 'text');
                res.end('Your are not Completed you Registration process. Please login to your mail and complete.');
            }
        });
    })(req,res,next);
})
.put(cors.corsWithOptions,(req,res,next)=> {
    res.statusCode=403;
    res.end("PUT operation not supported");
})
.delete(cors.corsWithOptions,(req,res,next)=>{
    res.statusCode=403;
    res.end('Delete operation not supported');
});

module.exports = TeacherRouter;

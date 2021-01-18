var express = require('express');
var TeacherRouter = express.Router();

var passport = require('passport');
var authenticate = require('../../authenticate');

const bodyParser = require('body-parser');

TeacherRouter.use(bodyParser.json());

TeacherRouter.route('/')
.get((req,res,next) => {
    res.statusCode=403;
    res.setHeader('Content-Type', 'text');
    res.end('Get Operation is not permitted');
})
.post((req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err)          
            return next(err);
        if (!user) {     
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: false, status: 'Login Unsuccessful       !', err: info});
        }

        req.logIn(user, (err) => {
            if (err) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json')       ;
                res.json({success: false, status: 'Login Unsucces       sful!', err: 'Could not log in user!'});          
            }
            var token = authenticate.getToken({_id: req.user._id}       );
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({success: true, token: token, status: 'You a       re successfully logged in!'});
        });
    }) (req,res,next);
})
.put((req,res,next)=> {
    res.statusCode=403;
    res.end("PUT operation not supported");
})
.delete((req,res,next)=>{
    res.statusCode=403;
    res.end('Delete operation not supported');
});

module.exports = TeacherRouter;

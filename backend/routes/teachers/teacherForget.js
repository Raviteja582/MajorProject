var express = require('express');
var forgetRouter = express.Router();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var teacher = require('../../models/teachers');

forgetRouter.use(bodyParser.json());

forgetRouter.route('/check')
.get((req,res,next)=>{
    teacher.findOne({username:req.body.username})
    .then((teach)=>{
      res.statusCode=200;
      res.setHeader('Content-Type', 'application/json');
      if(teach!==null && teach.isauth){
        let transporter = nodemailer.createTransport({
            service : 'gmail',
            auth:{
                user: 'qpgeneratorbvrit@gmail.com',
                pass: 'uamaeefhzwwnlrtq'
            }
        });
        var url = 'https://questionpaper07.herokuapp.com/teacher/forgot/change/'+teach._id;
        var mailOptions = {
            from : 'no-replyAdmin <qpgeneratorbvrit@gmail.com>',
            to: teach.email,
            subject: 'Password Recovery',
            text: 'To Change your Password',
            html: `<p>To Set up your new password, please click on these <a href=${url}>Link</a> now.</p>`
        };
        transporter.sendMail(mailOptions)
        .then((err,info)=>{
            if(!err){
                err = new Error('Cannot Send Recovery Mail to your email please check');
                err.statusCode=401;
                return next(err);
            }
          else res.json({success:true});
        })
        .catch((err)=> next(err));
        }else{
          res.json({success:false});
        }
    })
    .catch((err)=> next(err));
})
.post((req,res,next)=>{
    res.statusCode=401;
    res.end('POST is not Supported');
})
.put((req,res,next)=>{
    res.statusCode=401;
    res.end('PUT is not Supported');
})
.delete((req,res,next)=>{
    res.statusCode=401;
    res.end('DELETE is not Supported');
})


forgetRouter.route('/change/:userId')
.get((req,res,next)=>{
    res.statusCode=401;
    res.end('GET is not Supported');
})
.post((req,res,next)=>{
    res.statusCode=401;
    res.end('POST is not Supported');
})
.put((req,res,next)=>{
    teacher.findById(req.params.userId)
    .then((user)=>{
        if(user!==null){
            user.setPassword(req.body.password)
            .then((user)=>{
                user.save();
                res.statusCode=200;
                res.setHeader('Content-Type', 'application/json');
              res.json({success:true});
            })
            .catch((err)=>next(err));
        }else{
            err = new Error('Cannot Find the user');
            err.statusCode=401;
            return next(err);
        }
    })
    .catch((err)=>next(err));
})
.delete((req,res,next)=>{
    res.statusCode=401;
    res.end('Delete Operation is not Supported');
})

module.exports=forgetRouter;

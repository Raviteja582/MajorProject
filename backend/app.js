var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();


//Custome imports
var passport = require('passport');
var teacherLogin = require('./routes/teachers/teacherLogin');
var teacherSignUp = require('./routes/teachers/teacherSignUp');
var teacherUpdate = require('./routes/teachers/teacherUpdate');
var addDepartment = require('./routes/admin/department');
var adminSubject = require('./routes/admin/subject');
var subject = require('./routes/teachers/fetchSubjects');
var question = require('./routes/teachers/teacherQuestion');
var userAuth = require('./routes/teachers/userAuth');
var forgetUser = require('./routes/teachers/teacherForget');
var semPaper = require('./routes/teachers/paperGenerator/getsem/getSemester');
var mid1 = require('./routes/teachers/paperGenerator/getmid1/getMid1');
var mid2 = require('./routes/teachers/paperGenerator/getmid2/getMid2');
var Pschema = require('./routes/teachers/paperGenerator/getschema/getpaper');

var easyEdit = require('./routes/teachers/editQuestions/easyEdit');
var mediumEdit = require('./routes/teachers/editQuestions/mediumEdit');
var hardEdit = require('./routes/teachers/editQuestions/hardEdit');
var config = require('./config');



//MongoDB connection for local
const mongoose = require('mongoose');
const easyEditRouter = require('./routes/teachers/editQuestions/easyEdit');
const url = config.mongourl;
const connect = mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true});

connect.then((db) => {
  console.log('Connected correctly to server');
},(err) => { console.log(err);
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//custome middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use('/teacher/signup',teacherSignUp);
app.use('/teacher/login',teacherLogin);
app.use('/teacher/update',teacherUpdate);
app.use('/admin/department',addDepartment);
app.use('/admin/subject',adminSubject);
app.use('/teacher/subject',subject);
app.use('/teacher/question',question);
app.use('/user',userAuth);
app.use('/teacher/forgot/', forgetUser);
app.use('/teacher/semPaper', semPaper);
app.use('/teacher/mid1', mid1);
app.use('/teacher/mid2', mid2);
app.use('/teacher/easy', easyEdit);
app.use('/teacher/medium', mediumEdit);
app.use('/teacher/hard', hardEdit);
app.use('/teacher/schema', Pschema);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


app.set('port', process.env.PORT || 4200);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;

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
var addDepartment = require('./routes/admin/department/department');
var config = require('./config');



//MongoDB connection for local
const mongoose = require('mongoose');
const url = "mongodb+srv://ravi_582:vDaBRyedX1orXMBg@cluster0.nd7vs.mongodb.net/college?retryWrites=true&w=majority";
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


app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + server.address().port);
});


module.exports = app;

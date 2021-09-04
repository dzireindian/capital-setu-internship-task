var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require('http');
var cookieParser = require('cookie-parser');
var session = require('express-session');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const mongoose = require('mongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({secret: process.env.ENC_KEY,
resave: true,
saveUninitialized: true}));

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

console.log(process.env.DATABASE_POINT)

mongoose.connect(process.env.DATABASE_POINT,async(err)=>{
  if(err) throw err;
  console.log("conncted to db")
});

var httpServer = http.createServer(app);
const host = process.env.host;
const port = process.env.PORT;
httpServer.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

module.exports = app;

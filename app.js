const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


// require('./app_api/models/db');
require('./app_server/models/db');


// para definir os routers da aplicação
const indexRouter = require('./app_server/routes/index');
// const apiRouter = require('./app_api/routes/index');

// para definir app express
const app = express();

// para definir motor de vistas
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');

// para ligações midleware gerais da aplicação a  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//app.use(favicon(__dirname + '/public/favicon.ico'));

// para outras ligações midleware da aplicação
app.use('/', indexRouter);
// app.use('/api', apiRouter);

// para encaminhar o erro 404 para o respetivo handler
app.use(function(req, res, next) {
  next(createError(404));
});

// para o handler de erro
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // para apresentar a página do erro
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// can't fix big problem, minor fix	
// refusing the least scenary, to see	
// on boundaries of my own, standing	
// out of my reach, are you long gone out	

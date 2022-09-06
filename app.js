const express = require('express');
const path = require('path');
// const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('./app_api/models/db');

// para routers da aplicação
const appv = require('./app_server/routes/viaturas/appv');
const appc = require('./app_server/routes/condutores/appc');
const appm = require('./app_server/routes/viaturas/appm');


const apiv = require('./app_api/routes/apiv');
const apic = require('./app_api/routes/apic');
const apim = require('./app_api/routes/apim');

const routeIndex = require('./app_server/routes/index');

// const appViaturas   = require('./app_server/routes/app_viaturas');
// const apiRegistos   = require('./app_api/routes/registos');
// const routerCondutores = require('./app_server/routes/condutores')

const app = express();

app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'pug');


app.use(logger('dev'));

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.text({ type: 'text/html' }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '/public')));
app.use('/fotos', express.static(path.join(__dirname, '/app_server/upload/fotos')));

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));



app.use('/', routeIndex);


app.use('/viaturas', appv);
app.use('/condutores', appc);
app.use('/manutencoes', appm);


app.use('/api/viaturas', apiv);
app.use('/api/condutores', apic);
app.use('/api/manutencoes', apim);



// para capturar erros 404 e encaminhá-los para o error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
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

const express = require('express');
const cookieParser = require('cookie-parser')
const mustacheExpress = require("mustache-express");
const path = require('path');
var logger = require('morgan');

const app = express();
const engine = mustacheExpress();
var indexRouter = require('./routers/router');
var homeRouter = require('./routers/home');
var usersApi = require('./routers/users');
var vacinasApi = require('./routers/vacinas');
//var cookieRouter = require('./index');

app.use(logger('dev'));
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())
app.engine("mustache", engine);
app.set('views', path.join(__dirname, 'views'));
app.set('images', path.join(__dirname, 'javascript'));
app.set('view engine', 'mustache');
app.use(express.static("./src/images"))

app.use('/', indexRouter);
app.use('/home', homeRouter);
app.use('/api/users', usersApi);
app.use('/api/vacinas', vacinasApi);
//app.use('/cookie/', cookieRouter);

app.listen(3000,()=> console.log("listen..."))

module.exports = app;

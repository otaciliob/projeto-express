const express = require('express');
const mustacheExpress = require("mustache-express");
const path = require('path');
var logger = require('morgan');

const app = express();
const engine = mustacheExpress();
var indexRouter = require('./router');

app.use(logger('dev'));
app.use(express.urlencoded())
app.use(express.json())
app.engine("mustache", engine);
app.set('views', path.join(__dirname, 'views'));
//app.set('images', path.join(__dirname, 'images'));
app.set('view engine', 'mustache');
app.use(express.static("./src/images"))

app.use('/', indexRouter);

module.exports = app;

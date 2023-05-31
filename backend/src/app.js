const express = require('express');
const mustacheExpress = require("mustache-express");
const path = require('path');

const app = express();
const engine = mustacheExpress();
var indexRouter = require('./router');

app.engine("mustache", engine);
app.use(express.static("./src/images"))
app.set('views', path.join(__dirname, 'views'));
//app.set('images', path.join(__dirname, 'images'));
app.set('view engine', 'mustache');

app.use('/', indexRouter);

module.exports = app;
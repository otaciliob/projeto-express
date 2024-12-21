require("dotenv").config();
const express = require('express');
const logger = require('morgan');
const app = express();
const PORT = process.env.PORT;

var Users = require('./routers/UsersAPI.js');
var Livros = require('./routers/LivrosAPI.js');
var Autores = require('./routers/AutoresAPI.js');
var Installer = require('./routers/install.js');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger('dev'));

app.use('/',Users);
app.use('/livros',Livros);
app.use('/install',Installer);
app.use('/autores',Autores);

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`);
});
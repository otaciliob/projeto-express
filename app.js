const express = require('express');
const logger = require('morgan');
const app = express();
const PORT = 3000

var Users = require('./routers/routerUsers.js')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(logger('dev'));

app.use('/login',Users)

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}...`)
})
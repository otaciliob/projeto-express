const express = require('express');
const router = express.Router();

var User = require("../model/Users")

router.get('/',(req,res)=>{
    User.new("admin","admin",true);
    User.new("root","12345",true);
    User.new("dummy","dummy",false);
    User.new("test","test123");
});


module.exports = router;
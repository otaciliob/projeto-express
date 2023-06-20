const nodemailer = require("nodemailer");
const express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('home1');
});

module.exports = router;
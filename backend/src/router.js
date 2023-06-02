const express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/page2', function (req, res, next) {
  res.render('page2');
});
router.get('/page3', function (req, res, next) {
  res.render('page3');
});
router.post('/', function (req, res, next) { });



module.exports = router;
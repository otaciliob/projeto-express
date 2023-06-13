const express = require('express');
var router = express.Router();

router.get('/',(req,res)=>res.status(200).send("Hello World!"));

router.get("/setcookie", (req, res) => {
    res.cookie("Bearer", "A1B2C3D4");
    res.send("Cookie criado com sucesso!");
  });
  router.get("/listcookie", (req, res) => {
    console.log(req.cookies);
    res.send(req.cookies);
  });

  module.exports = router;


const express = require('express');
const nodemailer = require("nodemailer");
var router = express.Router();
require('dotenv').config();

router.get('/', function (req, res, next) {
  res.render('index');
});
router.get('/page2', function (req, res, next) {
  res.render('page2');
});
router.get('/page3', function (req, res, next) {
  res.render('page3');
});
router.get('/page4', function (req, res, next) {
  res.render('page4');
});
router.get('/page5', function (req, res, next) {
  res.render('page5');
});
router.post('/login', function (req, res, next) {
  res.send("is working");
  next();
});

router.post("/enviar", (req, res) => {
  console.log(req.body);
  const nome = req.body.nome;
  const email = req.body.mail;
  const assunto = req.body.assunto;
  const mensagem = req.body.mensagem;
  const values = {
    nome: nome,
    email: email,
    assunto: assunto,
    mensagem: mensagem
  };
  //console.log(values);

  const transporter = nodemailer.createTransport({
    service: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls:{
      rejectUnauthorized: false,
    },
  });
  console.log(transporter);

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: assunto,
    text: `Nome: ${nome}\nE-mail: ${email}\n\nMensagem: ${mensagem}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).send("Ocorreu um erro ao enviar o e-mail.");
    } else {
      console.log("E-mail enviado com sucesso:", info.response);
      res.send("Mensagem enviada com sucesso!");
    }
  });
});


module.exports = router;

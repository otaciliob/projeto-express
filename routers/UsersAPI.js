const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {autorizado, isAdmin} = require("../middleware/Auth");

const SENHA = process.env.JWT_PASSWORD; //jwt secrect

var User = require("../models/users");

router.get('/list', (req, res) => {
    res.json(User.list());
});

router.post('/signin', (req, res) => {
    let { nome, senha } = req.body;
    let i = User.find(nome, senha)//procura o usuario usando o nome e a senha, retorna o ID do usuario, se nao achar: -1

    if (i != -1) {
        let payload = { user: i.id, admin: i.admin };
        let config = { expiresIn: '15 min' };
        let token = jwt.sign(payload, SENHA, config);
        res.json({ token });
    }else{res.status(400).json('User Not Found')}

});

router.post('/signup', (req, res) => {
    let { nome, senha } = req.body;
    let usuario;
    if (nome && senha) {
        usuario = User.new(nome,senha);
    }
    res.json(`${usuario.nome}`)
});

router.put('/update',autorizado,(req, res)=>{
    let { nome, senha } = req.body;
    if (User.update( req.user.user, nome, senha )) {
        res.json("sucesso ao alterar")
    } else {
        res.status(400).json("Error ao alterar")
    }
});

router.post('/admin/create',autorizado,isAdmin, (req, res) => {
    let { nome, senha, admin } = req.body;
    let usuario;
    if (nome && senha && admin) {
        usuario = User.new(nome,senha,admin);
    }
    res.json(`${usuario}`)
});

router.put('/admin/update',autorizado,isAdmin,(req, res)=>{
    let { id, nome, senha } = req.body;
    if (User.update( id, nome, senha )) {
        res.json("sucesso ao alterar")
    } else {
        res.status(400).json("Error ao alterar usuario")
    }
});


router.delete("/admin/remove",autorizado,isAdmin,(req, res)=>{
    let { id } = req.body;
    if (User.delete(id)) {
        res.json("Usuario removido");
    } else {
        res.json("Error ao remover usuario");
    }
});

//End of Routes

module.exports = router;
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { autorizado, isAdmin } = require("../middleware/Auth");
const {validarUser} = require('../middleware/Validator')

const SENHA = process.env.JWT_PASSWORD; //jwt secrect

var User = require("../models/usersFs");

router.get('/list', async(req, res) => {
    res.json(await User.list());
});//listar

router.post('/login', async (req, res) => {
    let { nome, senha } = req.body;
    let i = await User.login(nome, senha)//procura o usuario usando o nome e a senha, retorna usuario, se nao achar: null

    if ( i ) {
        let payload = { user: i.id, admin: i.admin };
        let config = { expiresIn: '7d' };
        let token = jwt.sign(payload, SENHA, config);
        res.json({ token });
    } else { res.status(400).json('User Not Found') }
});//login

router.post('/signup', validarUser,async (req, res) => {
    let { nome, senha } = req.body;
    let usuario = await User.new({ nome:nome, senha:senha, admin: false});

    res.json(usuario)
});//cadastro

router.put('/update/:id',autorizado, (req, res) => {
    let { nome, senha } = req.body;
    let id = req.user.user;
    if (User.update(id, {nome: nome, senha: senha, admin:false})) {
        res.json("sucesso ao alterar")
    } else {
        res.status(400).json("Error ao alterar")
    }
});//update user

router.post('/admin/create', autorizado, isAdmin, (req, res) => {
    let { nome, senha, admin } = req.body;
    let usuario;
    if (nome && senha && admin) {
        usuario = User.new(nome, senha, admin);
    }
    res.json(`${usuario}`)
});//create admin

router.put('/admin/update/:id', autorizado, isAdmin, (req, res) => {
    let { nome, senha } = req.body;
    let id = req.params.id
    if (User.update(id, nome, senha)) {
        res.json("sucesso ao alterar")
    } else {
        res.status(400).json("Error ao alterar usuario")
    }
});//update admin

router.delete("/admin/:id",autorizado, isAdmin, async(req, res) => {
    let id  = req.params.id;
    let usuario = await User.getElementById(id)
    if (!usuario.admin) {
        if (await User.delete(id)) {
            res.json("Usuario removido");
        } else {
            res.json("Error ao remover usuario");
        }
    } else {
        res.json("Administrador nao podem ser removidos");
}
});//admin delete

//End of Routes

/*router.post('/signup', (req, res) => {
    let { nome, senha } = req.body;
    let usuario;
    if (nome && senha) {
        usuario = User.new(nome, senha);
    }
    res.json(`${usuario.nome}`)
});*/

/*router.post('/signin', (req, res) => {
    let { nome, senha } = req.body;
    let i = User.find(nome, senha)//procura o usuario usando o nome e a senha, retorna o ID do usuario, se nao achar: -1

    if (i != -1) {
        let payload = { user: i.id, admin: i.admin };
        let config = { expiresIn: '15 min' };
        let token = jwt.sign(payload, SENHA, config);
        res.json({ token });
    } else { res.status(400).json('User Not Found') }
});*/

module.exports = router;
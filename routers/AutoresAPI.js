const express = require('express');
const router = express.Router();
const {autorizado, isAdmin} = require("../middleware/Auth");

const { getElementByAutor } = require('../models/livros');
var Autores = require("../models/autores");

router.get('/list', (req, res) => {
    let {pagina,limite} = req.query;
    let autores = Autores.list();
    let aux = [];
    for(let i = (pagina-1)*limite; i < autores.length && i < pagina*limite; i++){
        aux.push(autores[i]);
    }
    res.json(aux);
});
router.get('/list', (req, res) => {
    res.json(Autores.list());
});
//procura pelo autor usando o nome, se existir, busca por livros desse autor, retorna o autor e seus livros
router.get('/bibliografia', (req, res) => {
    let {nome} = req.body;
    let autor = Autores.getElementByNome(nome);
    if (autor) {
        autor.bibliografia = getElementByAutor(nome);
    }
    res.json(autor);
});
//cria um novo autor, apenas administradores
router.post('/create',autorizado,isAdmin, (req, res) => {
    let {nome,biografia} = req.body;
    let autor = Autores.new(nome,biografia);

    res.json(autor);
});
//alterar um autor existente, apenas administradores
router.put('/update',autorizado,isAdmin, (req, res)=>{
    let { id,nome,biografia } = req.body;
    if (Autores.update(id,nome,biografia)) {
        res.json("sucesso ao alterar autor");
    } else {
        res.status(400).json(`Error ao alterar autor`);
    }
});
//remove um autor, apenas administradores
router.delete('/delete',autorizado,isAdmin,(req, res)=>{
    let { id } = req.body;
        if (Autores.delete(id)) {
            res.json("Autor removido com sucesso");
        } else {
            res.json("Error ao remover autor");
        }
});

module.exports = router;
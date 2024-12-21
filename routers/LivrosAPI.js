const express = require('express');
const router = express.Router();
const {autorizado, isAdmin} = require("../middleware/Auth");

var Livros = require("../models/livros");

router.get('/list', (req, res) => {
    let {pagina,limite} = req.query;
    let liv = Livros.list();
    let aux = [];
    for(let i = (pagina-1)*limite; i < liv.length && i < pagina*limite; i++){
        aux.push(liv[i]);
    }
    res.json(aux);
});
router.get('/list', (req, res) => {
    res.json(Livros.list());
});
router.get('/search', (req, res) => {
    let autor = req.body.autor
    res.json(Livros.getElementByAutor(autor));
});

router.post('/create',autorizado,isAdmin, (req, res) => {
    let {titulo , autor, descricao} = req.body;
    let livro = Livros.new(titulo,autor,ano,descricao);

    res.json(livro);
});


router.put('/update',autorizado,isAdmin, (req, res)=>{
    let { id,titulo,autor,ano,descricao } = req.body;
    if (Livros.update(id,titulo,autor,ano,descricao)) {
        res.json("sucesso ao alterar livro");
    } else {
        res.status(400).json(`Error ao alterar livro: ${id},${titulo},${autor},${ano},${descricao},`);
    }
});

router.delete('/delete',autorizado,isAdmin,(req, res)=>{
    let { id } = req.body;
        if (Livros.delete(id)) {
            res.json("Livro removido com sucesso");
        } else {
            res.json("Error ao remover livro");
        }
});

module.exports = router;
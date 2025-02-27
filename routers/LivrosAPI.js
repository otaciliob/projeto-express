const express = require('express');
const router = express.Router();
const {autorizado, isAdmin} = require("../middleware/Auth");
const {validarLivro} = require('../middleware/Validator');

var Livros = require("../models/livrosFs");

router.get('/list', async(req, res) => {
    let {pagina,limite} = req.query;
    let liv = await Livros.list();
    let aux = [];
    for(let i = (pagina-1)*limite; i < liv.length && i < pagina*limite; i++){
        aux.push(liv[i]);
    }
    res.json(aux);
});
/*router.get('/list', async(req, res) => {
    res.json(await Livros.list());
});*/
/*router.get('/search', (req, res) => {
    let autor = req.body.autor
    res.json(Livros.getElementByAutor(autor));
});*/

router.post('/create',validarLivro,autorizado,isAdmin, async(req, res) => {
    let {titulo , autor, ano, descricao} = req.body;
    let livro =await Livros.new({titulo,autor,ano,descricao});

    res.json(livro);
});


router.put('/update/:id',validarLivro,autorizado,isAdmin, async(req, res)=>{
    let { titulo,autor,ano,descricao } = req.body;
    let id = req.params.id;
    if (await Livros.update(id,{titulo,autor,ano,descricao})) {
        res.json("sucesso ao alterar livro");
    } else {
        res.status(400).json(`Error ao alterar livro: ${id},${titulo},${autor},${ano},${descricao},`);
    }
});

router.delete('/delete/:id',autorizado,isAdmin,async(req, res)=>{
    let id = req.params.id;
        if (await Livros.delete(id)) {
            res.json("Livro removido com sucesso");
        } else {
            res.json("Error ao remover livro");
        }
});

module.exports = router;

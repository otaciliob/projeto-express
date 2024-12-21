const express = require('express');
const router = express.Router();

var Users = require("../models/users");
var Livros = require("../models/livros");
var Autores = require("../models/autores");
const livros = require('../models/livros');

let install = false;
router.get('/', (req, res) => {
    if (!install) {
        Users.new("admin", "admin", true);
        Users.new("dummy", "dummy");

        Livros.new(
            "JavaScript: O Guia Definitivo 6 edicao",
            "David Flanagan",
            2012,
            `Referência completa para programadores, JavaScript: O guia definitivo fornece uma ampla descrição da linguagem JavaScript básica e das APIs JavaScript do lado do cliente definidas pelos navegadores Web`
        );
        Livros.new(
            "Percy Jackson: O Ladrao de Raios",
            "Rick Riordan",
            2005,
            `Os deuses do Olimpo continuam vivos, em pleno século XXI! Eles ainda se apaixonam por mortais e têm filhos que podem se tornar grandes heróis, mas que acabam, na maioria das vezes, encontrando destinos terríveis nas garras de monstros sem coração. Apenas alguns descobrem sua identidade e conseguem chegar ao Acampamento Meio-Sangue, um acampamento de verão em Long Island dedicado ao treinamento de jovens semideuses. Essa é a revelação que leva Percy Jackson a uma incrível busca para ajudar seu verdadeiro pai - o deus dos mares! -, a evitar uma guerra no Olimpo.`
        );

        Livros.new(
            "Percy Jackson: O Mar de Monstros",
            "Rick Riordan",
            2006,
            `Em O Mar de Monstros , segundo livro da série, o ano de Percy foi surpreendentemente calmo. Nenhum monstro em sua escola, nenhum acidente esquisito, nenhuma briga em sala de aula. Mas, quando um inocente jogo de queimado entre ele e seus colegas torna-se uma disputa mortal contra uma tenebrosa gangue de gigantes canibais, as coisas ficam, digamos, feias.`
        );
        Livros.new(
            'Homem, Economia e Estado',
            'Murray Rothbard',
            1926,
            `Grande tratado de Murray N. Rothbard. Man, Economy, and State e seu texto complementar Power and Market, são aqui combinados em uma única edição como foram escritos para ser. Ele fornece uma apresentação abrangente da teoria econômica austríaca, uma reconstrução de muitos aspectos dessa teoria, com uma crítica rigorosa das escolas alternativas e um olhar inspirador em uma ciência da liberdade que diz respeito a quase tudo e deve preocupar a todos.`
        );



        Autores.new("David Flanagan","");
        Autores.new("Rick Riordan","");
        Autores.new('Murray Rothbard',"");
        install = true;
    }
    res.json(`${install}`);
});


module.exports = router;
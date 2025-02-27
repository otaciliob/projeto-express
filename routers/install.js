const express = require('express');
const router = express.Router();

var Users = require("../models/usersFs");
var Livros = require("../models/livrosFs");
var Autores = require("../models/autoresFs");

let install = false;
router.get('/', async(req, res) => {
    if (!install) {
        await Users.new({
            nome:"admin",
            senha:"admin",
            admin:true
        });
        await Users.new({
            nome:"dummy",
            senha:"dummy",
            admin:false
        });

        await Livros.new({
            titulo:"JavaScript: O Guia Definitivo 6 edicao",
            autor:"David Flanagan",
            ano:2012,
            descricao:`Referência completa para programadores, JavaScript: O guia definitivo fornece uma ampla descrição da linguagem JavaScript básica e das APIs JavaScript do lado do cliente definidas pelos navegadores Web`
        });
        await Livros.new({
            titulo:"Percy Jackson: O Ladrao de Raios",
            autor:"Rick Riordan",
            ano:2005,
            descricao:`Os deuses do Olimpo continuam vivos, em pleno século XXI! Eles ainda se apaixonam por mortais e têm filhos que podem se tornar grandes heróis, mas que acabam, na maioria das vezes, encontrando destinos terríveis nas garras de monstros sem coração. Apenas alguns descobrem sua identidade e conseguem chegar ao Acampamento Meio-Sangue, um acampamento de verão em Long Island dedicado ao treinamento de jovens semideuses. Essa é a revelação que leva Percy Jackson a uma incrível busca para ajudar seu verdadeiro pai - o deus dos mares! -, a evitar uma guerra no Olimpo.`
        });

        await Livros.new({
            titulo:"Percy Jackson: O Mar de Monstros",
            autor:"Rick Riordan",
            ano:2006,
            descricao:`Em O Mar de Monstros , segundo livro da série, o ano de Percy foi surpreendentemente calmo. Nenhum monstro em sua escola, nenhum acidente esquisito, nenhuma briga em sala de aula. Mas, quando um inocente jogo de queimado entre ele e seus colegas torna-se uma disputa mortal contra uma tenebrosa gangue de gigantes canibais, as coisas ficam, digamos, feias.`
        });
        await Livros.new({
            titulo:'Homem, Economia e Estado',
            autor:'Murray Rothbard',
            ano:1926,
            descricao:`Grande tratado de Murray N. Rothbard. Man, Economy, and State e seu texto complementar Power and Market, são aqui combinados em uma única edição como foram escritos para ser. Ele fornece uma apresentação abrangente da teoria econômica austríaca, uma reconstrução de muitos aspectos dessa teoria, com uma crítica rigorosa das escolas alternativas e um olhar inspirador em uma ciência da liberdade que diz respeito a quase tudo e deve preocupar a todos.`
        });

        await Autores.new({nome:"David Flanagan",biografia:""});
        await Autores.new({nome:"Rick Riordan",biografia:""});
        await Autores.new({nome:'Murray Rothbard',biografia:""});
        
        install = true;
    }
    res.json(`${install}`);
});


module.exports = router;
var express = require('express');
var User = require("../model/Users")
var UserValidator = require("../validator/UserValidator")
var router = express.Router();

router.get('/', function(req, res, next) {
  if (User.list().length == 0) {
    User.new("admin","admin")
    User.new("root","utfpr")
  }

  res.json({status: true, list: User.list()})
});

router.get("/:id", UserValidator.validateId, function(req, res) {
    let obj = User.getElementById(req.params.id);
    if (!obj) {
        return res.json({status:false, msg:"Tarefa não encontrada"})
    }

    return res.json({status:true, User:obj})
})

router.post("/", UserValidator.validateNome, function (req, res){
    res.json({status: true, User:User.new(req.body.nome,req.body.password)});
})

router.put("/:id", UserValidator.validateId, UserValidator.validateNome, function(req, res){ 
  let obj = User.update(req.params.id, req.body.nome, req.body.password);
  if (!obj) {
    return res.json({status: false, msg: "Falha ao alterar a tarefa"})
  }
  
  res.json({status: true, User:obj});
})

router.delete("/:id", UserValidator.validateId, function(req, res){
  if (!User.delete(req.params.id)) {
    return res.json({status: false, msg: "Falha ao excluir a tarefa"});
  }
  
  res.json({status:true})
})

module.exports = router;

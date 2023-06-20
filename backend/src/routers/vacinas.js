var express = require('express');
var vacina = require("../model/Vacinas")
var vacinaValidator = require("../validator/VacinaValidator")
var router = express.Router();

router.get('/', function(req, res, next) {
  if (vacina.list().length == 0) {
    vacina.new("vac1","2022-03-04","dose unica", null)
    vacina.new("vac2","2022-04-01","dose unica", null)
  }

  res.json({status: true, list: vacina.list()})
});

router.get("/:id", vacinaValidator.validateId, function(req, res) {
    let obj = vacina.getElementById(req.params.id);
    if (!obj) {
        return res.json({status:false, msg:"Tarefa não encontrada"})
    }

    return res.json({status:true, vacina:obj})
})

router.post("/", function (req, res){
    res.json({status: true, vacina:vacina.new(req.body.nome, req.body.data, req.body.dose, req.body.proxima)});
})

router.put("/:id", vacinaValidator.validateId, function(req, res){ 
  let obj = vacina.update(req.params.id, req.body.nome, req.body.data, req.body.dose, req.body.proxima);
  if (!obj) {
    return res.json({status: false, msg: "Falha ao alterar a tarefa"})
  }
  
  res.json({status: true, vacina:obj});
})

router.delete("/:id", vacinaValidator.validateId, function(req, res){
  if (!vacina.delete(req.params.id)) {
    return res.json({status: false, msg: "Falha ao excluir a tarefa"});
  }
  
  res.json({status:true})
})

module.exports = router;

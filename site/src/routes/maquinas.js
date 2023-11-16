var express = require("express");
var router = express.Router();

var maquinasController = require("../controllers/maquinasController");

//Recebendo os dados do html e direcionando para a função cadastrar de maquinasController.js

router.get("/carregarGrupoMaquinas/:idResponsavel", function (req, res) {
    maquinasController.carregarGrupoMaquinas(req,res);
})

router.get("/carregarComponentes/:idUsuario", function (req , res) {
    maquinasController.carregarComponentes(req,res);
})

router.get("/dadosGraficos/:tipoComponente/:idComponente", function (req , res) {
    maquinasController.dadosGraficos(req,res);
})

router.get("/dadosComponentes/:tipoComponente/:idComponente", function (req , res) {
    maquinasController.dadosComponentes(req,res);
})

module.exports = router;
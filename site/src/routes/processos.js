var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/carregarAplicativosAbertos/:idUsuario", function (req , res) {
    processosController.carregarAplicativosAbertos(req,res);
})

router.get("/carregarAplicativosProibidos/:idResponsavel", function (req , res) {
    processosController.carregarAplicativosProibidos(req,res);
})

router.get("/adicionarAplicativoProibido", function (req , res) {
    processosController.adicionarAplicativoProibido(req,res);
})

router.get("/atualizarAplicativoProibido/:idProcesso", function (req , res) {
    processosController.atualizarAplicativoProibido(req,res);
})

router.get("/excluirAppProibido/:idProcesso", function (req , res) {
    processosController.excluirAppProibido(req,res);
})

module.exports = router;
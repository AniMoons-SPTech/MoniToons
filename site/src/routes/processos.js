var express = require("express");
var router = express.Router();

var processosController = require("../controllers/processosController");

router.get("/carregarAplicativosAbertos/:idUsuario", function (req , res) {
    processosController.carregarAplicativosAbertos(req,res);
})

router.get("/carregarAplicativosProibidos/:idResponsavel", function (req , res) {
    processosController.carregarAplicativosProibidos(req,res);
})

router.post("/adicionarAplicativoProibido", function (req , res) {
    processosController.adicionarAplicativoProibido(req,res);
})

router.post("/atualizarAplicativoProibido/:idProcesso", function (req , res) {
    processosController.atualizarAplicativoProibido(req,res);
})

router.delete("/excluirAppProibido/:idProcesso", function (req , res) {
    processosController.excluirAppProibido(req,res);
})

module.exports = router;
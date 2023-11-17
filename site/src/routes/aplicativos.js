var express = require("express");
var router = express.Router();

var aplicativosController = require("../controllers/aplicativosController");

router.get("/carregarAplicativosAbertos/:idUsuario", function (req , res) {
    aplicativosController.carregarAplicativosAbertos(req,res);
})

router.get("/carregarAplicativosProibidos/:idResponsavel", function (req , res) {
    aplicativosController.carregarAplicativosProibidos(req,res);
})

module.exports = router;
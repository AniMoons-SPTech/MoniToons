var express = require("express");
var router = express.Router();

var componentesController = require("../controllers/componentesController.js");


router.get("/getComponentes/:idUsuario", function (req, res) {
    componentesController.getComponentes(req,res);
})

router.get("/getDados/:fkCompHasComp", function (req, res) {
    componentesController.getDados(req, res);
})

router.get("/dadosGraficoCpu/:fkCompHasComp", function (req, res) {
    componentesController.dadosGraficoCpu(req, res);
})

router.get("/dadosGraficoRam/:fkCompHasComp", function (req, res) {
    componentesController.dadosGraficoRam(req, res);
})


router.get("/graficosLinhaAtualizado/:fkCompHasComp", function (req, res) {
    componentesController.graficosLinhaAtualizado(req, res);
})


router.get("/graficosLinhaAtualizadoRam/:fkCompHasComp", function (req, res) {
    componentesController.graficosLinhaAtualizadoRam(req, res);
})

module.exports = router;
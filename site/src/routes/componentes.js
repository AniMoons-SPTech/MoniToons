var express = require("express");
var router = express.Router();

var componentesController = require("../controllers/componentesController.js");


router.get("/getComponentes/:idUsuario", function (req, res) {
    componentesController.getComponentes(req,res);
})

router.get("/getDados/:fkCompHasComp/:idComp", function (req, res) {
    componentesController.getDados(req, res);
})

router.get("/dadosGraficoCpu/:fkCompHasComp", function (req, res) {
    componentesController.dadosGraficoCpu(req, res);
})

router.get("/dadosGraficoRam/:fkCompHasComp", function (req, res) {
    componentesController.dadosGraficoRam(req, res);
})

router.get("/dadosGraficoGpu/:fkCompHasComp", function (req, res) {
    componentesController.dadosGraficoGpu(req, res);
})
router.get("/dadosGraficoDisco/:fkCompHasComp", function (req, res) {
    componentesController.dadosGraficoDisco(req, res);
})

router.get("/graficosLinhaAtualizado/:fkCompHasComp", function (req, res) {
    componentesController.graficosLinhaAtualizado(req, res);
})


router.get("/graficosLinhaAtualizadoRam/:fkCompHasComp", function (req, res) {
    componentesController.graficosLinhaAtualizadoRam(req, res);
})

router.get("/graficosLinhaAtualizadoGpu/:fkCompHasComp", function (req, res) {
    componentesController.graficosLinhaAtualizadoGpu(req, res);
})

router.get("/graficosPizzaAtualizadoDisco/:fkCompHasComp", function (req, res) {
    componentesController.graficosPizzaAtualizadoDisco(req, res);
})

router.get("/plotarRestoDosCards/:fkCompHasComp/:tipoComponente", function (req, res) {
    componentesController.plotarRestoDosCards(req, res);
})

module.exports = router;
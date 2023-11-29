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

router.get("/graficosLinhaAtualizado/:fkCompHasComp", function (req, res) {
    componentesController.graficosLinhaAtualizado(req, res);
})
module.exports = router;
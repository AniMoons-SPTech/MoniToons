var express = require("express");
var router = express.Router();

var componentesController = require("../controllers/componentesController.js");

router.get("/getComponentes/:idUsuario", function (req, res) {
    componentesController.getComponentes(req,res);
})

router.get("/getDados/:idUsuario", function (req, res) {
    componentesController.getDados(req, res);
})

router.get("/dadosGrafico/:fkCompHasComp", function (req, res) {
    componentesController.dadosGrafico(req, res);
})
module.exports = router;
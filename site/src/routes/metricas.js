var express = require("express");
var router = express.Router();

var metricasController = require("../controllers/metricasController");

router.get("/carregarAlertasCards/:idResponsavel", function (req, res) {
    metricasController.carregarAlertasCards(req, res);
});

router.get("/carregarMaquinasGestor/:idResponsavel", function (req, res) {
    metricasController.carregarMaquinasGestor(req, res);
})

module.exports = router;
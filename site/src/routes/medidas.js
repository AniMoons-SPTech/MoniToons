var express = require("express");
var router = express.Router();

var medidaController = require("../controllers/medidaController");

router.get("/carregarAlertasCards/:idResponsavel", function (req, res) {
    medidaController.carregarAlertasCards(req, res);
});

router.get("/carregarMaquinasGestor/:idResponsavel", function (req, res) {
    medidaController.carregarMaquinasGestor(req, res);
})

module.exports = router;
var express = require("express");
var router = express.Router();

var alertasController = require("../controllers/alertasController");

router.get("/carregarAlertas/:idEmpresa/:idUsuario", function (req , res) {
  alertasController.carregarAlertas(req,res);
})

module.exports = router;

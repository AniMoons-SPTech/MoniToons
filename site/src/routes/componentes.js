var express = require("express");
var router = express.Router();

var componentesController = require("../controllers/componentesController");

router.get("/carregarCpu/:idMaquina", function (req, res) {
    componentesController.carregarCpu(req,res);
})

module.exports = router;

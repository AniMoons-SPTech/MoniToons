var express = require("express")
var router = express.Router()

var alertasModel = require("../models/alertasModel");

function carregarAlertas(req, res) {
    const idEmpresa = req.params.idEmpresa
    const idUsuario = req.params.idUsuario

    alertasModel.carregarAlertas(idEmpresa, idUsuario)
        .then(alertas => {
            res.json(alertas)
        })
        .catch(error => {
            console.log(`Erro ao carregar alertas: ${error}`)
            res.status(500).json({ error: 'Erro ao carregar alertas' })
        })
}

module.exports = {
    carregarAlertas
}

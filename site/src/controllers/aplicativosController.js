var aplicativosModel = require("../models/aplicativosModel");

function carregarAplicativosAbertos(req, res){
    var { idUsuario } = req.params;

    if(idUsuario == undefined) {
        res.status(400).send("Id do usuário está indefinido!");
    }else{
        aplicativosModel.carregarAplicativosAbertos(idUsuario).then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Nenhum alerta encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function carregarAplicativosProibidos(req, res){
    var { idResponsavel } = req.params;

    if(idResponsavel == undefined) {
        res.status(400).send("Id do usuário está indefinido!");
    }else{
        aplicativosModel.carregarAplicativosAbertos(idResponsavel).then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Nenhum alerta encontrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}


module.exports = {
    carregarAplicativosAbertos,
    carregarAplicativosProibidos
}
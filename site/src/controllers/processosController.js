var processosModel = require("../models/processosModel");

function carregarAplicativosAbertos(req, res){
    var { idUsuario } = req.params;

    if(idUsuario == undefined) {
        res.status(400).send("Id do usuário está indefinido!");
    }else{
        processosModel.carregarAplicativosAbertos(idUsuario).then(function (resultado) {
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
        processosModel.carregarAplicativosAbertos(idResponsavel).then(function (resultado) {
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

function adicionarAplicativoProibido(req,res){
    var { idResponsavel } = req.params;
    var nomeAplicativo  = req.body.nomeAplicativo;

    if(idResponsavel == undefined) {
        res.status(400).send("Id do usuário está indefinido!");
    } else if(nomeAplicativo == undefined){
        res.status(400).send("nomeAplicativo está indefinido!");
    } else {
        processosModel.adicionarAplicativoProibido(idResponsavel, nomeAplicativo).then(function (resultado) {
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

function atualizarAplicativoProibido(req,res){
    var { idProcesso } = req.params;
    var { nomeAplicativo } = req.body;

    if(idProcesso == undefined) {
        res.status(400).send("Id do usuário está indefinido!");
    }else{
        processosModel.atualizarAplicativoProibido(idProcesso, nomeAplicativo).then(function (resultado) {
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

function excluirAppProibido(req, res) {
    var { idProcesso } = req.params;

    processosModel.excluirAppProibido(idProcesso)
        .then(
            function (resultado) {
                res.json(resultado);
            }
        ).catch(
            function (erro) {
                console.log(erro),
                    console.log("Houve um erro ao excluir", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        )
}

module.exports = {
    carregarAplicativosAbertos,
    carregarAplicativosProibidos,
    adicionarAplicativoProibido,
    atualizarAplicativoProibido,
    excluirAppProibido
}
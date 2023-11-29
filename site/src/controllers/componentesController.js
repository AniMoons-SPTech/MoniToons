var componentesModel = require("../models/componentesModel.js");

function getComponentes(req, res){
    var {idUsuario} = req.params;

    componentesModel.getComponentes(idUsuario)
        .then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado)
            }else{
                res.status(204).send("Nenhum resultado!")
            }
        }).catch(
            function(erro){
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function getDados(req, res){
    var {fkCompHasComp} = req.params;

    componentesModel.getDados(fkCompHasComp)
        .then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado)
            }else{
                res.status(204).send("Nenhum resultado!")
            }
        }).catch(
            function(erro){
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function dadosGraficoCpu(req, res){
    var {fkCompHasComp} = req.params;

    componentesModel.dadosGraficoCpu(fkCompHasComp).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function dadosGraficoRam(req, res){
    var {fkCompHasComp} = req.params;

    componentesModel.dadosGraficoRam(fkCompHasComp).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function dadosGraficoGpu(req, res){
    var {fkCompHasComp} = req.params;

    componentesModel.dadosGraficoGpu(fkCompHasComp).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}


function graficosLinhaAtualizado(req, res){
    var {fkCompHasComp} = req.params;

    componentesModel.graficosLinhaAtualizado(fkCompHasComp).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function graficosLinhaAtualizadoRam(req, res){
    var {fkCompHasComp} = req.params;

    componentesModel.graficosLinhaAtualizadoRam(fkCompHasComp).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}

function graficosLinhaAtualizadoGpu(req, res){
    var {fkCompHasComp} = req.params;

    componentesModel.graficosLinhaAtualizadoGpu(fkCompHasComp).then(function (resultado) {
        if (resultado.length > 0) {
            res.status(200).json(resultado);
        } else {
            res.status(204).send("Nenhum resultado encontrado!")
        }
    }).catch(function (erro) {
        console.log(erro);
        console.log("Houve um erro ao buscar as ultimas medidas.", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
    });
}



module.exports = {
    getComponentes,
    getDados,
    dadosGraficoCpu,
    dadosGraficoRam,
    dadosGraficoGpu,
    graficosLinhaAtualizado,
    graficosLinhaAtualizadoRam,
    graficosLinhaAtualizadoGpu
}
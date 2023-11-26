var maquinasModel = require("../models/maquinasModel");


function carregarGrupoMaquinas(req, res){
    var { idResponsavel } = req.params;

    if(idResponsavel == undefined) {
        res.status(400).send("Id do responsavel está indefinido!");
    }else{
        maquinasModel.carregarGrupoMaquinas(idResponsavel).then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Nenhuma maquina cadastrada!")
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}


function dadosGraficos(req, res){
    var { tipoComponente, idComponente } = req.params;

    if(tipoComponente == undefined) {
        res.status(400).send("O tipo do componente está indefinido!");
    } else if (idComponente == undefined){
        res.status(400).send("Id do componente está indefinido!");
    } else{
        maquinasModel.dadosGraficos(tipoComponente, idComponente).then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Não existe dados colocar no gráfico desse componente")
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function dadosComponentes(req, res){
    var { tipoComponente, idComponente } = req.params;

    if(tipoComponente == undefined) {
        res.status(400).send("O tipo do componente está indefinido!");
    } else if (idComponente == undefined){
        res.status(400).send("Id do componente está indefinido!");
    } else{
        maquinasModel.dadosComponentes(tipoComponente, idComponente).then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Não existe dados para esse componente")
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

module.exports = {
    carregarGrupoMaquinas,
    carregarComponentes,
    dadosGraficos,
    dadosComponentes
}
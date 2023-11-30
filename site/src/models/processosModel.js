var database = require("../database/config");

function carregarAplicativosAbertos(idUsuario){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idUsuario)

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarAplicativosProibidos(idResponsavel){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarAplicativoProibido(idResponsavel){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarAplicativoProibido(idProcesso){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function  excluirAppProibido(idProcesso){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = ``;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    carregarAplicativosAbertos,
    carregarAplicativosProibidos,
    adicionarAplicativoProibido,
    atualizarAplicativoProibido,
    excluirAppProibido
}

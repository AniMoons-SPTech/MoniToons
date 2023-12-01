var database = require("../database/config");

function carregarAplicativosAbertos(idUsuario){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idUsuario)

    var instrucao = `SELECT appsAbertos.pid, appsAbertos.nomeAplicativo, appsAbertos.usoCpu, appsAbertos.usoDisco 
                    FROM appsAbertos
                    JOIN computador c ON c.idComputador = appsAbertos.fkComputadorApp
                    JOIN usuario u ON u.idUsuario = c.fkUsuario
                    WHERE u.idUsuario = ${idUsuario} `;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarAplicativosProibidos(idResponsavel){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = `select idAplicativosProibidos, nomeAplicativoProibido from appsProibidos
                        where fkUsuario = ${idResponsavel}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function adicionarAplicativoProibido(idResponsavel, nomeAplicativo){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = `INSERT INTO appsProibidos (nomeAplicativoProibido, fkUsuario) VALUES ('${nomeAplicativo}', ${idResponsavel})`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarAplicativoProibido(idProcesso, nomeAplicativo){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idProcesso)

    var instrucao = `UPDATE appsProibidos SET nomeAplicativoProibido = '${nomeAplicativo}' WHERE idAplicativosProibidos = ${idProcesso}`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function  excluirAppProibido(idProcesso){
    console.log("ACESSEI O PROCESSOS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idProcesso)

    var instrucao = `DELETE FROM appsProibidos WHERE idAplicativosProibidos = ${idProcesso}`;

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

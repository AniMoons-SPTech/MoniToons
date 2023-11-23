const e = require("express");
var database = require("../database/config")

function validar(email){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function validar(): " ,email)
    var instrucao = `
        SELECT idUsuario, email FROM usuario WHERE email = '${email}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucao = `
        SELECT * FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function listar(idBusca){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idBusca)
    var instrucao = `
        SELECT * FROM usuario WHERE fkGestor = ${idBusca} ORDER BY nomeUsuario ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarFuncionario(nome, cargo, registro, telefone, telefone1, email,senha,plano,fkEmpresa, fkResponsavel) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cargo, registro, telefone, telefone1, email,senha, plano,fkEmpresa,fkResponsavel);

    var instrucao = `
        INSERT INTO usuario (fkEmpresa, nomeUsuario, cargo, documento, telefone, telefone1, email, senha, plano, fkGestor) VALUES (${fkEmpresa},'${nome}', '${cargo}', '${registro}', ${telefone}, ${telefone1}, '${email}', '${senha}','${plano}',${fkResponsavel});
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function excluirFuncionario(idUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():", idUsuario);

    var instrucao = `
        DELETE from usuario WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosFuncionario(idUsuario){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function dadosFuncionario(): ", idUsuario)
    var instrucao = `
        SELECT * FROM usuario WHERE idUsuario = ${idUsuario} ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function atualizarFuncionario(idUsuario,nome, cargo, registro, telefone, telefone1, email,senha ){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function atualizarFuncionario():", nome, cargo, registro, telefone, telefone1, email,senha);

    var instrucao = `
    UPDATE usuario SET nomeUsuario = '${nome}', cargo = '${cargo}', documento = ${registro}, telefone = ${telefone}, telefone2 = ${telefone1}, email = '${email}', senha = '${senha}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarInicial(nome, cargo, email, senha, documento, telefone, plano, idEmpresa){
    var instrucao = `
    INSERT INTO usuario (nomeUsuario, cargo, email, senha, documento, telefone, plano, fkEmpresa) 
    VALUES ('${nome}', '${cargo}', '${email}', '${senha}', '${documento}', '${telefone}', '${plano}', ${idEmpresa});
    `
    return database.executar(instrucao);
}

function atualizarSenha(idUsuario, senha){
    var instrucao = `
    UPDATE usuario SET senha = '${senha}' WHERE idUsuario = ${idUsuario};
    `
    return database.executar(instrucao);
}

module.exports = {
    listar,
    cadastrarFuncionario,
    validar,    
    autenticar,
    excluirFuncionario,
    dadosFuncionario,
    atualizarFuncionario,
    cadastrarInicial,
    atualizarSenha
};
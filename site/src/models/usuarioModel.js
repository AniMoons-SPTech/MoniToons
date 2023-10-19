const e = require("express");
var database = require("../database/config")

function validar(email){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function validar(): " ,email)
    var instrucao = `
        SELECT email FROM usuario WHERE email = '${email}';
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

function listar(idEmpresa){
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idEmpresa)
    var instrucao = `
        SELECT * FROM usuario WHERE fkEmpresa = ${idEmpresa} ORDER BY nome ;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrarFuncionario(nome, cargo, registro, telefone, telefone1, email,senha,fkEmpresa) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, cargo, registro, telefone, telefone1, email,senha,fkEmpresa);

    var instrucao = `
        INSERT INTO usuario VALUES (null ,'${nome}', '${cargo}', '${registro}', ${telefone}, ${telefone1}, '${email}', '${senha}', ${fkEmpresa});
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
    UPDATE usuario SET nome = '${nome}', cargo = '${cargo}', documento = ${registro}, telefone = ${telefone}, telefone2 = ${telefone1}, email = '${email}', senha = '${senha}' WHERE idUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}
function cadastrarInicial(nome, email, senha, documento, telefone, plano, idEmpresa, cargo){
    var instrucao = `
    INSERT INTO usuario (nome, cargo, email, senha, documento, telefone, plano, fkEmpresa) 
    VALUES ('${nome}', '${email}', '${senha}', '${documento}', ${telefone}, '${plano}', ${idEmpresa}, '${cargo}');
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
    cadastrarInicial
};
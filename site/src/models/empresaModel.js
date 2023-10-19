var database = require("../database/config");

function buscarPorId(id) {
  var query = `select * from empresa where id = '${id}'`;

  return database.executar(query);
}

function listar() {
  var query = `select * from empresa`;

  return database.executar(query);
}

function buscarPorCnpj(cnpj) {
  var query = `select * from empresa where cnpj = '${cnpj}'`;

  return database.executar(query);
}

function cadastrar(nomeFantasia, telefone, cnpj) {
  var query = `insert into empresa (nomeFantasia, telefone, cnpj) values ('${nomeFantasia}', ${telefone}, '${cnpj}')`;

  return database.executar(query);
}

module.exports = { buscarPorCnpj, buscarPorId, cadastrar, listar };

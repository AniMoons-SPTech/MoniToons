var database = require("../database/config")

function carregarAlertas(idEmpresa, idUsuario) {
    console.log("ACESSEI O MEDIDAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idEmpresa, idUsuario)

    var instrucao = `
    SELECT
    alerta.idAlerta,
    componente.tipo as tipoComponente,
    FORMAT(registro.dataHora, 'dd/MM/yyyy HH:mm') as dataHoraFormatada,
    registro.tipo,
    registro.dadoValor,
    alerta.grauAlerta,
    usuario.nomeUsuario
FROM
    alerta
    JOIN registro ON alerta.fkRegistro = registro.idRegistro
    JOIN computadorHasComponente ON registro.fkCompHasComp = computadorHasComponente.idCompHasComp
    JOIN componente ON computadorHasComponente.fkComponente = componente.idComponente
    JOIN computador ON computadorHasComponente.fkComputador = computador.idComputador
    JOIN usuario ON computador.fkUsuario = usuario.idUsuario
WHERE
    usuario.fkEmpresa = ${idEmpresa};`

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    carregarAlertas
}

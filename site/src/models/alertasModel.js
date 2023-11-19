var database = require("../database/config")

function carregarAlertas(idEmpresa, idUsuario) {
    console.log("ACESSEI O MEDIDAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idEmpresa, idUsuario)

    var instrucao = `
    SELECT
    alerta.idAlerta,
    componente.tipo as tipoComponente,
    DATE_FORMAT(registro.dataHora, '%d/%m/%Y %H:%i') as dataHoraFormatada,
    registro.tipo,
    registro.dadoValor,
    alerta.grauAlerta,
    usuario.nomeUsuario
FROM
    alerta
    JOIN registro ON idRegistro = fkRegistro
    JOIN computadorhascomponente ON idCompHasComp = fkCompHasComp
    JOIN componente ON idComponente = fkComponente
    JOIN computador ON idComputador = fkComputador
    JOIN usuario ON idUsuario = fkUsuario
WHERE
    usuario.fkEmpresa = ${idEmpresa}`

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    carregarAlertas
}

var database = require("../database/config")

function carregarAlertas(idEmpresa, idUsuario) {
    console.log("ACESSEI O MEDIDAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idEmpresa, idUsuario)

    var instrucao = `
    select alerta.idAlerta, componente.tipo as tipoComponente, registro.dataHora, registro.tipo, registro.dadoValor from alerta
    join registro on idRegistro = fkRegistro
    join computadorhascomponente on idCompHasComp = fkCompHasComp
    join componente on idComponente = fkComponente
    join computador on idComputador = fkComputador
    join usuario on idUsuario = fkUsuario
    where usuario.fkEmpresa = ${idEmpresa}`

    console.log("Executando a instrução SQL: \n" + instrucao)
    return database.executar(instrucao)
}

module.exports = {
    carregarAlertas
}

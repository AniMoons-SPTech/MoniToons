var database = require("../database/config")

function getComponentes(idUsuario){
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT computadorhascomponente.idCompHasComp, componente.idComponente, componente.nome, componente.tipo
                    FROM componente
                    JOIN computadorhascomponente ON fkComponente = idComponente
                    JOIN computador ON idComputador = fkComputador
                    WHERE fkUsuario = ${idUsuario};`
    console.log("Executando \n" + instrucao)                
    return database.executar(instrucao);
}

function getDados(idUsuario){
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT r.*, ec.*, comp.tipo AS tipoComp
    FROM registro r
    JOIN computadorHasComponente chc ON r.fkCompHasComp = chc.idCompHasComp
    JOIN computador c ON chc.fkComputador = c.idComputador
    JOIN usuario u ON c.fkUsuario = u.idUsuario
    JOIN especificacoesComponente ec ON chc.fkComponente = ec.fkComponente
    JOIN componente comp ON ec.fkComponente = comp.idComponente
    WHERE u.idUsuario = ${idUsuario};`
                    console.log("Executando \n" + instrucao)                
                    return database.executar(instrucao);
}


module.exports = {
    getComponentes,
    getDados
}
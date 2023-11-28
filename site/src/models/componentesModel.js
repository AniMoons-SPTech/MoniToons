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

function getDados(fkCompHasComp){
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT  comp.*, ec.*, comp.tipo AS tipoComp
    FROM computadorHasComponente chc
    JOIN computador c ON chc.fkComputador = c.idComputador
    JOIN especificacoesComponente ec ON chc.fkComponente = ec.fkComponente
    JOIN componente comp ON ec.fkComponente = comp.idComponente
    WHERE chc.idCompHasComp =${fkCompHasComp}`
                    
    console.log("Executando \n" + instrucao)                
    return database.executar(instrucao);
}

    function dadosGrafico(fkCompHasComp){
        console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT
    r.*,FORMAT(r.dataHora, 'dd/MM/yyyy HH:mm') as dataHoraFormatada,
    comp.tipo AS tipoComp
FROM
    registro r
JOIN
    computadorHasComponente chc ON r.fkCompHasComp = chc.idCompHasComp
JOIN
    componente comp ON chc.fkComponente = comp.idComponente
WHERE chc.idCompHasComp = ${fkCompHasComp}
ORDER BY
   r.dataHora DESC
OFFSET
    0 ROWS
FETCH FIRST
    7 ROWS ONLY;`
                    
    console.log("Executando \n" + instrucao)                
    return database.executar(instrucao);
    }

module.exports = {
    getComponentes,
    getDados,
    dadosGrafico
}
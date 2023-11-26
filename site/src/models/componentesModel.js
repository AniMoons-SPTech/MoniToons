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

function getDados(idComponente){
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT
    r.*,
    ec.*,
    comp.tipo AS tipoComp,
    (SELECT SUM(CAST(valor AS DECIMAL(18)))
     FROM especificacoesComponente
     WHERE tipoEspecificacao IN ('Núcleos Físicos', 'Núcleos Lógicos')) AS nucleos_total
    FROM
    registro r
    JOIN
    computadorHasComponente chc ON r.fkCompHasComp = chc.idCompHasComp
    JOIN
    especificacoesComponente ec ON chc.fkComponente = ec.fkComponente
    JOIN
    componente comp ON ec.fkComponente = comp.idComponente
    WHERE chc.idCompHasComp =    ${idComponente}
ORDER BY
   r.dataHora DESC
OFFSET
    0 ROWS
FETCH FIRST
    200 ROWS ONLY;`
                    console.log("Executando \n" + instrucao)                
                    return database.executar(instrucao);
}


module.exports = {
    getComponentes,
    getDados
}
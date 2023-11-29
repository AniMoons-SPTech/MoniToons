var database = require("../database/config")

function getComponentes(idUsuario){
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT computadorhascomponente.idCompHasComp, componente.idComponente, componente.nome, componente.tipo
                    FROM componente
                    JOIN computadorhascomponente ON fkComponente = idComponente
                    JOIN computador ON idComputador = fkComputador
                    WHERE fkUsuario = ${idUsuario}
                    ORDER BY componente.tipo;`
    console.log("Executando \n" + instrucao)                
    return database.executar(instrucao);
}

function getDados(fkCompHasComp){
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `select especificacoescomponente.* , componente.tipo from especificacoescomponente
                    join componente on componente.idComponente = especificacoescomponente.fkComponente
                    join computadorhascomponente on componente.idComponente = computadorhascomponente.fkComponente
                    where idCompHasComp =${fkCompHasComp};`
                    
    console.log("Executando \n" + instrucao)                
    return database.executar(instrucao);
}

    function dadosGraficoCpu(fkCompHasComp){
        console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT
    r.*,
    comp.tipo AS tipoComp,
    FORMAT(r.dataHora, 'dd/MM/yyyy HH:mm') AS dataHoraFormatada
    FROM
    registro r
    JOIN
    computadorHasComponente chc ON r.fkCompHasComp = chc.idCompHasComp
    JOIN
    componente comp ON chc.fkComponente = comp.idComponente
    WHERE
    r.fkCompHasComp = ${fkCompHasComp}
    ORDER BY
    r.dataHora DESC
    OFFSET
    0 ROWS
    FETCH FIRST
    7 ROWS ONLY;`
                    
    console.log("Executando \n" + instrucao)                
    return database.executar(instrucao);
    }

    function graficosLinhaAtualizado(fkCompHasComp){
        console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT
        r.*,
        comp.tipo AS tipoComp,
        FORMAT(r.dataHora, 'dd/MM/yyyy HH:mm') AS dataHoraFormatada
FROM
    registro r
JOIN
    computadorHasComponente chc ON r.fkCompHasComp = chc.idCompHasComp
JOIN
    componente comp ON chc.fkComponente = comp.idComponente
WHERE
    r.fkCompHasComp = ${fkCompHasComp}
ORDER BY
   r.dataHora DESC
OFFSET
    0 ROWS
FETCH FIRST
    1 ROWS ONLY;`
                    
    console.log("Executando \n" + instrucao)                
    return database.executar(instrucao);
    }

module.exports = {
    getComponentes,
    getDados,
    dadosGraficoCpu,
    graficosLinhaAtualizado
}
var database = require("../database/config")

function getComponentes(idUsuario) {
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

function getDados(fkCompHasComp) {
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `select especificacoescomponente.* , componente.tipo from especificacoescomponente
                    join componente on componente.idComponente = especificacoescomponente.fkComponente
                    join computadorhascomponente on componente.idComponente = computadorhascomponente.fkComponente
                    where idCompHasComp =${fkCompHasComp};`

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}

function dadosGraficoCpu(fkCompHasComp) {
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

function dadosGraficoRam(fkCompHasComp) {
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
r.fkCompHasComp = ${fkCompHasComp} AND r.tipo = 'Memória em Uso'
ORDER BY
r.dataHora
OFFSET
0 ROWS
FETCH FIRST
7 ROWS ONLY;`

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}
function dadosGraficoGpu(fkCompHasComp) {
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
r.fkCompHasComp = ${fkCompHasComp} AND r.tipo = 'Uso da GPU'
ORDER BY
r.dataHora
OFFSET
0 ROWS
FETCH FIRST
7 ROWS ONLY;`

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}

function dadosGraficoDisco(fkCompHasComp) {
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT TOP 1 
    (
        SELECT TOP 1 dadoFormatado 
        FROM registro 
        WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Espaço Disponível'
        ORDER BY dataHora DESC
    ) AS 'espacoDisponivel', 
    (
        SELECT TOP 1 dadoFormatado 
        FROM registro 
        WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Espaço em Uso'
        ORDER BY dataHora DESC
    ) AS 'espacoEmUso' 
FROM registro;`

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}

function graficosLinhaAtualizado(fkCompHasComp) {
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

function graficosLinhaAtualizadoRam(fkCompHasComp) {
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
    r.fkCompHasComp = ${fkCompHasComp} AND r.tipo = 'Memória em Uso'
ORDER BY
   r.dataHora DESC
OFFSET
    0 ROWS
FETCH FIRST
    1 ROWS ONLY;`

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}

function graficosLinhaAtualizadoGpu(fkCompHasComp) {
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
    r.fkCompHasComp = ${fkCompHasComp} AND r.tipo = 'Uso da GPU'
ORDER BY
   r.dataHora DESC
OFFSET
    0 ROWS
FETCH FIRST
    1 ROWS ONLY;`

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}

function graficosPizzaAtualizadoDisco(fkCompHasComp) {
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = `SELECT TOP 1 
    (
        SELECT TOP 1 dadoFormatado 
        FROM registro 
        WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Espaço Disponível'
        ORDER BY dataHora DESC
    ) AS 'espacoDisponivel', 
    (
        SELECT TOP 1 dadoFormatado 
        FROM registro 
        WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Espaço em Uso'
        ORDER BY dataHora DESC
    ) AS 'espacoEmUso' 
FROM registro;`

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}

function plotarRestoDosCards(fkCompHasComp, tipoComponente) {
    console.log("ACESSEI O COMPONENTES MODEL")
    var instrucao = ""; 
    if (tipoComponente == 'RAM') {
        console.log("ENTREI NO IF DA RAM")
        instrucao = `SELECT TOP 1
            (
                SELECT TOP 1 dadoFormatado 
                FROM registro 
                WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Memória em Uso'
                ORDER BY dataHora DESC
            ) AS 'memUso', 
            (
                SELECT TOP 1 dadoFormatado 
                FROM registro 
                WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Memória Disponível'
                ORDER BY dataHora DESC
            ) AS 'memDisp' 
        FROM registro`
    } else if (tipoComponente == 'DISCO') {
        console.log("ENTREI NO IF DO DISCO")
        instrucao = `SELECT TOP 1 
            (
                SELECT TOP 1 dadoFormatado 
                FROM registro 
                WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Velocidade de Leitura'
                ORDER BY dataHora DESC
            ) AS 'vel_leit', 
            (
                SELECT TOP 1 dadoFormatado 
                FROM registro 
                WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Velocidade de Escrita'
                ORDER BY dataHora DESC
            ) AS 'vel_escr' 
        FROM registro;`
    } else if (tipoComponente == 'GPU') {
        console.log("ENTREI NO IF DA GPU")
        instrucao = `SELECT TOP 1 
            (
                SELECT TOP 1 dadoFormatado 
                FROM registro 
                WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Uso da GPU'
                ORDER BY dataHora DESC
            ) AS 'gpuUso', 
            (
                SELECT TOP 1 dadoFormatado 
                FROM registro 
                WHERE fkCompHasComp = ${fkCompHasComp} AND tipo = 'Memória de Vídeo em Uso'
                ORDER BY dataHora DESC
            ) AS 'memGpuUso' 
        FROM registro;`
    }

    console.log("Executando \n" + instrucao)
    return database.executar(instrucao);
}



module.exports = {
    getComponentes,
    getDados,
    dadosGraficoCpu,
    dadosGraficoRam,
    dadosGraficoGpu,
    dadosGraficoDisco,
    graficosLinhaAtualizado,
    graficosLinhaAtualizadoRam,
    graficosLinhaAtualizadoGpu,
    graficosPizzaAtualizadoDisco,
    plotarRestoDosCards
}
var database = require("../database/config");

// function buscarUltimasMedidas(idAquario, limite_linhas) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top ${limite_linhas}
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         momento,
//                         FORMAT(momento, 'HH:mm:ss') as momento_grafico
//                     from medida
//                     where fk_aquario = ${idAquario}
//                     order by id desc`;
//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         momento,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico
//                     from medida
//                     where fk_aquario = ${idAquario}
//                     order by id desc limit ${limite_linhas}`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

// function buscarMedidasEmTempoReal(idAquario) {

//     instrucaoSql = ''

//     if (process.env.AMBIENTE_PROCESSO == "producao") {
//         instrucaoSql = `select top 1
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,  
//                         CONVERT(varchar, momento, 108) as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idAquario} 
//                     order by id desc`;

//     } else if (process.env.AMBIENTE_PROCESSO == "desenvolvimento") {
//         instrucaoSql = `select 
//         dht11_temperatura as temperatura, 
//         dht11_umidade as umidade,
//                         DATE_FORMAT(momento,'%H:%i:%s') as momento_grafico, 
//                         fk_aquario 
//                         from medida where fk_aquario = ${idAquario} 
//                     order by id desc limit 1`;
//     } else {
//         console.log("\nO AMBIENTE (produção OU desenvolvimento) NÃO FOI DEFINIDO EM app.js\n");
//         return
//     }

//     console.log("Executando a instrução SQL: \n" + instrucaoSql);
//     return database.executar(instrucaoSql);
// }

function carregarAlertasCards(idResponsavel){
    console.log("ACESSEI O MEDIDAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = `WITH ComponentesComAlerta AS (
        SELECT
            c.idComponente,
            c.tipo AS tipoComponente,
            COUNT(DISTINCT a.idAlerta) AS quantidadeAlertas
        FROM
            componente c
        LEFT JOIN computadorHasComponente chc ON c.idComponente = chc.fkComponente
        LEFT JOIN registro r ON chc.idCompHasComp = r.fkCompHasComp
        LEFT JOIN alerta a ON r.idRegistro = a.fkRegistro
        LEFT JOIN computador comp ON chc.fkComputador = comp.idComputador
        LEFT JOIN usuario u ON comp.fkUsuario = u.idUsuario
        WHERE
            u.fkGestor = SeuIDResponsavelAqui   
            AND (a.dataHora IS NULL OR a.dataHora >= DATEADD(MINUTE, -10, GETDATE()))
        GROUP BY
            c.idComponente, c.tipo
    )
    SELECT
        tipoComponente,
        COALESCE(quantidadeAlertas, 0) AS quantidadeAlertas
    FROM
        ComponentesComAlerta;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarMaquinasGestor(idResponsavel){
    console.log("ACESSEI O MEDIDAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)

    var instrucao = `	SELECT COUNT(*) as quantidadeDeMaquinas FROM usuario
                        WHERE fkGestor = ${idResponsavel}
                        GROUP BY fkGestor;`;

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    // buscarUltimasMedidas,
    // buscarMedidasEmTempoReal
    carregarAlertasCards,
    carregarMaquinasGestor
}

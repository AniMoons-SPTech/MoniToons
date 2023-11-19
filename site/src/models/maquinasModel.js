var database = require("../database/config");


function carregarGrupoMaquinas(idResponsavel){
    console.log("ACESSEI O MAQUINAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)
    
    var instrucao = `
        SELECT
            usuario.idUsuario,
            usuario.nomeUsuario,
            (SELECT alerta.grauAlerta
            FROM registro 
            LEFT JOIN alerta  ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'CPU'
            WHERE registro.fkCompHasComp = usuario.idUsuario
            ORDER BY registro.dataHora DESC
            LIMIT 1
        ) AS statusCpu,
        (SELECT alerta.grauAlerta
            FROM registro
            LEFT JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'RAM'
            WHERE registro.fkCompHasComp = usuario.idUsuario
            ORDER BY registro.dataHora DESC
            LIMIT 1
        ) AS statusRam,
            (SELECT alerta.grauAlerta
            FROM registro 
            LEFT JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'DISCO'
            WHERE registro.fkCompHasComp = usuario.idUsuario
            ORDER BY registro.dataHora DESC
            LIMIT 1
        ) AS statusDisco,
            (SELECT alerta.grauAlerta
            FROM registro 
            LEFT JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'GPU'
            WHERE registro.fkCompHasComp = usuario.idUsuario
            ORDER BY registro.dataHora DESC
            LIMIT 1
        ) AS statusGpu
    FROM
        usuario
    WHERE
        usuario.fkGestor = ${idResponsavel};`;
    
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function carregarComponentes(idUsuario){
    console.log("ACESSEI O MAQUINAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idUsuario)

    //Preciso de um seçect

    var instrucao = `
    WITH ComponentesComAlerta AS (
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
            u.fkGestor = 1
            AND (a.dataHora IS NULL OR a.dataHora >= NOW() - INTERVAL 10 MINUTE)
        GROUP BY
            c.idComponente, c.tipo
    )
    SELECT
        tipoComponente,
        COALESCE(quantidadeAlertas, 0) AS quantidadeAlertas
    FROM
        ComponentesComAlerta;
    `// Fazer select retornando idComponente, tipoComponente, nomeComponente, grauAlerta pelo idUsuario

    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function dadosGraficos(tipoComponente, idComponente){
    console.log("ACESSEI O MAQUINAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", tipoComponente, idComponente)

    var instrucaoCpu = ``;// Fazer select retornando dado, valor, dtHora
    var instrucaoRam = ``;// Fazer select retornando dado, valor, dtHora
    var instrucaoDisco = ``; // Fazer select retornando dado, valor, dtHora
    var instrucaoGpu = ``;// Fazer select retornando dado, valor, dtHora

    console.log("Executando a instrução SQL: \n" + instrucao);
    if(tipoComponente == "CPU"){
        return database.executar(instrucaoCpu);
    } else if(tipoComponente == "RAM"){
        return database.executar(instrucaoRam);
    } else if(tipoComponente == "DISCO"){
        return database.executar(instrucaoDisco);
    } else if(tipoComponente == "GPU"){
        return database.executar(instrucaoGpu);
    } else {
        return console.log("NÃO É UM COMPONENTE VÁLIDO")
    }
}

function dadosComponentes(tipoComponente, idComponente){
    console.log("ACESSEI O MAQUINAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", tipoComponente, idComponente)

    var instrucaoCpu = ``;// Fazer select retornando valor1, valor2, valor3, valor4 pelo idUsuario
    var instrucaoRam = ``;// Fazer select retornando valor1, valor2, valor3, valor4 pelo idUsuario
    var instrucaoDisco = ``; // Fazer select retornando valor1, valor2, valor3, valor4 pelo idUsuario
    var instrucaoGpu = ``;// Fazer select retornando valor1, valor2, valor3, valor4 pelo idUsuario

    console.log("Executando a instrução SQL: \n" + instrucao);
    if(tipoComponente == "CPU"){
        return database.executar(instrucaoCpu);
    } else if(tipoComponente == "RAM"){
        return database.executar(instrucaoRam);
    } else if(tipoComponente == "DISCO"){
        return database.executar(instrucaoDisco);
    } else if(tipoComponente == "GPU"){
        return database.executar(instrucaoGpu);
    } else {
        return console.log("NÃO É UM COMPONENTE VÁLIDO")
    }
}


module.exports = {
    carregarGrupoMaquinas,
    carregarComponentes,
    dadosGraficos,
    dadosComponentes
};
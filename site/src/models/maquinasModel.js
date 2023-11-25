var database = require("../database/config");


function carregarGrupoMaquinas(idResponsavel){
    console.log("ACESSEI O MAQUINAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)
    
    var instrucao = `
    SELECT
    usuario.idUsuario,
    usuario.nomeUsuario,
    (SELECT TOP 1 alerta.grauAlerta
     FROM registro
     LEFT JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'CPU'
     WHERE registro.fkCompHasComp = usuario.idUsuario
     ORDER BY registro.dataHora DESC
    ) AS statusCpu,
    (SELECT TOP 1 alerta.grauAlerta
     FROM registro
     LEFT JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'RAM'
     WHERE registro.fkCompHasComp = usuario.idUsuario
     ORDER BY registro.dataHora DESC
    ) AS statusRam,
    (SELECT TOP 1 alerta.grauAlerta
     FROM registro
     LEFT JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'DISCO'
     WHERE registro.fkCompHasComp = usuario.idUsuario
     ORDER BY registro.dataHora DESC
    ) AS statusDisco,
    (SELECT TOP 1 alerta.grauAlerta
     FROM registro
     LEFT JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'GPU'
     WHERE registro.fkCompHasComp = usuario.idUsuario
     ORDER BY registro.dataHora DESC
    ) AS statusGpu
FROM
    usuario
WHERE
    usuario.fkGestor = ${idResponsavel};`;
    
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
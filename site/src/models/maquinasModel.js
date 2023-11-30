var database = require("../database/config");


function carregarGrupoMaquinas(idResponsavel){
    console.log("ACESSEI O MAQUINAS MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar(): ", idResponsavel)
    
    var instrucao = `
    SELECT
    usuario.idUsuario as idUser,
    usuario.nomeUsuario,
    (SELECT alerta.grauAlerta
    FROM registro
    right JOIN alerta  ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'CPU'
    join computadorHasComponente chc ON chc.idCompHasComp = registro.fkCompHasComp
    join computador c ON c.idComputador = chc.fkComputador
    join usuario ON usuario.idUsuario = c.fkUsuario
     WHERE idUser = usuario.idUsuario and (alerta.dataHora IS NULL OR alerta.dataHora >= DATEADD(SECONDS, -20, GETDATE())
    ORDER BY registro.dataHora DESC
    LIMIT 1
) AS statusCpu,
(SELECT alerta.grauAlerta
    FROM registro
    right JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'RAM'
    join computadorHasComponente chc ON chc.idCompHasComp = registro.fkCompHasComp
    join computador c ON c.idComputador = chc.fkComputador
    join usuario ON usuario.idUsuario = c.fkUsuario
     WHERE idUser = usuario.idUsuario and (alerta.dataHora IS NULL OR alerta.dataHora >= DATEADD(SECONDS, -20, GETDATE())
    ORDER BY registro.dataHora DESC
    LIMIT 1
) AS statusRam,
    (SELECT alerta.grauAlerta
    FROM registro
    right JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'DISCO'
    join computadorHasComponente chc ON chc.idCompHasComp = registro.fkCompHasComp
    join computador c ON c.idComputador = chc.fkComputador
    join usuario ON usuario.idUsuario = c.fkUsuario
     WHERE idUser = usuario.idUsuario and (alerta.dataHora IS NULL OR alerta.dataHora >= DATEADD(SECONDS, -20, GETDATE())
    ORDER BY registro.dataHora DESC
    LIMIT 1
) AS statusDisco,
    (SELECT alerta.grauAlerta
    FROM registro
    right JOIN alerta ON alerta.fkRegistro = registro.idRegistro AND alerta.tipoComponente = 'GPU'
    join computadorHasComponente chc ON chc.idCompHasComp = registro.fkCompHasComp
    join computador c ON c.idComputador = chc.fkComputador
    join usuario ON usuario.idUsuario = c.fkUsuario
    WHERE idUser = usuario.idUsuario and (alerta.dataHora IS NULL OR alerta.dataHora >= DATEADD(SECONDS, -20, GETDATE())
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
    dadosGraficos,
    dadosComponentes
};
var urlAtual = window.location.href;
var urlObj = new URL(urlAtual);
var idUsuario = urlObj.searchParams.get("idUsuario");
var componentesMaquina = [];
var dadosCards = [];
var divComponentes = document.getElementById("listaComponentes")
var card1 = document.getElementById("title-card1");
var card2 = document.getElementById("title-card2");
var card3 = document.getElementById("title-card3");
var card4 = document.getElementById("title-card4");
var cardValor1 = document.getElementById("valor-card1");
var cardValor2 = document.getElementById("valor-card2");
var cardValor3 = document.getElementById("valor-card3");
var cardValor4 = document.getElementById("valor-card4");
const ctx1 = document.getElementById('myChart').getContext('2d')
let proximaAtualizacao;


function getComponentes(){
    fetch(`/componentes/getComponentes/${idUsuario}`,{
        method:'GET'
    }).then((response) => {
        if(response.ok){
            componentesMaquina = []
            response.json().then((resposta) => {
                componentesMaquina = resposta;
                for(var i = 0; i < componentesMaquina.length; i++){
                divComponentes.innerHTML += `
                <button onclick = "plotarCards(${componentesMaquina[i].idCompHasComp})" class="componente-selecao">
                <div class="especificacoes-componente">
                  <span>${componentesMaquina[i].tipo}</span>
                  <span>${componentesMaquina[i].nome}</span>
                </div>
                <div class="barra-horizontal"></div>
              </button>`
                }
            }) 
        }else{
            throw("Houve um erro")
        }
    }).catch((error) => {
        console.error(error);
    })
}


function plotarCards(fkCompHasComp){
    fetch(`/componentes/getDados/${fkCompHasComp}`,{
        method:'GET'
    }).then((response) => {
        if(response.ok){
            response.json().then((resposta) => {
                dadosCards = []
                dadosCards = resposta;
                console.log(dadosCards)
            }) 
        }else{
            throw("Houve um erro")
        }
    }).catch((error) => {
        console.error(error);
    })

    if(dadosCards[0].tipoComp == 'CPU'){
        alert('CPU')
    }
    if(dadosCards[0].tipoComp == 'RAM'){
        alert('RAM')
    }
    if(dadosCards[0].tipoComp == 'DISCO'){
        alert('DISCO')
    }
    if(dadosCards[0].tipoComp == 'GPU'){
        alert('GPU')
    }
}
function obterUltimosDadosGrafico(fkCompHasComp) {
    fetch(`/componentes/dadosGrafico/${fkCompHasComp}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {

            response.json().then(function (resposta) {
                console.log(resposta);

                setTimeout(() => atualizarGraficoLinha(fkCompHasComp), 4000);
            })    
        } else if (response.status == 404) {
            window.alert("Deu 404!");
        } else {
            throw ("Houve um erro ao tentar realizar a postagem! Código da resposta: " + response.status);
        }
    }).catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
}


function atualizarGraficoLinha(fkCompHasComp) {
    fetch(`/dado/graficosLinhaAtualizado/${idSetor}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadoUmidade);


                if (novoRegistro[0].DataColeta == dadoUmidade.data.labels[dadoUmidade.data.labels.length - 1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")
            
                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].DataColeta)
                    console.log("Horário do último dado capturado:")
                    console.log(dadoUmidade.data.labels[dadoUmidade.data.labels.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    // tirando e colocando valores no gráfico
                    dadoUmidade.data.labels.shift(); // apagar o primeiro
                    dadoUmidade.data.labels.push(novoRegistro[0].DataColeta); // incluir um novo momento
                    
                    var umidadeAntiga = dadoUmidade.data.datasets[0].data[dadoUmidade.data.datasets[0].data.length - 1];
                    dadoUmidade.data.datasets[0].data.shift();  // apagar o primeiro de umidade
                    dadoUmidade.data.datasets[0].data.push(novoRegistro[0].Umidade); // incluir uma nova medida de umidade
                    
                    var temperaturaAntiga = dadoTemperatura.data.datasets[0].data[dadoTemperatura.data.datasets[0].data.length - 1];
                    dadoTemperatura.data.datasets[0].data.shift();  // apagar o primeiro de temperatura
                    dadoTemperatura.data.datasets[0].data.push(novoRegistro[0].Temperatura); // incluir uma nova medida de temperatura

                    verificarCondicao(novoRegistro[0].Temperatura, temperaturaAntiga, novoRegistro[0].Umidade, umidadeAntiga);

                    graficoUmidade.update();
                    graficoTemperatura.update();
                }

                // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
                proximaAtualizacao = setTimeout(() => atualizarGraficoLinha(idSetor, graficoUmidade, graficoTemperatura, dadoUmidade, dadoTemperatura), 4000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
            proximaAtualizacao = setTimeout(() => atualizarGraficoLinha(idSetor, graficoUmidade, graficoTemperatura, dadoUmidade, dadoTemperatura), 2000);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}




import('https://cdn.jsdelivr.net/npm/chart.js');
var urlAtual = window.location.href;
var urlObj = new URL(urlAtual);
var idUsuario = urlObj.searchParams.get("idUsuario");
var componentesMaquina = [];
var dadosCards = [];
var divComponentes = document.getElementById("listaComponentes")
var divGrafico = document.getElementById("grafico")
var card1 = document.getElementById("title-card1");
var card2 = document.getElementById("title-card2");
var card3 = document.getElementById("title-card3");
var card4 = document.getElementById("title-card4");
var cardValor1 = document.getElementById("valor-card1");
var cardValor2 = document.getElementById("valor-card2");
var cardValor3 = document.getElementById("valor-card3");

var cardValor4 = document.getElementById("valor-card4");

var grafico1 = document.getElementById("graficoCPU");
var ctx1 = document.getElementById('myChart').getContext('2d');

var grafico2 = document.getElementById("graficoRAM");
var ctx2 = document.getElementById('myChart2').getContext('2d');

var grafico3 = document.getElementById("graficoDISCO");
var ctx3 = document.getElementById('myChart3').getContext('2d');

var grafico4 = document.getElementById("graficoGPU");
var ctx4 = document.getElementById('myChart4').getContext('2d');

var label = [];
var dadosGrafico = [];
var dadosGrafico1 = [];
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
                    if((componentesMaquina[i].nome).indexOf('NVIDIA') || componentesMaquina[i].tipo == 'CPU' || componentesMaquina[i].tipo == 'DISCO'|| componentesMaquina[i].tipo == 'RAM'){
                        divComponentes.innerHTML += `
                <button onclick = "plotarCards(${componentesMaquina[i].idCompHasComp})" class="componente-selecao">
                <div class="especificacoes-componente">
                  <span>${componentesMaquina[i].tipo}</span>
                  <span>${componentesMaquina[i].nome}</span>
                </div>
                <div class="barra-horizontal"></div>
              </button>`
              plotarCards(componentesMaquina[i].idCompHasComp)
                    }
              //obterDadosGrafico(componentesMaquina[i].idCompHasComp)
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

            if(dadosCards[0].tipo == 'CPU'){
                    var velocidade;    
                    var nucleo = 0;
                    card1.innerHTML = "% de Uso"
                    card2.innerHTML = "Velocidade"
                    card3.innerHTML = "N° de núcleos"
                    
                for(var i = dadosCards.length-1 ; i > 0 ; i-- ){
                    if(dadosCards[i].tipoEspecificacao == "Frequência"){
                        velocidade = dadosCards[i].valor;
                    }
                    if(dadosCards[i].tipoEspecificacao == "Núcleos Físicos" ){
                        nucleo += Number(dadosCards[i].valor)
                    }
                    if(dadosCards[i].tipoEspecificacao == "Núcleos Lógicos" ){
                        nucleo += Number(dadosCards[i].valor)
                    }
                }

                cardValor2.innerHTML = velocidade
                cardValor3.innerHTML = nucleo
                obterDadosGrafico(fkCompHasComp)
            }
                
            if(dadosCards[0].tipo == 'RAM'){
                var total;
                card1.innerHTML = "Memória em Uso"
                card2.innerHTML = "Memória disponível"
                card3.innerHTML = "Memória total"
                console.log(dadosCards)
                for(var i = dadosCards.length -1 ; i >= 0 ; i--){
                    if(dadosCards[i].tipoEspecificacao == "Memória Total"){
                        total = dadosCards[i].valor;
                    }
                }
                    cardValor3.innerHTML = total
                    obterDadosGrafico(fkCompHasComp)
            }
            
            if(dadosCards[0].tipo == 'DISCO'){
                var escrita;
                var leitura;
                var tamanho;
                card1.innerHTML = "Tamanho"
                card2.innerHTML = "Velocidade de escrita"
                card3.innerHTML = "Velocidade de leitura"
                console.log(dadosCards)
                    for(var i = dadosCards.length -1 ; i >= 0 ; i--){
                        if(dadosCards[i].tipoEspecificacao == "Tamanho"){
                            tamanho = dadosCards[i].valor;
                        }
                        if(dadosCards[i].tipo == "Velocidade de Escrita"){
                            escrita = dadosCards[i].dadoFormatado;
                        }
                        if(dadosCards[i].tipo == "Velocidade de Leitura"){
                            leitura = dadosCards[i].dadoFormatado;
                        }
                    }
                    cardValor1.innerHTML = tamanho  
                    cardValor3.innerHTML = leitura
                    obterDadosGrafico(fkCompHasComp)
            }

            if(dadosCards[0].tipo == 'GPU'){
                    card1.innerHTML = "Memória de Vídeo Disponível"

                    for(var i = dadosCards.length -1 ; i >= 0 ; i--){
                        if(dadosCards[i].tipoEspecificacao == "Memória Total"){
                            total = dadosCards[i].valor;
                        }
                    }
                        cardValor3.innerHTML = total
                        obterDadosGrafico(fkCompHasComp)
            }
            }) 
        }else{
            throw("Houve um erro")
        }
    }).catch((error) => {
        console.error(error);
    })

    
}

// O gráfico é construído com três funções:
    // 1. obterDadosGrafico -> Traz dados do Banco de Dados para montar o gráfico da primeira vez
    // 2. plotarGrafico -> Monta o gráfico com os dados trazidos e exibe em tela
    // 3. atualizarGrafico -> Atualiza o gráfico, trazendo novamente dados do Banco

    // Esta função *obterDadosGrafico* busca os últimos dados inseridos em tabela de medidas.
    // para, quando carregar o gráfico da primeira vez, já trazer com vários dados.
    // A função *obterDadosGrafico* também invoca a função *plotarGrafico*

function obterDadosGrafico(fkCompHasComp) {
    fetch(`/componentes/dadosGrafico/${fkCompHasComp}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                label = [];
                dadosGrafico = [];

                if(resposta[0].tipoComp == 'CPU'){
                    for(var i = 7 ; i > 0; i--) {
                        label.push(resposta[i].dataHoraFormatada);
                        dadosGrafico.push(resposta[i].dadoValor)
                    }
                    var cpu = {
                        data: {
                            datasets: [
                                {
                                    type: 'line',
                                    label: 'CPU',
                                    data: dadosGrafico,
                                    backgroundColor: '#fff',
                                    borderColor: 'rgb(123, 219, 206)'
                                }
                            ],
                            labels: label
                        }
                    }
                    cardValor1.innerHTML =  resposta[0].dadoFormatado

                    grafico1.style.display = 'flex'
                    grafico2.style.display = 'none'
                    grafico3.style.display = 'none'
                    grafico4.style.display = 'none'
                    plotarGrafico(ctx1,cpu);
                }

                if(resposta[0].tipoComp == 'RAM'){
                    for(var i = resposta.length -1 ; i > 0; i--) {
                        for(var i = 7; i > 0; i--){
                            if(resposta[i].tipo == 'Memória em Uso'){
                                dadosGrafico.push(resposta[i].dadoValor)
                                label.push(resposta[i].dataHoraFormatada);
                                cardValor1.innerHTML =  resposta[i].dadoFormatado
                            }
                        }
                        
                        if(resposta[i].tipo == 'Memória Disponível'){
                            cardValor2.innerHTML =  resposta[i].dadoFormatado
                        }
                    }
                    var ram = {
                        data: {
                            datasets: [
                                {
                                    type: 'line',
                                    label: 'RAM',
                                    data: dadosGrafico,
                                    backgroundColor: '#fff',
                                    borderColor: 'rgb(123, 001, 000)'
                                }
                            ],
                            labels: label
                        }
                    }
                        
                    grafico1.style.display = 'none'
                    grafico2.style.display = 'flex'
                    grafico3.style.display = 'none'
                    grafico4.style.display = 'none'

                plotarGrafico(ctx2,ram)
                }

                if(resposta[0].tipoComp == 'DISCO'){
                    for(var i = resposta.length -1 ; i > 0; i--) {
                        // label.push(resposta[i].dataHoraFormatada);
                        

                        if(resposta[i].tipo == 'Velocidade de Escrita'){
                            dadosGrafico.push(resposta[i].dadoValor)
                            cardValor2.innerHTML =  resposta[i].dadoFormatado
                        }
                        if(resposta[i].tipo == 'Velocidade de Leitura'){
                            dadosGrafico1.push(resposta[i].dadoValor)
                            cardValor3.innerHTML =  resposta[i].dadoFormatado
                        }
                    }
                    tipo = 'bar';
                    var disco= {
                        type: 'bar',
                        labels: ['Velocidade de Escrita', 'Velocidade de Leitura'],
                        datasets: [
                            {
                                label: 'Velocidade de Escrita',
                                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                                borderColor: 'rgba(75, 192, 192, 1)',
                                borderWidth: 1,
                                data: dadosGrafico
                            },
                            {
                                label: 'Velocidade de Leitura',
                                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                                borderColor: 'rgba(255, 99, 132, 1)',
                                borderWidth: 1,
                                data: dadosGrafico1
                            }
                        ]
                    };
                    grafico1.style.display = 'none'
                    grafico2.style.display = 'none'
                    grafico3.style.display = 'flex'
                    grafico4.style.display = 'none'

                    plotarGrafico(ctx3,disco)
                }
                if(resposta[0].tipoComp == 'GPU'){
                    for(var i = 7 ; i > 0; i--) {

                        if(resposta[i].tipo == 'tetse'){
                            dadosGrafico.push(resposta[i].dadoValor)
                            label.push(resposta[i].dataHoraFormatada);
                            cardValor1.innerHTML =  resposta[i].dadoFormatado
                        }
                        if(resposta[i].tipo == 'Memória de Vídeo Disponível'){
                            cardValor2.innerHTML =  resposta[i].dadoFormatado
                        }
                    }
                    var gpu = {
                        data: {
                            datasets: [
                                {
                                    type: 'line',
                                    label: 'GPU',
                                    data: dadosGrafico,
                                    backgroundColor: '#fff',
                                    borderColor: 'rgb(123, 001, 000)'
                                }
                            ],
                            labels: label
                        }
                    }

                    grafico1.style.display = 'none'
                    grafico2.style.display = 'none'
                    grafico3.style.display = 'none'
                    grafico4.style.display = 'flex'

                    plotarGrafico(ctx4,gpu)
                }



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

function plotarGrafico(ctx,dados){ 
    console.log(label,dadosGrafico)
    new Chart(ctx, dados);
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




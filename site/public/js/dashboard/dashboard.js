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
var card = document.getElementById("card")
var cardValor1 = document.getElementById("valor-card1");
var cardValor2 = document.getElementById("valor-card2");
var cardValor3 = document.getElementById("valor-card3");
var cardValor4 = document.getElementById("valor-card4");

var grafico1 = document.getElementById("graficoCPU");
var grafico2 = document.getElementById("graficoRAM");
var grafico3 = document.getElementById("graficoDISCO");
var grafico4 = document.getElementById("graficoGPU");

var label = [];
var labelRam = [];
var labelGpu = [];

var labelDado = [];
var labelDadoRam = [];
var labelDadoGpu = [];

var dadosGrafico = [];
var dadosGraficoRam = [];
var dadosGraficoGpu = [];
var dadosDisco = []
var espacoDisponivel;
var espacoEmUso;

let proximaAtualizacao;



function getComponentes() {
    fetch(`/componentes/getComponentes/${idUsuario}`, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            componentesMaquina = []
            response.json().then((resposta) => {
                componentesMaquina = resposta;
                for (var i = 0; i < componentesMaquina.length; i++) {
                    var cpu;
                    if (componentesMaquina[i].tipo == 'CPU') {
                        cpu = componentesMaquina[i].idCompHasComp
                    }

                    divComponentes.innerHTML += `
                <button onclick = "plotarCards(${componentesMaquina[i].idCompHasComp},${componentesMaquina[i].idComponente})" class="componente-selecao">
                <div class="especificacoes-componente">
                  <span>${componentesMaquina[i].tipo}</span>
                  <span>${componentesMaquina[i].nome}</span>
                </div>
                <div class="barra-horizontal"></div>
              </button>`
                }
                plotarCards(cpu)

            })
        } else {
            throw ("Houve um erro")
        }
    }).catch((error) => {
        console.error(error);
    })
}

function plotarCards(fkCompHasComp,idComp) {
    fetch(`/componentes/getDados/${fkCompHasComp}/${idComp}`, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            response.json().then(async (resposta) => {
                dadosCards = []
                dadosCards = resposta;

                if (dadosCards[0].tipo == 'CPU') {
                    var velocidade;
                    var nucleo1 = 0;
                    var nucleo2 = 0;
                    card1.innerHTML = "Frequência"
                    card2.innerHTML = "Núcleos Físicos"
                    card3.innerHTML = "Núcleos Lógicos"

                    for (var i = 0; i < dadosCards.length; i++) {
                        if (dadosCards[i].tipoEspecificacao == "Frequência") {
                            velocidade = dadosCards[i].valor;
                        }
                        if (dadosCards[i].tipoEspecificacao == "Núcleos Físicos") {
                            nucleo1 = Number(dadosCards[i].valor)
                        }
                        if (dadosCards[i].tipoEspecificacao == "Núcleos Lógicos") {
                            nucleo2 = Number(dadosCards[i].valor)
                        }
                    }

                    cardValor1.innerHTML = velocidade
                    cardValor2.innerHTML = nucleo1
                    cardValor3.innerHTML = nucleo2
                    obterDadosGraficoCpu(fkCompHasComp)
                }

                if (dadosCards[0].tipo == 'RAM') {

                    card1.innerHTML = "Memória em Uso"
                    card2.innerHTML = "Memória disponível"
                    card3.innerHTML = "Memória total"
                    console.log(dadosCards)
                    var memoriaTotal = ""

                    for (var i = 0; i < dadosCards.length; i++) {
                        if (dadosCards[i].tipoEspecificacao == "Memória Total") {
                            memoriaTotal = dadosCards[i].valor;
                        }
                    }
                    cardValor3.innerHTML = memoriaTotal
                    await plotarRestoDosCards('RAM', fkCompHasComp)
                    obterDadosGraficoRam(fkCompHasComp);
                }

                if (dadosCards[0].tipo == 'DISCO') {


                    card1.innerHTML = "Velocidade de leitura"
                    card2.innerHTML = "Velocidade de escrita"
                    card3.innerHTML = "Tamanho"


                    cardValor3.innerHTML = dadosCards[0].valor
                    await plotarRestoDosCards('DISCO', fkCompHasComp)
                    obterDadosGraficoDisco(fkCompHasComp)
                }

                if (dadosCards[0].tipo == 'GPU') {
                    card1.innerHTML = "Porcentagem de Uso"
                    card2.innerHTML = "Memória de Vídeo Disponível"
                    card3.innerHTML = "Fabricante"

                    var fabricante = "";
                    for (var i = 0; i < dadosCards.length; i++) {
                        if (dadosCards[i].tipoEspecificacao == "Fabricante") {
                            fabricante = dadosCards[i].valor;
                        }
                    }

                    cardValor3.innerHTML = fabricante
                    await plotarRestoDosCards('GPU', fkCompHasComp)
                    obterDadosGraficoGpu(fkCompHasComp)
                }
            })
        } else {
            throw ("Houve um erro")
        }
    }).catch((error) => {
        console.error(error);
    })
}

async function plotarRestoDosCards(tipoComponente, fkCompHasComp) {
    fetch(`/componentes/plotarRestoDosCards/${fkCompHasComp}/${tipoComponente}`, {
        method: 'GET'
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {
                var dadosCards = []
                dadosCards = resposta
                if (tipoComponente == 'DISCO') {
                    cardValor1.innerHTML = dadosCards[0].vel_leit;
                    cardValor2.innerHTML = dadosCards[0].vel_escr;
                } else if (tipoComponente == 'GPU') {
                    cardValor1.innerHTML = dadosCards[0].gpuUso;
                    cardValor2.innerHTML = dadosCards[0].memGpuUso;
                } else if (tipoComponente == 'RAM') {
                    cardValor1.innerHTML = dadosCards[0].memUso;
                    cardValor2.innerHTML = dadosCards[0].memDisp;
                }


            })
        }
    }).catch((error) => {
        console.error(error);
    })

}

function obterDadosGraficoCpu(fkCompHasComp) {
    fetch(`/componentes/dadosGraficoCpu/${fkCompHasComp}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                labelDado = []
                label = [];
                dadosGrafico = [];
                for (var i = resposta.length -1; i >= 0; --i ) {
                    labelDado.push(resposta[i].dataHora)
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


                grafico1.style.display = 'flex'
                grafico2.style.display = 'none'
                grafico3.style.display = 'none'
                grafico4.style.display = 'none'
                var ctx1 = new Chart(document.getElementById('myChart'), cpu);

               setTimeout(() => atualizarGraficoLinha(fkCompHasComp, ctx1), 8000);

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



function obterDadosGraficoRam(fkCompHasComp) {
    fetch(`/componentes/dadosGraficoRam/${fkCompHasComp}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                labelDadoRam = []
                labelRam = [];
                dadosGraficoRam = [];
                console.log(resposta)

                for (var i = resposta.length -1; i >= 0; --i) {
                    labelDadoRam.push(resposta[i].dataHora)
                    labelRam.push(resposta[i].dataHoraFormatada);
                    dadosGraficoRam.push(resposta[i].dadoValor)
                }
                var ram = {
                    data: {
                        datasets: [
                            {
                                type: 'line',
                                label: 'RAM',
                                data: dadosGraficoRam,
                                backgroundColor: '#fff',
                                borderColor: 'rgb(123, 001, 000)'
                            }
                        ],
                        labels: labelRam
                    }
                }

                grafico1.style.display = 'none'
                grafico2.style.display = 'flex'
                grafico3.style.display = 'none'
                grafico4.style.display = 'none'
                cardValor1.innerHTML = resposta[0].dadoFormatado

                var ctx2 = new Chart(document.getElementById('myChart1'), ram);
                setTimeout(() => atualizarGraficoLinhaRam(fkCompHasComp, ctx2), 8000);

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

function obterDadosGraficoGpu(fkCompHasComp) {
    fetch(`/componentes/dadosGraficoGpu/${fkCompHasComp}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                labelDadoGpu = []
                labelGpu = [];
                dadosGraficoGpu = [];

                for (var i = resposta.length -1; i >= 0; --i) {
                    labelDadoGpu.push(resposta[i].dataHora)
                    labelGpu.push(resposta[i].dataHoraFormatada);
                    dadosGraficoGpu.push(resposta[i].dadoValor)
                }
                var gpu = {
                    data: {
                        datasets: [
                            {
                                type: 'line',
                                label: 'GPU',
                                data: dadosGraficoGpu,
                                backgroundColor: '#fff',
                                borderColor: 'rgb(123, 081, 000)'
                            }
                        ],
                        labels: labelGpu
                    }
                }

                grafico1.style.display = 'none'
                grafico2.style.display = 'none'
                grafico3.style.display = 'none'
                grafico4.style.display = 'flex'

                var ctx3 = new Chart(document.getElementById('myChart2'), gpu);
               setTimeout(() => atualizarGraficoLinhaGpu(fkCompHasComp, ctx3), 8000);
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

function obterDadosGraficoDisco(fkCompHasComp) {
    fetch(`/componentes/dadosGraficoDisco/${fkCompHasComp}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                dadosDisco = resposta;
                espacoEmUso = dadosDisco[0].espacoEmUso;
                espacoDisponivel = dadosDisco[0].espacoDisponivel;
                

                var disco = {
                    type: 'pie',
                    data: {
                        labels: ['Espaço em Uso','Espaço Disponível'],
                        datasets: [
                            {
                                data: [espacoEmUso,espacoDisponivel],
                                backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(54, 162, 235, 0.8)'],
                                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                                hoverOffset: 4
                            }
                        ]
                    }
                }

                grafico1.style.display = 'none'
                grafico2.style.display = 'none'
                grafico3.style.display = 'flex'
                grafico4.style.display = 'none'

                var ctx4 = new Chart(document.getElementById('myChart3'), disco);
                setTimeout(() => atualizarGraficoPizzaDisco(fkCompHasComp, ctx4), 8000);
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


function atualizarGraficoLinha(fkCompHasComp, grafico) {
    fetch(`/componentes/graficosLinhaAtualizado/${fkCompHasComp}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadosGrafico);
                console.log(novoRegistro);


                if (novoRegistro[0].dataHora == labelDado[labelDado.length -1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")

                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].dataHora)
                    console.log("Horário do último dado capturado:")
                    console.log(labelDado[labelDado.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    
                    labelDado.shift();
                    label.shift();
                    dadosGrafico.shift();
                    label.push(novoRegistro[0].dataHoraFormatada)
                    labelDado.push(novoRegistro[0].dataHora)
                    dadosGrafico.push(novoRegistro[0].dadoValor)
                    verificarCondicao(novoRegistro)
                    grafico.update();

                }

                 setTimeout(() => atualizarGraficoLinha(fkCompHasComp, grafico), 8000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
             setTimeout(() => atualizarGraficoLinha(fkCompHasComp, grafico), 8000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function atualizarGraficoLinhaRam(fkCompHasComp, grafico) {
    fetch(`/componentes/graficosLinhaAtualizadoRam/${fkCompHasComp}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
            
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadosGraficoRam);


                if (novoRegistro[0].dataHora == labelDadoRam[labelDadoRam.length -1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")

                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].dataHora)
                    console.log("Horário do último dado capturado:")
                    console.log(labelDado[labelDadoRam.length - 1])
                    console.log("---------------------------------------------------------------")
                } else {
                    labelDadoRam.shift();
                    labelRam.shift();
                    dadosGraficoRam.shift();
                    labelDadoRam.push(novoRegistro[0].dataHora)
                    labelRam.push(novoRegistro[0].dataHoraFormatada)
                    dadosGraficoRam.push(novoRegistro[0].dadoValor)
                    verificarCondicao(novoRegistro)
                    cardValor1.innerHTML = novoRegistro[0].dadoFormatado
                    grafico.update();

                }
                 setTimeout(() => atualizarGraficoLinhaRam(fkCompHasComp, grafico), 8000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
             setTimeout(() => atualizarGraficoLinhaRam(fkCompHasComp, grafico), 8000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}


function atualizarGraficoLinhaGpu(fkCompHasComp, grafico) {
    fetch(`/componentes/graficosLinhaAtualizadoGpu/${fkCompHasComp}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadosGrafico);


                if (novoRegistro[0].dataHora == labelDadoGpu[labelDadoGpu.length -1]) {
                    console.log("---------------------------------------------------------------")
                    console.log("Como não há dados novos para captura, o gráfico não atualizará.")

                    console.log("Horário do novo dado capturado:")
                    console.log(novoRegistro[0].dataHora)
                    console.log("Horário do último dado capturado:")
                    console.log(labelDadoGpu[0])
                    console.log("---------------------------------------------------------------")
                } else {
                    labelGpu.shift();
                    labelDadoGpu.shift();
                    dadosGraficoGpu.shift();
                    labelGpu.push(novoRegistro[0].dataHoraFormatada)
                    labelDadoGpu.push(novoRegistro[0].dataHora)
                    verificarCondicao(novoRegistro)
                    dadosGraficoGpu.push(novoRegistro[0].dadoValor)
                    grafico.update();

                }

                 setTimeout(() => atualizarGraficoLinhaGpu(fkCompHasComp, grafico), 8000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
             setTimeout(() => atualizarGraficoLinhaGpu(fkCompHasComp, grafico), 8000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function atualizarGraficoPizzaDisco(fkCompHasComp, grafico) {
    fetch(`/componentes/graficosPizzaAtualizadoDisco/${fkCompHasComp}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {

                console.log(`Dados recebidos: ${JSON.stringify(novoRegistro)}`);
                console.log(`Dados atuais do gráfico:`);
                console.log(dadosDisco);

                    verificarCondicao(novoRegistro)
                    espacoDisponivel = novoRegistro[0].espacoDisponivel;
                    espacoEmUso = novoRegistro[0].espacoEmUso;
                    grafico.data.datasets[0].data = [espacoEmUso,espacoDisponivel];
                    grafico.update();
                

                 setTimeout(() => atualizarGraficoPizzaDisco(fkCompHasComp, grafico), 8000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
            // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
             setTimeout(() => atualizarGraficoPizzaDisco(fkCompHasComp, grafico), 8000);
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados para o gráfico: ${error.message}`);
        });

}


function verificarCondicao(registro){
    if(registro[0].tipoComp == 'CPU'){
        if(registro[0].dadoValor > 90){
            card.style.backgroundColor = "#EF0303"
            cardValor4.innerHTML = "CRÍTICO";
        }else if(registro[0].dadoValor > 80){
            card.style.backgroundColor = "#F87736"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }else if(registro[0].dadoValor > 70){
            card.style.backgroundColor = "#FFBF00"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }
    }
    if(registro[0].tipoComp == 'RAM'){
        if(registro[0].dadoValor > 90){
            card.style.backgroundColor = "#EF0303"
            cardValor4.innerHTML = "CRÍTICO";
        }else if(registro[0].dadoValor > 80){
            card.style.backgroundColor = "#F87736"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }else if(registro[0].dadoValor > 70){
            card.style.backgroundColor = "#FFBF00"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }
    }

    if(registro[0].tipoComp == 'GPU'){
        if(registro[0].dadoValor > 90){
            card.style.backgroundColor = "#EF0303"
            cardValor4.innerHTML = "CRÍTICO";
        }else if(registro[0].dadoValor > 80){
            card.style.backgroundColor = "#F87736"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }else if(registro[0].dadoValor > 70){
            card.style.backgroundColor = "#FFBF00"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }
    }

    else{
        if(registro[0].espacoDisponivel < 10){
            card.style.backgroundColor = "#EF0303"
            cardValor4.innerHTML = "CRÍTICO";
        }else if(registro[0].espacoDisponivel < 20){
            card.style.backgroundColor = "#F87736"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }else if(registro[0].espacoDisponivel > 70){
            card.style.backgroundColor = "#FFBF00"
            cardValor4.innerHTML = "INTERMEDIÁRIO";
        }
    }
}


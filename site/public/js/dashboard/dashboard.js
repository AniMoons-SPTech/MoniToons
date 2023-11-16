// PEGANDO ID DA URL
var queryString = window.location.search.substring(1);
var params = new URLSearchParams(queryString);
var idUsuario = params.get("idUsuario")
var listaDeGraficos = []


// Configuração dos gráficos de CPU
function plotarComponentes() {
    fetch(`/componentes//carregarComponentes/${idUsuario}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {
                var divCardGrafico = document.getElementById("div_card_grafico")

                var divInfoComponentesLista = document.createElement("div");
                divInfoComponentesLista.setAttribute("id", "div_info_componentes_lista");
                divInfoComponentesLista.classList.add("info-componente");

                var tituloInfoComponente = document.createElement("div");
                tituloInfoComponente.innerHTML = "Componentes"
                tituloInfoComponente.classList.add("titulo-info-componente")

                divInfoComponentesLista.appendChild(tituloInfoComponente);

                resposta.forEach(componente => {
                    var tipoComponente = componente.tipoComponente
                    var idComponente = componente.idComponente;

                    var graficoComponente = document.createElement("div")
                    graficoComponente.classList.add("grafico-componente")
                    graficoComponente.setAttribute("id", `grafico-${tipoComponente}-${idComponente}`)

                    var canvasGrafico = document.createElement("canvas")
                    canvasGrafico.setAttribute("id", `canvas-grafico-${tipoComponente}-${idComponente}`)

                    listaDeGraficos.push(`canvas-grafico-${tipoComponente}-${idComponente}`)
                    listaEstadosComponente.push(componente.grauAlerta)

                    graficoComponente.appendChild(canvasGrafico)
                    divCardGrafico.appendChild(graficoComponente)

                    // nesse select vou precisar do tipo do componente, do id e do nome dele e o seu grauAlerta

                    // ID, TIPO, NOME, grauAlerta

                    var infoComponente = document.createElement("div")
                    infoComponente.setAttribute("id", tipoComponente);
                    infoComponente.setAttribute("onclick", () => mudarGrafico(`grafico-${tipoComponente}-${idComponente}`))
                    infoComponente.classList.add("info-componente-item")

                    var bordaAvisoComeco = document.createElement("div")
                    bordaAvisoComeco.classList.add("borda-aviso")

                    var bordaAvisoFinal = document.createElement("div")
                    bordaAvisoFinal.classList.add("borda-aviso")

                    switch (componente.grauAlerta) {
                        case "CRITICO":
                            bordaAvisoFinal.classList.add("critico")
                            break;
                        case "INTERMEDIARIO":
                            bordaAvisoFinal.classList.add("intermediario")
                            break;
                        case "MODERADO":
                            bordaAvisoFinal.classList.add("moderado")
                            break;
                        default:
                            bordaAvisoFinal.classList.add("saudavel")
                    }

                    var divAuxiliar = document.createElement("div")
                    divAuxiliar.classList.add("div-auxiliar")

                    var infoComponenteTipo = document.createElement("div")
                    infoComponenteTipo.classList.add("info-componente-item-titulo")
                    infoComponenteTipo.innerHTML = tipoComponente

                    var infoComponenteNome = document.createElement("div")
                    infoComponenteNome.classList.add("info-componente-item-valor")
                    infoComponenteNome.innerHTML = componente.nomeComponente

                    divAuxiliar.appendChild(infoComponenteTipo);
                    divAuxiliar.appendChild(infoComponenteNome);
                    infoComponente.appendChild(bordaAvisoComeco);
                    infoComponente.appendChild(divAuxiliar);
                    infoComponente.appendChild(bordaAvisoFinal);
                    divInfoComponentesLista.appendChild(infoComponente);
                });

                divCardGrafico.appendChild(divInfoComponentesLista);


            })
        }
    })
}

const configs = {
    CPU: {
        data: {
            labels: [],
            datasets: [{
                label: "USO DE CPU",
                borderColor: '#EF0303',
                backgroundColor: '#EF0303',
                radius: 1,
                data: [],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            }
        }
    },
    RAM: {
        data: {
            labels: [],
            datasets: [{
                label: "USO DE RAM",
                backgroundColor: '#FFBF00',
                borderColor: '#FFBF00',
                radius: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            }
        }
    },
    DISCO: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: [
                '#E5E5E5',
                '#8fff8f',
            ],
            hoverOffset: 4,
        }],
        type: 'pie',
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            }
        }
    },
    GPU: {
        data: {
            labels: [],
            datasets: [{
                label: "USO DE GPU",
                backgroundColor: '#F87736',
                borderColor: '#F87736',
                radius: 1,
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100
                }
            },
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            }
        }
    }
};


function criarGraficos() {
    for (var i = 0; i < listaDeGraficos.length; i++) {
        var infoIdGrafico = listaDeGraficos[i].split("-");
        var tipoComponente = infoIdGrafico[2];

        // Use as configurações dinâmicas para o tipo de componente
        const configAtual = configs[tipoComponente];

        if (configAtual) {
            new Chart(document.getElementById(listaDeGraficos[i]), configAtual);
        } else {
            console.error(`Configurações não encontradas para o tipo de componente: ${tipoComponente}`);
        }
    }
    mudarGraficoPrimeiraVez(listaDeGraficos[0]);
}


function mudarGraficoPrimeiraVez(componente) {

    var listaDadosId = componente.split("-");
    var tipoComponente = listaDadosId[1];
    var idComponente = listaDadosId[2];

    mudarCardsInfo(tipoComponente, idComponente);


    fetch(`/maquinas//dadosGraficos/${tipoComponente}/${idComponente}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {
                if (response.ok) {
                    const dadosRecebidos = resposta;

                    // Atualizar dados do gráfico
                    const idGrafico = `canvas-grafico-${tipoComponente}-${idComponente}`;
                    const graficoExistente = Chart.getChart(idGrafico);

                    if (graficoExistente) {
                        
                        const configAtual = configs[tipoComponente];

                        configAtual.data.labels = dadosRecebidos.map(dado => dado.dataHora);
                        configAtual.data.datasets[0].data = dadosRecebidos.map(dado => dado.valor);

                        graficoExistente.data = configAtual.data;
                        graficoExistente.update();
                    } else {

                        new Chart(document.getElementById(idGrafico), configs[tipoComponente]);
                    
                    }
                }
            })
        }
    })
}

function mudarCardsInfo(tipoComponente, idComponente) {

    // select tem que pegar 3 dados diferentes referentes a aquele tipo de componente

    fetch(`/maquinas//dadosComponentes/${tipoComponente}/${idComponente}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if (response.ok) {
            response.json().then((resposta) => {

                var areaCardsAdicionais = document.getElementById("div_cards_adicionais")

                var cardInfo1 = document.createElement("div")
                var cardInfo2 = document.createElement("div")
                var cardInfo3 = document.createElement("div")
                var cardInfo4 = document.createElement("div")
                cardInfo1.classList.add("card-info-adicional")
                cardInfo2.classList.add("card-info-adicional")
                cardInfo3.classList.add("card-info-adicional")
                cardInfo4.classList.add("card-info-adicional")

                var tituloCardInfo1 = document.createElement("div")
                var tituloCardInfo2 = document.createElement("div")
                var tituloCardInfo3 = document.createElement("div")
                var tituloCardInfo4 = document.createElement("div")
                tituloCardInfo1.classList.add("titulo-info-adicional")
                tituloCardInfo2.classList.add("titulo-info-adicional")
                tituloCardInfo3.classList.add("titulo-info-adicional")
                tituloCardInfo4.classList.add("titulo-info-adicional")

                var conteudoCardInfo1 = document.createElement("div")
                var conteudoCardInfo2 = document.createElement("div")
                var conteudoCardInfo3 = document.createElement("div")
                var conteudoCardInfo4 = document.createElement("div")
                conteudoCardInfo1.classList.add("conteudo-info-adicional")
                conteudoCardInfo2.classList.add("conteudo-info-adicional")
                conteudoCardInfo3.classList.add("conteudo-info-adicional")
                conteudoCardInfo4.classList.add("conteudo-info-adicional")

                if (tipoComponente == "CPU") {
                    tituloCardInfo1.innerHTML = "% de Uso"
                    tituloCardInfo2.innerHTML = "Velocidade"
                    tituloCardInfo3.innerHTML = "N° de núcleos"
                    tituloCardInfo4.innerHTML = "Nível do alerta"

                    conteudoCardInfo1.innerHTML = `${resposta.porcentagemUso}%`;
                    conteudoCardInfo2.innerHTML = `${resposta.velocidade}Ghz`;
                    conteudoCardInfo3.innerHTML = `${resposta.numeroNucleos}`;
                    conteudoCardInfo4.innerHTML = `${resposta.grauAlerta}`;

                } else if (tipoComponente == "RAM") {
                    tituloCardInfo1.innerHTML = "Memória total"
                    tituloCardInfo2.innerHTML = "% de Uso"
                    tituloCardInfo3.innerHTML = "Memória disponível"
                    tituloCardInfo4.innerHTML = "Nível do alerta"

                    conteudoCardInfo1.innerHTML = `${resposta.memoriaTotal}Gb`;
                    conteudoCardInfo2.innerHTML = `${resposta.porcentagemUso}%`;
                    conteudoCardInfo3.innerHTML = `${resposta.memoriaDisponivel}`;
                    conteudoCardInfo4.innerHTML = `${resposta.grauAlerta}`;

                } else if (tipoComponente == "DISCO") {
                    tituloCardInfo1.innerHTML = "Espaço disponível"
                    tituloCardInfo2.innerHTML = "Velocidade de escrita"
                    tituloCardInfo3.innerHTML = "Velocidade de leitura"
                    tituloCardInfo4.innerHTML = "Nível do alerta"

                    conteudoCardInfo1.innerHTML = `${resposta.memoriaTotal}Gb`;
                    conteudoCardInfo2.innerHTML = `${resposta.porcentagemUso}%`;
                    conteudoCardInfo3.innerHTML = `${resposta.memoriaDisponivel}`;
                    conteudoCardInfo4.innerHTML = `${resposta.grauAlerta}`;

                } else if (tipoComponente == "GPU") {
                    tituloCardInfo1.innerHTML = "% de Uso"
                    tituloCardInfo2.innerHTML = "Memória disponível"
                    tituloCardInfo3.innerHTML = "Temperatura"
                    tituloCardInfo4.innerHTML = "Nível do alerta"

                    conteudoCardInfo1.innerHTML = `${resposta.porcentagemUso}%`;
                    conteudoCardInfo2.innerHTML = `${resposta.memoriaDisponivel}Mb`;
                    conteudoCardInfo3.innerHTML = `${resposta.temperatura}°C`;
                    conteudoCardInfo4.innerHTML = `${resposta.grauAlerta}`;
                }
                cardInfo1.appendChild(tituloCardInfo1);
                cardInfo1.appendChild(conteudoCardInfo1);
                cardInfo2.appendChild(tituloCardInfo2);
                cardInfo2.appendChild(conteudoCardInfo2);
                cardInfo3.appendChild(tituloCardInfo3);
                cardInfo3.appendChild(conteudoCardInfo3);
                cardInfo4.appendChild(tituloCardInfo4);
                cardInfo4.appendChild(conteudoCardInfo4);

                areaCardsAdicionais.appendChild(cardInfo1);
                areaCardsAdicionais.appendChild(cardInfo2);
                areaCardsAdicionais.appendChild(cardInfo3);
                areaCardsAdicionais.appendChild(cardInfo4);
            })
        }
    })

}
// PEGANDO ID DA URL
var queryString = window.location.search.substring(1);
var params = new URLSearchParams(queryString);
var idUsuario = params.get("idUsuario")
var listaDeGraficos = []


// Configuração dos gráficos de CPU
function plotarComponentes(){
    fetch(`/dadosGraficos//carregarComponentes/${idUsuario}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if(response.ok) {
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

                    graficoComponente.appendChild(canvasGrafico)
                    divCardGrafico.appendChild(graficoComponente)

                    // nesse select vou precisar do tipo do componente, do id e do nome dele e o seu grauAlerta

                    // ID, TIPO, NOME, grauAlerta

                    var infoComponente = document.createElement("div")
                    infoComponente.setAttribute("id", tipoComponente);
                    infoComponente.setAttribute("onclick", mudarGrafico(`grafico-${tipoComponente}-${idComponente}`, idComponente))
                    infoComponente.classList.add("info-componente-item")

                    var bordaAvisoComeco = document.createElement("div")
                    bordaAvisoComeco.classList.add("borda-aviso")

                    var bordaAvisoFinal = document.createElement("div")
                    bordaAvisoFinal.classList.add("borda-aviso")

                    switch(componente.grauAlerta){
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
                    infoComponenteNome,classList.add("info-componente-item-valor")
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

const dataCPU = [
    { data: '01:00', count: 45 },
    { data: '02:00', count: 40 },
    { data: '03:00', count: 44 },
    { data: '04:00', count: 47 },
    { data: '05:00', count: 50 },
    { data: '06:00', count: 68 },
    { data: '07:00', count: 75 },
    { data: '08:00', count: 80 },
    { data: '09:00', count: 85 },
    { data: '10:00', count: 86 },
    { data: '11:00', count: 93 },
    { data: '12:00', count: 95 },
];

const dadosCPU = {
    // labels: dataCPU.map((item) => item.data),
    datasets: [{
        label: "USO DE CPU",
        // data: dataCPU.map((item) => item.count),
        borderColor: '#EF0303',
        backgroundColor: '#EF0303',
        radius: 1,
    }]
}

const configCPU = {
    type: 'line',
    data: dadosCPU,
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

// Configuração do gráfico de GPU

const dataGPU = [
    { data: '01:00', count: 60 },
    { data: '02:00', count: 58 },
    { data: '03:00', count: 62 },
    { data: '04:00', count: 65 },
    { data: '05:00', count: 68 },
    { data: '06:00', count: 70 },
    { data: '07:00', count: 66 },
    { data: '08:00', count: 68 },
    { data: '09:00', count: 62 },
    { data: '10:00', count: 72 },
    { data: '11:00', count: 80 },
    { data: '12:00', count: 85 },
];

const dadosGPU = {
    // labels: dataGPU.map((item) => item.data),
    datasets: [{
        label: "USO DE GPU",
        // data: dataGPU.map((item) => item.count),
        backgroundColor: '#F87736',
        borderColor: '#F87736',
        radius: 1,
    }]
}

const configGPU = {
    type: 'line',
    data: dadosGPU,
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

// Configuração do gráfico de RAM

const dataRAM = [
    { data: '01:00', count: 52 },
    { data: '02:00', count: 44 },
    { data: '03:00', count: 50 },
    { data: '04:00', count: 58 },
    { data: '05:00', count: 60 },
    { data: '06:00', count: 55 },
    { data: '07:00', count: 64 },
    { data: '08:00', count: 60 },
    { data: '09:00', count: 65 },
    { data: '10:00', count: 70 },
    { data: '11:00', count: 71 },
    { data: '12:00', count: 79 },
];

const dadosRAM = {
    // labels: dataRAM.map((item) => item.data),
    datasets: [{
        label: "USO DE RAM",
        // data: dataRAM.map((item) => item.count),
        backgroundColor: '#FFBF00',
        borderColor: '#FFBF00',
        radius: 1,
    }]
}

const configRAM = {
    type: 'line',
    data: dadosRAM,
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

// Configuração do gráfico de DISCO

const dataDISCO = [
    40, 60
]

const dadosDISCO = {
    labels: [
        'Livre',
        'Em uso'
    ],
    datasets: [{
        data: dataDISCO,
        backgroundColor: [
            '#E5E5E5',
            '#8fff8f',
        ],
        hoverOffset: 4,

    }]
}

const configDISCO = {
    type: 'pie',
    data: dadosDISCO,
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

function criarGraficos(){
    for(var i = 0; i < listaDeGraficos.length; i++){
        var infoIdGrafico = listaDeGraficos[i].split("-");
        
        switch (infoIdGrafico[2]){
            case "CPU":
                new Chart(document.getElementById(listaDeGraficos[i]), configCPU)
                break;
            case "RAM":
                new Chart(document.getElementById(listaDeGraficos[i]), configRAM)
                break;
            case "DISCO":
                new Chart(document.getElementById(listaDeGraficos[i]), configDISCO)
                break;
            case "GPU":
                new Chart(document.getElementById(listaDeGraficos[i]), configGPU)
                break;
        }
    }
}


function mudarGrafico(componente, cardOpcao) {

    // endpoint para cpus / idComponeteCPU

    
    const grafico = document.getElementById(componente);
    const elementoPai = grafico.parentElement;
    const graficos = elementoPai.children;

    for (let i = 0; i < graficos.length; i++) {
        graficos[i].style.display = 'none';
    }

    grafico.style.display = 'flex';

    const infoComponente = document.getElementsByClassName('info-componente-item');
    for (let i = 0; i < infoComponente.length; i++) {
        infoComponente[i].classList.remove('ativo');
    }

    const componenteClicado = document.getElementById(cardOpcao);
    componenteClicado.classList.add('ativo');

}

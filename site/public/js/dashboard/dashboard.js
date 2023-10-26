// Configuração dos gráficos de CPU
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
    labels: dataCPU.map((item) => item.data),
    datasets: [{
        label: "USO DE CPU",
        data: dataCPU.map((item) => item.count),
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
    labels: dataGPU.map((item) => item.data),
    datasets: [{
        label: "USO DE GPU",
        data: dataGPU.map((item) => item.count),
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
    labels: dataRAM.map((item) => item.data),
    datasets: [{
        label: "USO DE RAM",
        data: dataRAM.map((item) => item.count),
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



new Chart(document.getElementById('canvas-grafico-CPU'), configCPU);
new Chart(document.getElementById('canvas-grafico-GPU'), configGPU);
new Chart(document.getElementById('canvas-grafico-RAM'), configRAM);
new Chart(document.getElementById('canvas-grafico-DISCO'), configDISCO);


function mudarGrafico(componente, cardOpcao) {
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
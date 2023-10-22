// Configuração dos gráficos de CPU
const dataCPU = [
    { data: '01:00', count: 20 },
    { data: '02:00', count: 10 },
    { data: '03:00', count: 15 },
    { data: '04:00', count: 25 },
    { data: '05:00', count: 22 },
    { data: '06:00', count: 30 },
    { data: '07:00', count: 28 },
    { data: '08:00', count: 36 },
    { data: '09:00', count: 40 },
    { data: '10:00', count: 38 },
    { data: '11:00', count: 45 },
    { data: '12:00', count: 50 },
];

const dadosCPU = {
    labels: dataCPU.map((item) => item.data),
    datasets: [{
        label: "USO DE CPU",
        data: dataCPU.map((item) => item.count),
        borderColor: '#5271FF',
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
    { data: '01:00', count: 30 },
    { data: '02:00', count: 15 },
    { data: '03:00', count: 11 },
    { data: '04:00', count: 20 },
    { data: '05:00', count: 25 },
    { data: '06:00', count: 33 },
    { data: '07:00', count: 25 },
    { data: '08:00', count: 32 },
    { data: '09:00', count: 38 },
    { data: '10:00', count: 43 },
    { data: '11:00', count: 47 },
    { data: '12:00', count: 55 },
];

const dadosGPU = {
    labels: dataGPU.map((item) => item.data),
    datasets: [{
        label: "USO DE GPU",
        data: dataGPU.map((item) => item.count),
        backgroundColor: '#AB1A3D',
        borderColor: '#AB1A3D',
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
    { data: '01:00', count: 2 },
    { data: '02:00', count: 3 },
    { data: '03:00', count: 5 },
    { data: '04:00', count: 8 },
    { data: '05:00', count: 7 },
    { data: '06:00', count: 8 },
    { data: '07:00', count: 5 },
    { data: '08:00', count: 9 },
    { data: '09:00', count: 12 },
    { data: '10:00', count: 10 },
    { data: '11:00', count: 15 },
    { data: '12:00', count: 13 },
];

const dadosRAM = {
    labels: dataRAM.map((item) => item.data),
    datasets: [{
        label: "USO DE RAM",
        data: dataRAM.map((item) => item.count),
        backgroundColor: '#E87E1C',
        borderColor: '#E87E1C',
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
            '#AB1A3D',
        ],
        hoverOffset: 4,

    }]
}

const configDISCO = {
    type: 'pie',
    data: dadosDISCO,
    options: {
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
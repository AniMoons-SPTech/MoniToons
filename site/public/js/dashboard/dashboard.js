const label = [];
const data = [
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

const dados = {
    labels: data.map((item) => item.data),
    datasets: [{
        label: "USO DE CPU",
        data: data.map((item) => item.count),
        backgroundColor: '#5271FF'
    }]
}

const config_cpu = {
    type: 'line',
    data: dados,
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

new Chart(document.getElementById('grafico-CPU', 'CPU'), config_cpu);
new Chart(document.getElementById('grafico-GPU', 'GPU'), config_cpu);
new Chart(document.getElementById('grafico-RAM', 'RAM'), config_cpu);
new Chart(document.getElementById('grafico-DISCO', 'DISCO'), config_cpu);


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
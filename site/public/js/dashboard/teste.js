function plotarGrafico(dados) {
    // Verifique se a variável myChart está definida e é uma instância válida de Chart
    if (typeof window.myChart !== 'undefined' && window.myChart !== null) {
        // Atualize os dados do gráfico existente
        window.myChart.data.labels = dados.labels;
        window.myChart.data.datasets[0].data = dados.valores;

        // Atualize opções, se necessário
        // window.myChart.options = { ... };

        // Atualize o gráfico
        window.myChart.update();
    } else {
        // Crie um novo gráfico se não existir
        var ctx = document.getElementById('myChart').getContext('2d');
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados.labels,
                datasets: [{
                    label: 'Meu Gráfico',
                    data: dados.valores,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                // Suas opções aqui
            }
        });
    }
}

// Exemplo de uso:
var dados1 = {
    labels: ['Label1', 'Label2', 'Label3'],
    valores: [10, 20, 30]
};

var dados2 = {
    labels: ['LabelA', 'LabelB', 'LabelC'],
    valores: [40, 50, 60]
};

// Chamando a função com novos dados
plotarGrafico(dados1);

// Agora, suponha que você tem um botão que, quando clicado, chama a função com novos dados
var botao = document.getElementById('seuBotao');

botao.addEventListener('click', function() {
    // Chamando a função com novos dados quando o botão é clicado
    plotarGrafico(dados2);
});

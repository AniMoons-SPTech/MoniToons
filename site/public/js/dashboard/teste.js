function plotarGrafico() {
    var dados1 = {
        labels: ['Label1', 'Label2', 'Label3'],
        valores: [10, 20, 30]
    };
    
    var dados2 = {
        labels: ['LabelA', 'LabelB', 'LabelC'],
        valores: [40, 50, 60]
    };
    // Verifique se a variável myChart está definida e é uma instância válida de Chart
    if (typeof window.myChart !== 'undefined' && window.myChart !== null) {
        // Atualize os dados do gráfico existente
        window.myChart.data.labels = dados2.labels;
        window.myChart.data.datasets[0].data = dados2.valores;
        window.myChart.update();
    } else {
        var ctx = document.getElementById('myChart');
        window.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: dados1.labels,
                datasets: [{
                    label: 'Meu Gráfico',
                    data: dados1.valores,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            }
        });
    }
}








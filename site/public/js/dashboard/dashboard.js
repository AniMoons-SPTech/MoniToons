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
var cpu = []; 
var ram = []; 
var disco = []; 
var gpu = []; 


function getComponentes(){
    fetch(`/componentes/getComponentes/${idUsuario}`,{
        method:'GET'
    }).then((response) => {
        if(response.ok){
            componentesMaquina = []
            response.json().then((resposta) => {
                componentesMaquina = resposta;
                exibirComponentes(componentesMaquina)
                
            }) 
        }else{
            throw("Houve um erro")
        }
    }).catch((error) => {
        console.error(error);
    })
}

function exibirComponentes(componentesMaquina){
    var funcao;
    getDados()
    for(var i = 0; i < componentesMaquina.length ; i++){
        if(componentesMaquina[i].tipo == "CPU"){ 
            funcao = `dadosCpu()`;
        }else if (componentesMaquina[i].tipo == "GPU"){
            funcao = `dadosGpu()`;
        }else if(componentesMaquina[i].tipo == "DISCO"){
            funcao = `dadosDisco()`;
            
        }else if(componentesMaquina[i].tipo == "RAM"){
            funcao = `dadosRam()`;
            
        }

        divComponentes.innerHTML += `
        <button onclick = "${funcao}" class="componente-selecao">
        <div class="especificacoes-componente">
          <span>${componentesMaquina[i].tipo}</span>
          <span>${componentesMaquina[i].nome}</span>
        </div>
        <div class="barra-horizontal"></div>
      </button> `
        
    }
}

function getDados(){
    fetch(`/componentes/getDados/${idUsuario}`,{
        method:'GET'
    }).then((response) => {
        if(response.ok){
            response.json().then((resposta) => {
                dadosCards = resposta;
                for(var i = 0; i < dadosCards.length ; i++){
                    if(dadosCards[i].tipoComp == "CPU"){ 
                        cpu.push(dadosCards[i])
                    }else if (dadosCards[i].tipoComp == "GPU"){
                        gpu.push(dadosCards[i])
                    }else if(dadosCards[i].tipoComp == "DISCO"){
                        disco.push(dadosCards[i])
                    }else if(dadosCards[i].tipoComp == "RAM"){
                        ram.push(dadosCards[i])
                    } 
                }
                
                console.log(dadosCards)
            }) 
        }else{
            throw("Houve um erro")
        }
    }).catch((error) => {
        console.error(error);
    })
    

}

function dadosCpu(){
    var velocidade;    
    card1.innerHTML = "% de Uso"
    card2.innerHTML = "Velocidade"
    card3.innerHTML = "N° de núcleos"
        for(var i = 0; i < cpu.length; i++){
            if(cpu[i].tipoEspecificacao == "Frequência"){
                velocidade = cpu[i].valor;
            }
        }
        cardValor1.innerHTML = cpu[0].dadoFormatado
        cardValor2.innerHTML = velocidade
        cardValor3.innerHTML = cpu[0].nucleos_total
    }


function dadosRam(){
    var uso;
    var disponivel;
    card1.innerHTML = "% de Uso"
    card2.innerHTML = "Memória disponível"
    card3.innerHTML = "Memória total"
    console.log(ram)
    console.log(ram[0].tipo)
    // for(var i = 0; i < ram.length; i --){
    //     if(ram[i].tipo == "Memória em Uso"){
    //         uso = ram[i].dadoFormatado
    //     }else{
    //         disponivel = ram[i].dadoFormatado
    //     }
    // }

        cardValor1.innerHTML = uso
        cardValor2.innerHTML = disponivel
        cardValor3.innerHTML = ram[0].valor
}


function dadosDisco(){
    var escrita;
    var leitura;
    card1.innerHTML = "Tamanho"
    card2.innerHTML = "Velocidade de escrita"
    card3.innerHTML = "Velocidade de leitura"
    console.log(disco)
        for(var i = disco.length -1 ; i >= 0 ; i--){
            if(disco[0].tipo == "Velocidade de escrita"){
                escrita = disco[i].dadoFormatado;
            }else{
                leitura = disco[i].dadoFormatado;
            }
        }
    console.log(ram[0].tipo)
    // for(var i = 0; i < disco.length; i --){
    //     if(disco[i].tipo == "Velocidade de Escrita"){
    //         escrita = disco[i].dadoFormatado;
    //     }else{
    //         leitura = disco[i].dadoFormatado
    //     }
    // }
        cardValor1.innerHTML = disco[0].valor
        cardValor2.innerHTML = escrita
        cardValor3.innerHTML = leitura
    
}


function dadosGpu(){
    card1.innerHTML = "% de Uso"
    card2.innerHTML = "Memória disponível"
    card3.innerHTML = "Temperatura"
    console.log(gpu)
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




function carregarGrupoMaquinas() {
    fetch(`/maquinas//carregarGrupoMaquinas/${idResponsavel}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if(response.ok) {
            response.json().then((resposta) => {
                plotarCardsMaquinas(resposta)
            })  
        }
    })
}

function plotarCardsMaquinas(maquinas) {
    var cards = document.getElementById(cards);

    maquinas.forEach((maquina) => {

        // ESTRUTURA DA TUPLA
        // ID, NOME, STATUS-CPU, STATUS-RAM, STATUS-DISCO, STATUS-GPU

        var idUsuario = maquina.idUsuario;

        var card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("onclick", `abrirDashboard(${idUsuario})`)

        var conteudo = document.createElement("div")
        conteudo.classList.add("conteudo")

        var spanNomeUser = document.createElement("span")
        spanNomeUser.classList.add("titulo-conteudo")
        spanNomeUser.innerHTML = maquina.nomeUsuario;

        var centroConteudo = document.createElement("div")
        centroConteudo.classList.add("centro-conteudo")

        for (let i = 0; i < 4; i++) {
            var colunaStatus = document.createElement("div")
            colunaStatus.classList.add("coluna_status")

            var componente = document.createElement("p")
            switch (i){
                case 1:
                    componente.innerHTML = "CPU"
                    break;
                case 2:
                    componente.innerHTML = "RAM"
                    break;
                case 3:
                    componente.innerHTML = "DISCO" 
                    break;
                case 4:
                    componente.innerHTML = "GPU"
                    break;
            }

            var iconeStatus = document.createElement("img")
            var status = document.createElement("p")
            var estado = "";
            if(i == 0){
                estado = maquina.statusCpu  
            } else if (i == 1) {
                estado = maquina.statusRam
            } else if (i == 2) {
                estado = maquina.statusDisco
            } else if (i == 3) {
                estado = maquina.statusGpu
            }
            switch (estado){
                case "CRITICO":
                    iconeStatus.setAttribute("src", "../assets/")
                    status.innerHTML = maquina.status
                    break;
                case "INTERMEDIARIO":
                    iconeStatus.setAttribute("src", "../assets/")
                    status.innerHTML = maquina.status
                    break;
                case "MODERADO":
                    iconeStatus.setAttribute("src", "../assets/")
                    status.innerHTML = maquina.status
                    break;
                default:
                    iconeStatus.setAttribute("src", "../assets/")
                    status.innerHTML = "SAUDÁVEL"
            }

            colunaStatus.appendChild(componente);
            colunaStatus.appendChild(iconeStatus);
            colunaStatus.appendChild(status);

            centroConteudo.appendChild(colunaStatus);
        }

        var botaoVerMais = document.createElement("a");
        botaoVerMais.setAttribute("href", "./dashboard.html?idUsuario=" + idUsuario);

        // FAZER COM QUE O ID DO USUÁRIO SEJA PASSADO PELO URL 

        conteudo.appendChild(spanNomeUser);
        conteudo.appendChild(centroConteudo);
        conteudo.appendChild(botaoVerMais);

        card.appendChild(conteudo);
        cards.appendChild(card); 
    });
}

function abrirDashboard(idUsuario){
    window.location.href = "./dashboard.html?idUsuario=" + idUsuario
}
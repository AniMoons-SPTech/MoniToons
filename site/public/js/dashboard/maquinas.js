var cardsArea = document.getElementById("cards")

function carregarGrupoMaquinas() {
    fetch(`/maquinas/carregarGrupoMaquinas/${sessionStorage.ID_USUARIO}`, {
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
    var cards = document.getElementById("cards");

    maquinas.forEach(maquina => {

        // ESTRUTURA DA TUPLA
        // ID, NOME, STATUS-CPU, STATUS-RAM, STATUS-DISCO, STATUS-GPU

        var idUser = maquina.idUser;

        var card = document.createElement("div")
        card.classList.add("card")
        card.setAttribute("onclick", `abrirDashboard(${idUser})`)

        var conteudo = document.createElement("div")
        conteudo.classList.add("conteudo")


        var spanNomeUser = document.createElement("span")
        spanNomeUser.classList.add("titulo-conteudo")
        spanNomeUser.innerHTML = maquina.nomeUsuario;

        var centroConteudo = document.createElement("div")
        centroConteudo.classList.add("centro-conteudo")
        centroConteudo.setAttribute("id", `statusCardsUsuario${idUser}`)

        for (let i = 1; i < 5; i++) {
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
            iconeStatus.setAttribute("id", `iconeStatus${idUser}${i}`)
            var status = document.createElement("p")
            status.setAttribute("id", `status${idUser}${i}`)
            var estado = "";
            if(i == 1){
                estado = maquina.statusCpu 
            } else if (i == 2) {
                estado = maquina.statusRam
            } else if (i == 3) {
                estado = maquina.statusDisco
            } else if (i == 4) {
                estado = maquina.statusGpu
            }
            switch (estado){
                case "CRITICO":
                    iconeStatus.setAttribute("src", "../assets/fogo.png")
                    status.innerHTML = "Crítico"
                    break;
                case "INTERMEDIARIO":
                    iconeStatus.setAttribute("src", "../assets/avisoLaranja.png")
                    status.innerHTML = "Intermediário"
                    break;
                case "MODERADO":
                    iconeStatus.setAttribute("src", "../assets/avisoAmarelo.png")
                    status.innerHTML = "Moderado"
                    break;
                default:
                    iconeStatus.setAttribute("src", "../assets/check.png")
                    status.innerHTML = "Saudável"
            }

            colunaStatus.appendChild(componente);
            colunaStatus.appendChild(iconeStatus);
            colunaStatus.appendChild(status);

            centroConteudo.appendChild(colunaStatus);
        }

        var botaoVerMais = document.createElement("a");
        botaoVerMais.setAttribute("href", "./dashboard.html?idUsuario=" + idUser);
        botaoVerMais.innerHTML = "Ver mais"

        // FAZER COM QUE O ID DO USUÁRIO SEJA PASSADO PELO URL 

        conteudo.appendChild(spanNomeUser);
        conteudo.appendChild(centroConteudo);
        conteudo.appendChild(botaoVerMais);

        card.appendChild(conteudo);
        cards.appendChild(card); 
    });
    var intervaloPlotar = plotarStatusDeTemposEmTempos()
    setInterval(intervaloPlotar, 15000)
}


function plotarStatusDeTemposEmTempos() {
    fetch(`/maquinas/carregarGrupoMaquinas/${sessionStorage.ID_USUARIO}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        }
    }).then((response) => {
        if(response.ok) {
            response.json().then((maquinas) => {
                maquinas.forEach(maquina => {

                    // ESTRUTURA DA TUPLA
                    // ID, NOME, STATUS-CPU, STATUS-RAM, STATUS-DISCO, STATUS-GPU
            
                    var idUser = maquina.idUser;
            
                    for (let i = 1; i < 5; i++) {
                        var iconeStatus = document.getElementById(`iconeStatus${idUser}${i}`)
                        var status = document.getElementById(`status${idUser}${i}`)
            
                        var estado = "";
                        if(i == 1){
                            estado = maquina.statusCpu 
                        } else if (i == 2) {
                            estado = maquina.statusRam
                        } else if (i == 3) {
                            estado = maquina.statusDisco
                        } else if (i == 4) {
                            estado = maquina.statusGpu
                        }
                        switch (estado){
                            case "CRITICO":
                                iconeStatus.setAttribute("src", "../assets/fogo.png")
                                status.innerHTML = "Crítico"
                                break;
                            case "INTERMEDIARIO":
                                iconeStatus.setAttribute("src", "../assets/avisoLaranja.png")
                                status.innerHTML = "Intermediário"
                                break;
                            case "MODERADO":
                                iconeStatus.setAttribute("src", "../assets/avisoAmarelo.png")
                                status.innerHTML = "Moderado"
                                break;
                            default:
                                iconeStatus.setAttribute("src", "../assets/check.png")
                                status.innerHTML = "Saudável"
                        }
                    }
                });
            })  
        }
    })    
}

function abrirDashboard(idUser){
    window.location.href = "./dashboard.html?idUsuario=" + idUser
}
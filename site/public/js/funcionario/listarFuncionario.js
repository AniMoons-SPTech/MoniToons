var div_cards = document.getElementById("cards_func")
var idEmpresa = sessionStorage.FK_EMPRESA;
var campoNome = document.getElementById("nome_usuario");
var campoCargo = document.getElementById("cargo_usuario");
var nomeUser = sessionStorage.NOME_USUARIO;
var cargoUser = sessionStorage.CARGO_USUARIO;
var idUsuario = sessionStorage.ID_USUARIO;
var fkGestor = sessionStorage.FK_GESTOR;
var spanNome = document.getElementById("spanNome");
var spanEmail = document.getElementById("spanEmail");
var spanCpf = document.getElementById("spanCpf");
var spanCargo = document.getElementById("spanCargo");
var spanEmpresa = document.getElementById("spanEmpresa");
var idBusca;




function listarDados(){
    fetch(`/usuarios/dadosFuncionario/${idUsuario}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if(response.ok) {
            response.json().then((resposta) => {
                exibirDados(resposta);
            })
        }
    })
    
}

function exibirDados(vetor){
    spanNome.innerHTML = vetor[0].nomeUsuario;
    spanEmail.innerHTML = vetor[0].email;
    spanCpf.innerHTML = vetor[0].documento;
    spanCargo.innerHTML = vetor[0].cargo;
}

function listar(){

    if (sessionStorage.CARGO_USUARIO == "ADMINISTRADOR"){
        idBusca = idUsuario;
    } else {
        idBusca = fkGestor;
    }

    fetch(`/usuarios/listar/${idBusca}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if(response.ok) {
            response.json().then((resposta) => {
                exibirFuncionarios(resposta);
            })
        }
    })
}
    
    function exibirFuncionarios(vetor){

        console.log(vetor)

    for(var i = 0; i < vetor.length; i++){
        cards_func.innerHTML += `
        <div class="card-funcionario">
                    <div class="imagem-funcionario">
                        <img src="../assets/Lovepik_com-828906606-Hand drawn office computer character scene design element 03 1.png" alt="">
                        <img class="botao-atualizar-funcionario" src="../assets/att-func.png" onclick="mostrarPopupAtualizarFunc(),atualizar(${vetor[i].idUsuario})">
                    </div>
                    <div class="info-funcionario">
                        <div class="nome-funcionario">
                            <h1 id="nome_func">${vetor[i].nomeUsuario}</h1>
                        </div>
                        <div class="cargo-funcionario">
                            Cargo: <span id="cargo_func">${vetor[i].cargo}</span>
                        </div>
                        <div class="email-funcionario">
                            Email: <span id="email_func">${vetor[i].email}</span>
                        </div>
                        <div class="telefone-funcionario">
                            Telefone: <span id="tel_func">${vetor[i].telefone}</span>
                        </div>
                    </div>
                    <div class="excluir-funcionario">
                        <img src="../assets/excluir-funcionario.png" onclick="mostrarPopupExcluirFunc(),excluir(${vetor[i].idUsuario})">
                    </div>
                </div>
        
        `
    }
    if(sessionStorage.CARGO_USUARIO == "COMUM"){
        var botaoAtualizar = document.querySelectorAll(".botao-atualizar-funcionario");
        var botaoDeletar = document.querySelectorAll(".excluir-funcionario")

        for(let i = 0; i < botaoAtualizar.length; i++){
            botaoAtualizar[i].setAttribute("style", "display: none")
            botaoDeletar[i].setAttribute("style", "display: none")
        }
        
    }
        
    }

        
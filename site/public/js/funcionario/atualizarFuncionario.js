var nomeInput = document.getElementById("nomeAtualizar")
var cargoInput = document.getElementById("cargoAtualizar")
var telefoneInput = document.getElementById("telefoneAtualizar")
var telefone1Input = document.getElementById("telefone1Atualizar")
var registroInput = document.getElementById("registroAtualizar")
var emailInput = document.getElementById("emailAtualizar")
var senhaInput = document.getElementById("senhaAtualizar")
var idUsuarioAtualizar;

function atualizar(idUsuario){
    idUsuarioAtualizar = idUsuario; 
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
    nomeInput.value = vetor[0].nome;
    cargoInput.value = vetor[0].cargo;
    registroInput.value = vetor[0].documento;
    telefoneInput.value = vetor[0].telefone;
    telefone1Input.value = vetor[0].telefone2;
    emailInput.value = vetor[0].email;
    senhaInput.value = vetor[0].senha;
}

function atualizarFuncionario(){
    var telefone1 = telefone1Input.value
    var telefone2Valor = telefone1 !== '' ? `'${telefone1}'` : 'null';
    fetch(`/usuarios/atualizarFuncionario/${idUsuarioAtualizar}` , {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            nome: nomeInput.value,
            cargo: cargoInput.value,
            registro: registroInput.value,
            telefone: telefoneInput.value,
            telefone1: telefone2Valor,
            email: emailInput.value,
            senha: senhaInput.value
        }) 
    }).then(function (resposta) {

        console.log("resposta:", resposta);

        if(resposta.ok) {
        alert("Funcionário atualizado com sucesso!")                
        } else{
            throw("Houve um erro ao tentar realizar cadastro!")
        }
    }).catch(function (resposta){
        console.log(`#ERRO: ${resposta}`);
    });

}
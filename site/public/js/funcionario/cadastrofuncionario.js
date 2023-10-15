var nome = document.getElementById("nomeInput")
var cargo = document.getElementById("cargoInput")
var email = document.getElementById("emailInput")
var registro = document.getElementById("registroInput")
var senha = document.getElementById("senhaInput")
var fkEmpresa = sessionStorage.FK_EMPRESA
var emailExistente = [];


 

function validar(){
    var nome2 = nome.value;
    var cargo2 = cargo.value;
    var email2 = email.value;
    var registro2 = registro.value;
    var senha2 = senha.value;

    if(nome2 == "" || cargo2 == "" || email2 == "" || registro2 == "" || senha2 == ""){
        alert("Campos vazios!");
    } 
    else if(!email2.includes("@")){
            alert("E-mail inválido")
    }
    else if(senha2.length < 8){
        alert("Senha fraca!")
    }
    else{
        alert("Funcionário cadastrado com sucesso!")
        fetch("/usuarios/cadastrarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nome: nome2,
                cargo: cargo2,
                registro: registro2,
                email: email2,
                senha: senha2,
                fkEmpresa : fkEmpresa
            }) 
        }).then(function (resposta) {
    
            console.log("resposta:", resposta);
    
            if(resposta.ok) {
            alert("Funcionário cadastrado com sucesso!")                
            } else{
                throw("Houve um erro ao tentar realizar cadastro!")
            }
        }).catch(function (resposta){
            console.log(`#ERRO: ${resposta}`);
        });

    }
}


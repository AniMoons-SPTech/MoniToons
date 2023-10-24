var nome = document.getElementById("nomeInput")
var cargo = document.getElementById("cargoInput")
var telefone = document.getElementById("telefoneInput")
var telefone1 = document.getElementById("telefone1Input")
var email = document.getElementById("emailInput")
var registro = document.getElementById("registroInput")
var senha = document.getElementById("senhaInput")
var fkEmpresa = sessionStorage.FK_EMPRESA;
var fkResponsavel = sessionStorage.ID_USUARIO;
var plano = sessionStorage.PLANO_USUARIO;
 

function validar(){
    var nome2 = nome.value;
    var cargo2 = cargo.value;
    var registro2 = registro.value;
    var telefone2 = telefone.value;
    var telefone12 = telefone1.value;
    var email2 = email.value;
    var senha2 = senha.value;

    // fetch(`/usuarios/validar/${email2}`,{
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //     }).then((response) => {
    //         if(response.ok) {
    //             response.json().then((resposta) => {
    //                 if(resposta.length > 0){
    //                     emailExistente = resposta
    //                 }else{
    //                     emailExistente = []
    //                 } 
    //             })
    //         }
    //     })
    
    if(nome2 == "" || cargo2 == "" || email2 == "" || registro2 == "" || senha2 == "" || telefone2 == ""){
        alert("Campos vazios!");
    } 
    else if(!email2.includes("@")){
            alert("E-mail inválido!")
    }
    else if(senha2.length < 8){
        alert("Senha fraca!")
    }
    else if(telefone2.length > 11){
        alert("Número de telefone inválido!")
    }
    else{
        var telefone2Valor = telefone12 !== '' ? `'${telefone12}'` : 'null';
        fetch("/usuarios/cadastrarFuncionario", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nome: nome2,
                cargo: cargo2,
                registro: registro2,
                telefone: telefone2,
                telefone1: telefone2Valor,
                email: email2,
                senha: senha2,
                plano:plano,
                fkEmpresa : fkEmpresa,
                fkResponsavel : fkResponsavel
            }) 
        }).then(function (resposta) {
    
            console.log("resposta:", resposta);
    
            if(resposta.ok) {
            window.alert("Funcionário cadastrado com sucesso!")                
            } else{
                throw("Houve um erro ao tentar realizar cadastro!")
            }
        }).catch(function (resposta){
            console.log(`#ERRO: ${resposta}`);
        });

    }
}


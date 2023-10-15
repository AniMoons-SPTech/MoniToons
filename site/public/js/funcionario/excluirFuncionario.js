var idFuncionario;

function excluir(idUsuario){
    idFuncionario = idUsuario;
}

function excluirFuncionario(){
    fetch(`/usuarios/excluirFuncionario/${idFuncionario}`, {   
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if(resposta.ok){
            
            window.alert("Funcionário Deletado com sucesso")
            mostrarPopupExcluirFunc();
            location.reload(true);

        }else if(resposta.status == 404){
            window.alert("Deu 404!")
        }else{
            throw("Houve um erro ao tentar excluir funcionário!" + resposta.status);
        }
    }).catch(function(resposta){
        console.log(`#ERRO: ${resposta}` )
    })

    }

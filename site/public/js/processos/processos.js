function adicionarAplicativoProibido(){
    var fkGestor = sessionStorage.ID_USUARIO
    var nomeForm = nomeAdicionar.value;

    fetch(`/processos/adicionarAplicativoProibido`, {
        method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nomeAplicativo: nomeForm,
                idResponsavel: fkGestor
            })  
        }).then(function (resposta) {
    
            console.log("resposta:", resposta);
    
            if(resposta.ok) {
            window.alert("Aplicativo registrado com sucesso")                
            } else{
                throw("Houve um erro ao tentar realizar o registro!")
            }
        }).catch(function (resposta){
            console.log(`#ERRO: ${resposta}`);
        });
}

function atualizarAplicativoProibido() {
    var popup = document.getElementById("popup-atualizar-aplicativo")
    var spanIdProcesso = document.getElementById("idProcesso")
    var idProcesso = spanIdProcesso.innerHTML;
    var nomeForm = nomeAtualizar.value;


    fetch(`/processos/atualizarAplicativoProibido/${idProcesso}`, {
        method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                nomeAplicativo: nomeForm,
            }) 
        }).then(function (resposta) {
    
            console.log("resposta:", resposta);
    
            if(resposta.ok) {
            window.alert("Aplicativo atualizado com sucesso")                
            } else{
                throw("Houve um erro ao tentar realizara atualização!")
            }
        }).catch(function (resposta){
            console.log(`#ERRO: ${resposta}`);
        });
}

function excluirApp(idProcesso){
    fetch(`/processos/excluirAppProibido/${idProcesso}`, {   
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (resposta) {
        if(resposta.ok){
            
            window.alert("Aplivativo proibido deletado com sucesso")
            location.reload(true);

        }else if(resposta.status == 404){
            window.alert("Deu 404!")
        }else{
            throw("Houve um erro ao tentar excluir o aplicativo proibido!" + resposta.status);
        }
    }).catch(function(resposta){
        console.log(`#ERRO: ${resposta}` )
    })

    }

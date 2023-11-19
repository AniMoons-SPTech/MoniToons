function plotarGraficos () {

}

function chamarDadosCpu (idUsuario) {
    fetch(`/componentes/carregarCpu/${idUsuario}`, {
        method: 'GET',
        headers: {
            "Content-Type": "application/json"
        },
    }).then((response) => {
        if(response.ok) {
            response.json().then((resposta) => {
                plotarGraficos(resposta);
            })
        }
    }).catch((error) => {
        console.log(error);
    })
}

function chamarDadosRam (idMaquina) {
  fetch(`/usuarios/dadosFuncionario/${idMaquina}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      },
  }).then((response) => {
      if(response.ok) {
          response.json().then((resposta) => {
              plotarGraficos(resposta);
          })
      }
  }).catch((error) => {
      console.log(error);
  })
}

function chamarDadosDisco (idMaquina) {
  fetch(`/usuarios/dadosFuncionario/${idMaquina}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      },
  }).then((response) => {
      if(response.ok) {
          response.json().then((resposta) => {
              plotarGraficos(resposta);
          })
      }
  }).catch((error) => {
      console.log(error);
  })
}

function chamarDadosGpu (idMaquina) {
  fetch(`/usuarios/dadosFuncionario/${idMaquina}`, {
      method: 'GET',
      headers: {
          "Content-Type": "application/json"
      },
  }).then((response) => {
      if(response.ok) {
          response.json().then((resposta) => {
              plotarGraficos(resposta);
          })
      }
  }).catch((error) => {
      console.log(error);
  })
}

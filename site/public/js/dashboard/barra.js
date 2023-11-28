function mudaBarraApp() {
    var linkApp = document.getElementById("link_app")
    var liOpcaoGeral = document.getElementById("li_secao_geral")
    var liAppAbertos = document.getElementById("li_app_abertos")
    var liAppProibidos = document.getElementById("li_app_proibidos")
    var liFuncionario = document.getElementById("li_secao_funcionarios")
    var dashUsuario = document.getElementById("dashboard")
    var dashboardLink = document.getElementById('dashboardLink');
    var idUsuario = sessionStorage.ID_USUARIO;


    if (sessionStorage.CARGO_USUARIO == "COMUM") {
      dashUsuario.style.display = "block";
      dashboardLink.addEventListener('click', function() {
        window.location.href = `./dashboard.html?idUsuario=${idUsuario}`;
   });
      liOpcaoGeral.style.display = "none";
      liFuncionario.style.display = "none"
      liAppAbertos.style.display = "block";
      liAppProibidos.style.display = "none";
    } else if (sessionStorage.CARGO_USUARIO == "ADMINISTRADOR") {
      dashUsuario.style.display = "none";
      liOpcaoGeral.style.display = "block";
      liAppAbertos.style.display = "none";
      liAppProibidos.style.display = "block";
    }
    

  }

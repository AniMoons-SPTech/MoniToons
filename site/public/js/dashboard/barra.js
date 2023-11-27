function mudaBarraApp() {
    var linkApp = document.getElementById("link_app")
    var liOpcaoGeral = document.getElementById("li_opcao_geral")
    var liAppAbertos = document.getElementById("li_app_abertos")
    var liAppProibidos = document.getElementById("li_app_proibidos")

    if (sessionStorage.CARGO_USUARIO == "COMUM") {
      liOpcaoGeral.style.display = "none";
      liAppAbertos.style.display = "block";
      liAppProibidos.style.display = "none";
    } else if (sessionStorage.CARGO_USUARIO == "ADMINISTRADOR") {
      liOpcaoGeral.style.display = "block";
      liAppAbertos.style.display = "none";
      liAppProibidos.style.display = "block";
    }
  }

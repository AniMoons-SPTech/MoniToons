function mostrarSenha(){
    var icones = document.querySelectorAll("#icone_olho")
    var inputSenhas = document.querySelectorAll(".input_senha")

    icones.forEach((iconeOlho) => {
        iconeOlho.classList.toggle("fa-eye")
        iconeOlho.classList.toggle("fa-eye-slash")
    })
    inputSenhas.forEach(function(inputSenha){
        if (inputSenha.getAttribute("type") === "password"){
            inputSenha.setAttribute("type", "text")
        } else {
            inputSenha.setAttribute("type", "password")
        }
    })
    
}
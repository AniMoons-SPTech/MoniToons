var nomeUsuario = document.getElementById("nome_usuario");
var cargoUsuario = document.getElementById("cargo_usuario");
var nome = sessionStorage.NOME_USUARIO;
var cargo = sessionStorage.CARGO_USUARIO;

nomeUsuario.innerHTML = nome;
cargoUsuario.innerHTML = cargo;

if(cargo != 'ADMINISTRADOR' ){
    window.location = "/dashboard/dashboard.js";
}
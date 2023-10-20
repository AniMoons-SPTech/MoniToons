var express = require("express");
var router = express.Router();

var usuarioController = require("../controllers/usuarioController");

//Recebendo os dados do html e direcionando para a função cadastrar de usuarioController.js
router.post("/cadastrar", function (req, res) {
    usuarioController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    usuarioController.autenticar(req, res);
});

router.get("/validar/:email", function (req, res) {
    usuarioController.validar(req,res);
})

router.get("/listar/:idEmpresa", function (req , res) {
    usuarioController.listar(req,res);
})

router.post("/cadastrarFuncionario", function(req,res){
    usuarioController.cadastrarFuncionario(req,res);
})

router.delete("/excluirFuncionario/:idUsuario", function(req,res){
    usuarioController.excluirFuncionario(req,res);
})

router.get("/dadosFuncionario/:idUsuario", function(req,res){
    usuarioController.dadosFuncionario(req,res);
})

router.post("/atualizarFuncionario/:idUsuario", function(req, res){
    usuarioController.atualizarFuncionario(req,res);
})

router.post("/recuperarSenha", function(req,res){
    usuarioController.recuperarSenha(req,res);
})

module.exports = router;
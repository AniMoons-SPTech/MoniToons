var usuarioModel = require("../models/usuarioModel");
var empresaModel = require("../models/empresaModel")


function autenticar(req, res) {
    var {email, senha} = req.body;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        usuarioModel.autenticar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);

                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function validar(req, res){
    var {email} = req.params;
    if (email == undefined){
        res.status(400).send("Email indefinido")
    }else{
        usuarioModel.validar(email).then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado)
            } else{
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(function (erro) {
        console.log(erro) 
        console.log("Erro!" , erro.sqlMessage)
        res.status(500).json(erro.sqlMessage);
    })   
    }
}

function listar(req, res){
    var { idEmpresa } = req.params;

    if(idEmpresa == undefined) {
        res.status(400).send("Id da empresa está indefinido!");
    }else{
        usuarioModel.listar(idEmpresa).then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Nenhum funcionário cadastrado!")
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }
}

function cadastrarFuncionario(req, res){
    var {nome, cargo, registro, telefone, telefone1, email,senha,fkEmpresa} = req.body;

    if(nome == undefined){
        res.status(400).send("Seu nome está undefined!");
    }else if(email == undefined){
        res.status(400).send("Seu email está undefined!");
    }else if(senha == undefined){
        res.status(400).send("Seu senha está undefined!");
    } else{
        usuarioModel.cadastrarFuncionario(nome, cargo, registro, telefone, telefone1, email,senha,fkEmpresa)
            .then(
                function(resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro! Erro:",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function excluirFuncionario(req, res){
    var  {idUsuario}  = req.params;

    usuarioModel.excluirFuncionario(idUsuario)
    .then(
        function (resultado) {
            res.json(resultado);
        }
    ).catch(
        function (erro) {
        console.log(erro),
        console.log("Houve um erro ao excluir", erro.sqlMessage);
        res.status(500).json(erro.sqlMessage);
        }
    )
}

    function dadosFuncionario(req, res){
        var {idUsuario} = req.params;
        
        usuarioModel.dadosFuncionario(idUsuario)
        .then(function (resultado) {
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(204).send("Dados inexistentes!")
            }
        }).catch(function (erro) {
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        });
    }

    function atualizarFuncionario(req, res){
        var {idUsuario} = req.params;
        var {nome, cargo, registro, telefone, telefone1, email,senha} = req.body;

        if(nome == undefined){
            res.status(400).send("Seu nome está undefined!");
        }else if(email == undefined){
            res.status(400).send("Seu email está undefined!");
        }else if(senha == undefined){
            res.status(400).send("Seu senha está undefined!");
        } else{
            usuarioModel.atualizarFuncionario(idUsuario,nome, cargo, registro, telefone, telefone1, email,senha)
                .then(
                    function(resultado) {
                        res.json(resultado);
                    }
                ).catch(
                    function (erro) {
                        console.log(erro);
                        console.log(
                            "\nHouve um erro! Erro:",
                            erro.sqlMessage
                        );
                        res.status(500).json(erro.sqlMessage);
                    }
                );
        }

    }
async function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    console.log(req)
    var tipoPessoa = req.body.cadastroServer.tipoPessoa;

    var nome = req.body.cadastroServer.usuario.nomeCompleto;
    var email = req.body.cadastroServer.usuario.email;
    var senha = req.body.cadastroServer.usuario.senha;
    var documento = req.body.cadastroServer.usuario.documento;
    var telefoneAdmin = req.body.cadastroServer.usuario.telefone;
    var plano = req.body.cadastroServer.usuario.planoAdquirido;

    var nomeFantasia = req.body.cadastroServer.empresa.nomeFantasia;
    var telefoneEmpresa = req.body.cadastroServer.empresa.telefone;
    var cnpj = req.body.cadastroServer.empresa.cnpj;
    // Faça as validações dos valores
    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    } else if (documento == undefined) {
            res.status(400).send("Seu documento está undefined!");
    } else if (telefoneAdmin == undefined) {
            res.status(400).send("Sua telefone está undefined!");
    } else if (plano == undefined) {
            res.status(400).send("Sua plano está undefined!");
    } else {
        var cargo;
        if(tipoPessoa == "Pessoa Jurídica"){
            var fkEmpresa;
            cargo = "ADMINISTRADOR"

            await empresaModel.cadastrar(nomeFantasia, telefoneEmpresa, cnpj)
            
            var busca = await empresaModel.buscarPorCnpj(cnpj)
            fkEmpresa = busca[0].idEmpresa;

            await usuarioModel.cadastrarInicial(nome, email, senha, documento, telefoneAdmin, plano, fkEmpresa, cargo)

        } else if(tipoPessoa == "Pessoa Física") {
            cargo = "COMUM"
            usuarioModel.cadastrarInicial(nome, cargo, email, senha, documento, telefoneAdmin, plano, "null")
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
        } else if(tipoPessoa == undefined){
            res.status(400).send("O tipo do cadastro está undefined!");
        }
    }
}

module.exports = {
    cadastrarFuncionario,
    validar,
    autenticar,
    cadastrar,
    listar,
    excluirFuncionario,
    dadosFuncionario,
    atualizarFuncionario
}
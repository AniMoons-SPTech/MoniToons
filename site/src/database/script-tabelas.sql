/*Crie o usuário: 'animoons' e senha: 'animoons'*/

CREATE DATABASE IF NOT EXISTS animoons;
USE animoons;
CREATE TABLE empresa(
idEmpresa int primary key auto_increment,
nome varchar(50),
cnpj varchar(18),
telefone int
);

CREATE TABLE usuario(
idUsuario int primary key auto_increment,
nome varchar(100),
cargo varchar(50),
email varchar(80),
senha varchar(20),
documento varchar(20),
telefone varchar(11),
plano varchar(30),
fkEmpresa int,
fkResponsavel int,
constraint fkResponsavel foreign key (fkResponsavel) references usuario(idUsuario),
constraint fkEmpresa foreign key (fkEmpresa) references empresa(idEmpresa)
);	
select * from usuario;
INSERT INTO empresa values (null, 'Combo studio', 12345678000190, 1123568495);
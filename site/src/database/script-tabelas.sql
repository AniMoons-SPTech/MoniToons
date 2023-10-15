/*Crie o usuário: 'animoons' e senha: 'animoons'*/

CREATE DATABASE IF NOT EXISTS animoos;
USE animoons;
CREATE TABLE empresa(
idEmpresa int primary key auto_increment,
nome varchar(50),
cnpj bigint,
telefone int
);

CREATE TABLE usuario(
idUsuario int primary key auto_increment,
nome varchar(100),
cargo varchar(50),
documento varchar(20),
email varchar(80),
senha varchar(20),
fkEmpresa int,
constraint fkEmpresa foreign key (fkEmpresa) references empresa(idEmpresa)
);	
select * from usuario;
INSERT INTO empresa values (null, 'Combo studio', 12345678000190, 1123568495);
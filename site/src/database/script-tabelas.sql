/*Crie o usuário: 'animoons' e senha: 'animoons'*/

CREATE DATABASE animoons;
USE animoons;
CREATE TABLE usuario (
idUsuario INT primary key auto_increment,
nome varchar(45),
sobrenome varchar(45),
cargo varchar(45),
email varchar(60),
senha varchar(10)
);

INSERT INTO usuario VALUES (null, "Julya" , "Aiko", "Admin", "julyaaiko@gmail.com", "12345678");
INSERT INTO usuario VALUES (null, "Julya" , "Aiko", "Animadora", "aikoju@gmail.com", "12345678");

SELECT * from usuario;
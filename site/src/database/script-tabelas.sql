-- DROP DATABASE animoons;
CREATE DATABASE animoons;
USE animoons;

CREATE TABLE IF NOT EXISTS empresa (
  idEmpresa INT NOT NULL AUTO_INCREMENT,
  nomeFantasia VARCHAR(50),
  cnpj VARCHAR(20),
  telefone VARCHAR(15),
PRIMARY KEY (idEmpresa));

CREATE TABLE IF NOT EXISTS usuario (
  idUsuario INT NOT NULL AUTO_INCREMENT,
  nome VARCHAR(100),
  cargo VARCHAR(20),
  documento VARCHAR(20) ,
  telefone VARCHAR(15) ,
  telefone2 VARCHAR(15) ,
  email VARCHAR(100),
  senha VARCHAR(20),
  plano VARCHAR(60),
  fkEmpresa INT,
  fkResponsável INT ,
  PRIMARY KEY (idUsuario),
  CONSTRAINT fkEmpresa
    FOREIGN KEY (fkEmpresa)
    REFERENCES empresa(idEmpresa),
  CONSTRAINT fkResponsavel
    FOREIGN KEY (fkResponsável)
    REFERENCES usuario (idUsuario));

CREATE TABLE IF NOT EXISTS componente (
  idComponente INT AUTO_INCREMENT,
  tipo VARCHAR(45),
  numNucleo INT,
  capacidade DOUBLE ,
  velocidade DOUBLE ,
  nomeComponente VARCHAR(100) ,
  PRIMARY KEY (idComponente));

CREATE TABLE IF NOT EXISTS registro(
  idRegistros INT NOT NULL AUTO_INCREMENT,
  fkComponente INT ,
  uso DOUBLE ,
  velocidadeGravada DOUBLE ,
  velocidadeLeitura DOUBLE ,
  velocidadeCpu DOUBLE ,
  memoriaUso DOUBLE ,
  memoriaDisponivel DOUBLE ,
  dtHora DATETIME ,
  temperatura DOUBLE ,
  PRIMARY KEY (idRegistros),
  CONSTRAINT fkRegistroComponente
    FOREIGN KEY (fkComponente)
    REFERENCES componente (idComponente));

CREATE TABLE IF NOT EXISTS alertas (
  idalertas INT NOT NULL AUTO_INCREMENT,
  dt_hora DATETIME ,
  grauAlerta VARCHAR(45) ,
  medidaCap VARCHAR(45) ,
  fkComponente INT NOT NULL,
  fkRegistro INT NOT NULL,
  PRIMARY KEY (idalertas),
  CONSTRAINT fkComponenteAlerta
    FOREIGN KEY (fkComponente)
    REFERENCES registro (fkComponente),
  CONSTRAINT fkRegistroAlerta
    FOREIGN KEY (fkRegistro)
    REFERENCES registro (idRegistros));


CREATE TABLE IF NOT EXISTS maquina (
  idMaquina INT NOT NULL AUTO_INCREMENT,
  fkUsuario INT,
  fkComponente INT,
  PRIMARY KEY (idMaquina),
  CONSTRAINT fkComponente
    FOREIGN KEY (fkComponente)
    REFERENCES componente (idComponente),
  CONSTRAINT fkUsuario
    FOREIGN KEY (fkUsuario)
    REFERENCES animoons.usuario (idUsuario));


CREATE TABLE IF NOT EXISTS aplicativosabertos (
  idPaginas INT AUTO_INCREMENT,
  pid INT ,
  nomeAplicativo VARCHAR(200) ,
  comando VARCHAR(200) ,
  usoCpu DOUBLE ,
  usoDisco DOUBLE ,
  dtHora DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  fkMaquina INT ,
  PRIMARY KEY (idPaginas),
  CONSTRAINT fkMaquina
    FOREIGN KEY (fkMaquina)
    REFERENCES maquina (idMaquina));


CREATE TABLE IF NOT EXISTS aplicativosproibidos (
  idaplicativosProibidos INT NOT NULL,
  nomeAplicativoProibido VARCHAR(70) ,
  diretorioApp VARCHAR(50) ,
  fkUsuario INT ,
  PRIMARY KEY (idaplicativosProibidos),
  CONSTRAINT fkUsuarioAplicativos
    FOREIGN KEY (fkUsuario)
    REFERENCES usuario (idUsuario));

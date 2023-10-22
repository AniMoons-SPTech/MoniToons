-- DROP DATABASE animoons;
CREATE DATABASE IF NOT EXISTS animoons;
USE animoons;
CREATE TABLE IF NOT EXISTS empresa (
  idEmpresa INT AUTO_INCREMENT,
  nomeFantasia VARCHAR(50),
  cnpj VARCHAR(20),
  telefone VARCHAR(15),
  PRIMARY KEY (idEmpresa));

CREATE TABLE IF NOT EXISTS usuario(
  idUsuario INT AUTO_INCREMENT,
  nome VARCHAR(100),
  cargo VARCHAR(20),
  documento VARCHAR(20),
  telefone VARCHAR(15),
  telefone2 VARCHAR(15) NULL DEFAULT NULL,
  email VARCHAR(100),
  senha VARCHAR(20),
  plano VARCHAR(60),
  fkEmpresa INT,
  fkResponsável INT,
  PRIMARY KEY (idUsuario), 
  CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa)
    REFERENCES empresa (idEmpresa),
  CONSTRAINT fkResponsavel FOREIGN KEY (fkResponsável)
    REFERENCES usuario (idUsuario)
    );

CREATE TABLE IF NOT EXISTS componente (
  idComponente INT AUTO_INCREMENT,
  tipo VARCHAR(45),
  numNucleo INT,
  capacidade DOUBLE,
  velocidade DOUBLE,
  nomeComponente VARCHAR(100) NULL,
  PRIMARY KEY (idComponente));

CREATE TABLE IF NOT EXISTS registro (
	idRegistros INT AUTO_INCREMENT,
	fkComponente INT,
	uso DOUBLE,
	velocidadeGravada DOUBLE,
	velocidadeLeitura DOUBLE,
	velocidadeCpu DOUBLE,
	memoriaUso DOUBLE,
	memoriaDisponivel DOUBLE,
	dtHora DATETIME,
	temperatura DOUBLE,
  PRIMARY KEY (idRegistros),
  CONSTRAINT fkRegistroComponente FOREIGN KEY (fkComponente)
	REFERENCES componente (idComponente)
);

CREATE TABLE IF NOT EXISTS maquina (
  idMaquina INT AUTO_INCREMENT,
  fkUsuario INT NOT NULL,
  fkComponente INT NOT NULL,
  PRIMARY KEY (idMaquina),
  CONSTRAINT fkUsuario
    FOREIGN KEY (fkUsuario)
    REFERENCES usuario (idUsuario),
  CONSTRAINT fkComponente
    FOREIGN KEY (fkComponente)
    REFERENCES componente (idComponente)
    );

CREATE TABLE IF NOT EXISTS aplicativosAbertos (
  idAplicativos INT NOT NULL,
  nomeAplicativo VARCHAR(50) NULL,
  dtHora DATETIME,
  usoCpu DOUBLE,
  usoRam DOUBLE,
  usoDisco DOUBLE,
  usoGpu DOUBLE,
  fkMaquina INT,
  PRIMARY KEY (idAplicativos),
  CONSTRAINT fkMaquina
    FOREIGN KEY (fkMaquina)
    REFERENCES maquina (idMaquina));
    
CREATE TABLE IF NOT EXISTS aplicativosProibidos (
  idaplicativosProibidos INT NOT NULL,
  fkUsuario INT NULL,
  diretorioApp VARCHAR(50) NULL,
  PRIMARY KEY (idaplicativosProibidos),
  CONSTRAINT fkUsuarioAplicativos
    FOREIGN KEY (fkUsuario)
    REFERENCES usuario (idUsuario));

CREATE TABLE IF NOT EXISTS alertas (
  idalertas INT AUTO_INCREMENT,
  dt_hora DATETIME,
  grauAlerta  VARCHAR(45) NULL,
  medidaCap VARCHAR(45) NULL,
  fkRegistro INT NOT NULL,
  fkComponente INT NOT NULL,
  PRIMARY KEY (idalertas),
  CONSTRAINT fkRegistroAlerta FOREIGN KEY (fkRegistro)
    REFERENCES registro(idRegistros),
  CONSTRAINT fkComponenteAlerta FOREIGN KEY(fkComponente)
	REFERENCES registro(fkComponente));
    
    SHOW TABLES FROM animoons;
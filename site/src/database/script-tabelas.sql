-- DROP DATABASE IF exists monitoons;
CREATE DATABASE monitoons;
USE monitoons;

CREATE TABLE empresa(
idEmpresa INT auto_increment PRIMARY KEY,
nomeEmpresa VARCHAR(80),
cnpj VARCHAR(14),
telefone VARCHAR(15)
);

CREATE TABLE usuario (
idUsuario INT auto_increment PRIMARY KEY,
fkEmpresa INT,
nomeUsuario VARCHAR(100),
cargo VARCHAR(15),
cpfRne VARCHAR(20),
telefone VARCHAR(15),
telefone1 VARCHAR(15),
email VARCHAR(150),
senha VARCHAR(50),
plano VARCHAR(80),
fkGestor INT,
CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) references empresa(idEmpresa),
CONSTRAINT fkGestor FOREIGN KEY (fkGestor) references usuario(idUsuario),
CONSTRAINT cargo CHECK (cargo IN ("ADMINISTRADOR", "COMUM"))
);

CREATE TABLE computador(
idComputador INT auto_increment primary key,
fkUsuario INT,
nome VARCHAR (45),
CONSTRAINT fkUsuarioComputador foreign key (fkUsuario) references usuario(idUsuario)
);

CREATE TABLE componente(
idComponente INT auto_increment primary key,
tipo VARCHAR (15),
nome VARCHAR(100)
);

CREATE TABLE especificacoesComponente (
idEspecificacaoComp INT auto_increment primary key,
fkComponente INT,
tipoEspecificacao VARCHAR(50),
valor VARCHAR(50),
CONSTRAINT fkComponente foreign key (fkComponente) references componente(idComponente)
);


CREATE TABLE appsProibidos(
idAplicativosProibidos INT auto_increment primary key,
nomeAplicativoProibido VARCHAR(70),
diretorioApp VARCHAR(50),
fkUsuario INT,
CONSTRAINT fkUsuarioAplicativo foreign key (fkUsuario) references usuario(idUsuario)
);

CREATE TABLE appsAbertos (
idAppAberto INT auto_increment primary key,
fkComputadorApp INT,
pid INT,
nomeAplicativo VARCHAR(200),
comando VARCHAR(200),
usoCpu DOUBLE,
usoDisco DOUBLE,
dtHora DATETIME NOT NULL default current_timestamp,
CONSTRAINT fkComputadorApp foreign key (fkComputadorApp) references computador(idComputador)
);

CREATE TABLE computadorHasComponente (
idCompHasComp INT auto_increment primary key,
fkComputador INT,
fkComponente INT,
CONSTRAINT fkComputadorComponente foreign key (fkComputador) references computador (idComputador),
CONSTRAINT fkComponenteComputador foreign key (fkComponente) references componente (idComponente)
);

CREATE TABLE registro(
idRegistro INT auto_increment primary key,
fkCompHasComp INT,
tipo VARCHAR (15),
dadoValor DOUBLE,
dataHora DATETIME NOT NULL default current_timestamp,
CONSTRAINT fkCompHasComp foreign key (fkCompHasComp) references computadorHasComponente(idCompHasComp)
);

CREATE TABLE alerta(
idAlerta INT auto_increment primary key,
fkRegistro INT,
grauAlerta VARCHAR(40),
tipoComponente VARCHAR(15),
dataHora DATETIME NOT NULL default current_timestamp,
CONSTRAINT fkRegistro foreign key (fkRegistro) references registro(idRegistro)
);


--SQL SERVER

-- DROP DATABASE IF EXISTS monitoons;
CREATE DATABASE monitoons;
USE monitoons;

CREATE TABLE empresa (
    idEmpresa INT IDENTITY(1,1) PRIMARY KEY,
    nomeEmpresa VARCHAR(80),
    cnpj VARCHAR(14),
    telefone VARCHAR(15)
);

CREATE TABLE usuario (
    idUsuario INT IDENTITY(1,1) PRIMARY KEY,
    fkEmpresa INT,
    nomeUsuario VARCHAR(100),
    cargo VARCHAR(15),
    cpfRne VARCHAR(20),
    telefone VARCHAR(15),
    telefone1 VARCHAR(15),
    email VARCHAR(150),
    senha VARCHAR(50),
    plano VARCHAR(80),
    fkGestor INT,
    CONSTRAINT fkEmpresa FOREIGN KEY (fkEmpresa) REFERENCES empresa(idEmpresa),
    CONSTRAINT fkGestor FOREIGN KEY (fkGestor) REFERENCES usuario(idUsuario),
    CONSTRAINT cargo CHECK (cargo IN ('ADMINISTRADOR', 'COMUM'))
);

CREATE TABLE computador (
    idComputador INT IDENTITY(1,1) PRIMARY KEY,
    fkUsuario INT,
    nome VARCHAR(45),
    CONSTRAINT fkUsuarioComputador FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE componente (
    idComponente INT IDENTITY(1,1) PRIMARY KEY,
    tipo VARCHAR(15),
    nome VARCHAR(100)
);

CREATE TABLE especificacoesComponente (
    idEspecificacaoComp INT IDENTITY(1,1) PRIMARY KEY,
    fkComponente INT,
    tipoEspecificacao VARCHAR(50),
    valor VARCHAR(50),
    CONSTRAINT fkComponente FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);

CREATE TABLE appsProibidos (
    idAplicativosProibidos INT IDENTITY(1,1) PRIMARY KEY,
    nomeAplicativoProibido VARCHAR(70),
    diretorioApp VARCHAR(50),
    fkUsuario INT,
    CONSTRAINT fkUsuarioAplicativo FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario)
);

CREATE TABLE appsAbertos (
    idAppAberto INT IDENTITY(1,1) PRIMARY KEY,
    fkComputadorApp INT,
    pid INT,
    nomeAplicativo VARCHAR(200),
    comando VARCHAR(200),
    usoCpu FLOAT,
    usoDisco FLOAT,
    dtHora DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fkComputadorApp FOREIGN KEY (fkComputadorApp) REFERENCES computador(idComputador)
);

CREATE TABLE computadorHasComponente (
    idCompHasComp INT IDENTITY(1,1) PRIMARY KEY,
    fkComputador INT,
    fkComponente INT,
    CONSTRAINT fkComputadorComponente FOREIGN KEY (fkComputador) REFERENCES computador(idComputador),
    CONSTRAINT fkComponenteComputador FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);

CREATE TABLE registro (
    idRegistro INT IDENTITY(1,1) PRIMARY KEY,
    fkCompHasComp INT,
    tipo VARCHAR(15),
    dadoValor FLOAT,
    dataHora DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fkCompHasComp FOREIGN KEY (fkCompHasComp) REFERENCES computadorHasComponente(idCompHasComp)
);

CREATE TABLE alerta (
    idAlerta INT IDENTITY(1,1) PRIMARY KEY,
    fkRegistro INT,
    grauAlerta VARCHAR(40),
    tipoComponente VARCHAR(15),
    dataHora DATETIME NOT NULL DEFAULT GETDATE(),
    CONSTRAINT fkRegistro FOREIGN KEY (fkRegistro) REFERENCES registro(idRegistro)
);

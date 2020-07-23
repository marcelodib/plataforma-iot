-- ============================================================== --
-- ====================Criação da base de dados================== --
-- ============================================================== --
CREATE DATABASE IF NOT EXISTS platformIot;
USE platformIot;

-- ============================================================== --
-- =================Criação da tabela de usuarios================ --
-- ============================================================== --
CREATE TABLE user (
    idUser       INT AUTO_INCREMENT PRIMARY KEY,
    userEmail    VARCHAR(128) NOT NULL UNIQUE,
    userPhone    VARCHAR(128) NOT NULL UNIQUE,
    userName     VARCHAR(128) NOT NULL,
    userPassword VARCHAR(256) NOT NULL
);

-- ============================================================== --
-- =================Criação da tabela de exibição================ --
-- ============================================================== --
CREATE TABLE exhibition (
    idExhibition    INT AUTO_INCREMENT PRIMARY KEY,
    exhibitionName  VARCHAR(64) NOT NULL UNIQUE
);

-- ============================================================== --
-- =================Criação da tabela de projetos================ --
-- ============================================================== --
CREATE TABLE project (
    idProject   INT AUTO_INCREMENT PRIMARY KEY,
    idUser      INT          NOT NULL,
    projectName VARCHAR(128) NOT NULL UNIQUE,
    CONSTRAINT fk_project_id_user
        FOREIGN KEY (idUser) 
        REFERENCES user (idUser)
        ON DELETE CASCADE
);

-- ============================================================== --
-- =================Criação da tabela de variáveis=============== --
-- ============================================================== --
CREATE TABLE variable (
    idVariable   INT AUTO_INCREMENT PRIMARY KEY,
    idProject    INT NOT NULL,
    idExhibition INT NOT NULL,
    variableName VARCHAR(128) NOT NULL,
    CONSTRAINT fk_project_id_project
        FOREIGN KEY (idProject) 
        REFERENCES project (idProject)
        ON DELETE CASCADE,
    CONSTRAINT fk_project_id_exhibition
        FOREIGN KEY (idExhibition) 
        REFERENCES exhibition (idExhibition)
);

-- ============================================================== --
-- =================Criação da tabela de medidas================= --
-- ============================================================== --
CREATE TABLE measure (
    idMeasure  INT AUTO_INCREMENT PRIMARY KEY,
    idVariable INT      NOT NULL,
    value      FLOAT    NOT NULL,
    dateTime   DATETIME NOT NULL,
    CONSTRAINT fk_project_id_variable
        FOREIGN KEY (idVariable) 
        REFERENCES variable (idVariable)
        ON DELETE CASCADE
);

-- ============================================================== --
-- ============================Inserts=========================== --
-- ============================================================== --

INSERT INTO exhibition (exhibitionName) VALUES
("Gráfico"),
("Tabela"),
("Card");


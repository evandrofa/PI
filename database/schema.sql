CREATE DATABASE vetcare;
USE vetcare;

CREATE TABLE agendamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    telefone VARCHAR(20),
    data DATE,
    hora TIME,
    animal VARCHAR(100),
    observacoes TEXT
);

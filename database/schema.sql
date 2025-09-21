CREATE DATABASE IF NOT EXISTS vetcare;
USE vetcare;


CREATE TABLE animals (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  species VARCHAR(50) NOT NULL,
  age INT NOT NULL
) ENGINE=InnoDB;

-- Tabela de agendamentos
CREATE TABLE agendamentos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  telefone VARCHAR(20),
  data DATE NOT NULL,
  hora TIME NOT NULL,
  observacoes TEXT,
  animalId INT,
  FOREIGN KEY (animalId) REFERENCES animals(id) ON DELETE SET NULL
) ENGINE=InnoDB;

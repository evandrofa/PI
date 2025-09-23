# 🐾 VetCare - Painel Veterinário

Sistema simples de gerenciamento de agendamentos e cadastro de animais.

---

## 🛠 Tecnologias

- **Backend:** Node.js, Express.js  
- **Frontend:** HTML, CSS, JavaScript
- **Banco de dados:** MySQL (InnoDB)  

---

## 📂 Estrutura do Projeto
backend/
├─ routes/
│ ├─ agendamentos.js
│ └─ animals.js
├─ db.js
├─ server.js
└─ frontend/
├─ index.html
├─ admin.html
└─ main.css


---

## ⚙ Pré-requisitos

- Node.js >= 18  
- MySQL  
- Navegador moderno  

---

## 🚀 Instalação

1. Clone o repositório:

git clone https://github.com/evandrofa/PI.git

2. Acesse a pasta do backend:

3.Instale as dependências:
npm install

4. Crie o banco de dados MySQL e as tabelas:
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


5. Configure o arquivo db.js com seu usuário, senha e host do MySQL.



▶️ Executando o Projeto

1. Inicie o servidor:
node server.js

2. Abra o FrontEnd no navegador:
http://localhost:3000/
http://localhost:3000/index.html



✨ Funcionalidades

Cadastro de animais (nome, espécie e idade)

Criação, edição e exclusão de agendamentos

Histórico de agendamentos por animal em modal


# 🐾 VetCare - Painel Veterinário

Sistema simples para gerenciar agendamentos e cadastro de animais.

## Tecnologias
- Backend: Node.js + Express  
- Frontend: HTML, CSS, JavaScript  
- Banco de dados: MySQL  

## Como usar

1. Clone o projeto e entre na pasta backend:

   ```bash
   git clone https://github.com/evandrofa/PI.git
   cd backend
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Crie o banco de dados e tabelas no MySQL:

   ```sql
   CREATE DATABASE vetcare;
   USE vetcare;

   CREATE TABLE animals (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(100),
     species VARCHAR(50),
     age INT
   );

   CREATE TABLE agendamentos (
     id INT AUTO_INCREMENT PRIMARY KEY,
     nome VARCHAR(100),
     telefone VARCHAR(20),
     data DATE,
     hora TIME,
     observacoes TEXT,
     animalId INT,
     FOREIGN KEY (animalId) REFERENCES animals(id) ON DELETE SET NULL
   );
   ```

4. Configure o arquivo `db.js` com seu usuário, senha e host do MySQL.

5. Inicie o servidor:

   ```bash
   cd backend
   node server.js
   ```

6. Abra o navegador nos links:

   ```
   http://localhost:3000/
   ou
   http://localhost:3000/index.html
   ```

## Funcionalidades
- Cadastro de animais  
- Criar, editar e excluir agendamentos  
- Histórico de agendamentos por animal  

const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1374',
  database: 'vetcare'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco:', err);
  } else {
    console.log('Conectado ao MySQL!');
  }
});

module.exports = db;

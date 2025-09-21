const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1374',
  database: 'vetcare'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    process.exit(1);
  }
  console.log('Conectado ao MySQL!');
});

module.exports = db;

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = 3000;

const agendamentos = require('./routes/agendamentos');
const animals = require('./routes/animals');

app.use(cors());
app.use(express.json());

app.use('/api/agendamentos', agendamentos);
app.use('/api/animals', animals);


app.use(express.static(path.join(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'admin.html'));
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

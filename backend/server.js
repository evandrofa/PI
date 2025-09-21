const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const agendamentos = require('./routes/agendamentos');
const animals = require('./routes/animals'); // <--- aqui

app.use(cors());
app.use(express.json());

app.use('/api/agendamentos', agendamentos);
app.use('/api/animals', animals); // <--- aqui

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

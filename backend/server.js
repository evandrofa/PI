const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

const agendamentos = require('./routes/agendamentos');

app.use(cors());
app.use(express.json());
app.use('/api/agendamentos', agendamentos);

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

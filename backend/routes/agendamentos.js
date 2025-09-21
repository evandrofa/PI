const express = require('express');
const router = express.Router();
const db = require('../db'); // ajuste o caminho conforme sua estrutura

// Listar todos os agendamentos
router.get('/', (req, res) => {
  db.query('SELECT * FROM agendamentos ORDER BY data, hora', (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no banco' });
    res.json(results);
  });
});

// Obter agendamento pelo id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM agendamentos WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no banco' });
    if (results.length === 0) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(results[0]);
  });
});

// Criar novo agendamento
router.post('/', (req, res) => {
  const { nome, telefone, data, hora, animal, observacoes } = req.body;
  const query = 'INSERT INTO agendamentos (nome, telefone, data, hora, animal, observacoes) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(query, [nome, telefone, data, hora, animal, observacoes], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro no banco' });
    res.status(201).json({ id: result.insertId, message: 'Agendamento criado' });
  });
});

// Atualizar agendamento
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, data, hora, animal, observacoes } = req.body;
  const query = `
    UPDATE agendamentos SET nome=?, telefone=?, data=?, hora=?, animal=?, observacoes=?
    WHERE id=?
  `;
  db.query(query, [nome, telefone, data, hora, animal, observacoes, id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro no banco' });
    res.json({ message: 'Agendamento atualizado com sucesso!' });
  });
});

// Deletar agendamento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM agendamentos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro no banco' });
    res.json({ message: 'Agendamento cancelado!' });
  });
});

module.exports = router;

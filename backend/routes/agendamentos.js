const express = require('express');
const router = express.Router();
const db = require('../db');

// Listar todos os agendamentos com info do animal
router.get('/', (req, res) => {
  const query = `
    SELECT a.id, a.nome, a.telefone, a.data, a.hora, a.observacoes,
           an.name AS animal
    FROM agendamentos a
    LEFT JOIN animals an ON a.animalId = an.id
    ORDER BY a.data, a.hora
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// Buscar agendamento por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT a.id, a.nome, a.telefone, a.data, a.hora, a.observacoes,
           an.name AS animal
    FROM agendamentos a
    LEFT JOIN animals an ON a.animalId = an.id
    WHERE a.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(results[0]);
  });
});

// Criar novo agendamento
router.post('/', (req, res) => {
  const { nome, telefone, data, hora, animalId, observacoes } = req.body;
  if (!nome || !data || !hora || !animalId) return res.status(400).json({ error: 'Campos obrigatórios' });

  const query = `
    INSERT INTO agendamentos (nome, telefone, data, hora, animalId, observacoes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nome, telefone, data, hora, animalId, observacoes], (err, result) => {
    if (err) return res.status(500).json({ error: 'Erro ao criar agendamento' });
    res.status(201).json({ id: result.insertId, message: 'Agendamento criado' });
  });
});

module.exports = router;

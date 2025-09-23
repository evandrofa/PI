const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  const query = `
    SELECT a.id, a.nome, a.telefone, a.data, a.hora, a.observacoes,
           an.name AS animal, an.id AS animalId
    FROM agendamentos a
    LEFT JOIN animals an ON a.animalId = an.id
    ORDER BY a.data, a.hora
  `;
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


router.get('/animal/:animalId', (req, res) => {
  const { animalId } = req.params;
  const query = `
    SELECT a.id, a.nome, a.telefone, a.data, a.hora, a.observacoes
    FROM agendamentos a
    WHERE a.animalId = ?
    ORDER BY a.data DESC, a.hora DESC
  `;
  db.query(query, [animalId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT a.id, a.nome, a.telefone, a.data, a.hora, a.observacoes,
           an.name AS animal, an.id AS animalId
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


router.post('/', (req, res) => {
  const { nome, telefone, data, hora, animalId, observacoes } = req.body;
  if (!nome || !data || !hora || !animalId) {
    return res.status(400).json({ error: 'Campos obrigatórios' });
  }

  const query = `
    INSERT INTO agendamentos (nome, telefone, data, hora, animalId, observacoes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nome, telefone, data, hora, animalId, observacoes], (err, result) => {
    if (err) {
      console.error("Erro ao criar agendamento:", err);
      return res.status(500).json({ error: 'Erro ao criar agendamento' });
    }
    res.status(201).json({ id: result.insertId, message: 'Agendamento criado com sucesso!' });
  });
});


router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, data, hora, animalId, observacoes } = req.body;

  const query = `
    UPDATE agendamentos
    SET nome=?, telefone=?, data=?, hora=?, animalId=?, observacoes=?
    WHERE id=?
  `;
  db.query(query, [nome, telefone, data, hora, animalId, observacoes, id], (err, result) => {
    if (err) {
      console.error("Erro ao atualizar agendamento:", err);
      return res.status(500).json({ error: 'Erro ao atualizar agendamento' });
    }
    res.json({ message: 'Agendamento atualizado com sucesso!' });
  });
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM agendamentos WHERE id = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error("Erro ao excluir agendamento:", err);
      return res.status(500).json({ error: 'Erro ao excluir agendamento' });
    }
    res.json({ message: 'Agendamento excluído com sucesso!' });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const db = require('../db'); // ajuste o caminho conforme sua estrutura

// Listar todos os agendamentos (com informações do animal)
router.get('/', (req, res) => {
  const query = `
    SELECT a.id, a.nome, a.telefone, a.data, a.hora, a.observacoes,
           an.name AS animalName, an.species AS animalSpecies
    FROM agendamentos a
    LEFT JOIN animals an ON a.animalId = an.id
    ORDER BY a.data, a.hora
  `;
  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao listar agendamentos:', err);
      return res.status(500).json({ error: 'Erro no banco' });
    }
    res.json(results);
  });
});

// Obter agendamento pelo id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const query = `
    SELECT a.id, a.nome, a.telefone, a.data, a.hora, a.observacoes,
           an.name AS animalName, an.species AS animalSpecies
    FROM agendamentos a
    LEFT JOIN animals an ON a.animalId = an.id
    WHERE a.id = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Erro no banco' });
    if (results.length === 0) return res.status(404).json({ error: 'Agendamento não encontrado' });
    res.json(results[0]);
  });
});

// Criar novo agendamento
router.post('/', (req, res) => {
  const { nome, telefone, data, hora, animalId, observacoes } = req.body;

  if (!nome || !telefone || !data || !hora || !animalId) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const query = `
    INSERT INTO agendamentos (nome, telefone, data, hora, animalId, observacoes)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  db.query(query, [nome, telefone, data, hora, animalId, observacoes], (err, result) => {
    if (err) {
      console.error('Erro ao criar agendamento:', err);
      return res.status(500).json({ error: 'Erro no banco' });
    }
    res.status(201).json({ id: result.insertId, message: 'Agendamento criado' });
  });
});

// Atualizar agendamento
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, telefone, data, hora, animalId, observacoes } = req.body;

  if (!nome || !telefone || !data || !hora || !animalId) {
    return res.status(400).json({ error: 'Campos obrigatórios faltando' });
  }

  const query = `
    UPDATE agendamentos 
    SET nome=?, telefone=?, data=?, hora=?, animalId=?, observacoes=?
    WHERE id=?
  `;
  db.query(query, [nome, telefone, data, hora, animalId, observacoes, id], (err) => {
    if (err) {
      console.error('Erro ao atualizar agendamento:', err);
      return res.status(500).json({ error: 'Erro no banco' });
    }
    res.json({ message: 'Agendamento atualizado com sucesso!' });
  });
});

// Deletar agendamento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM agendamentos WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao deletar agendamento:', err);
      return res.status(500).json({ error: 'Erro no banco' });
    }
    res.json({ message: 'Agendamento cancelado!' });
  });
});

module.exports = router;

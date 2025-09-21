const express = require('express');
const router = express.Router();
const db = require('../db'); // ajuste se necessário

// Listar todos os animais
router.get('/', (req, res) => {
  db.query('SELECT * FROM animals ORDER BY name', (err, results) => {
    if (err) {
      console.error('Erro ao listar animais:', err);
      return res.status(500).json({ error: 'Erro no banco' });
    }
    res.json(results);
  });
});

module.exports = router;

// Obter animal pelo id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM animals WHERE id = ?', [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length === 0) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json(results[0]);
  });
});

// Criar novo animal
router.post('/', (req, res) => {
  const { name, species, age } = req.body;

  if (!name || !species || age === undefined) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const query = 'INSERT INTO animals (name, species, age) VALUES (?, ?, ?)';
  db.query(query, [name, species, age], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Animal cadastrado com sucesso!' });
  });
});

// Atualizar animal
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, species, age } = req.body;

  if (!name || !species || age === undefined) {
    return res.status(400).json({ error: 'Todos os campos obrigatórios devem ser preenchidos' });
  }

  const query = 'UPDATE animals SET name = ?, species = ?, age = ? WHERE id = ?';
  db.query(query, [name, species, age, id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json({ message: 'Animal atualizado com sucesso!' });
  });
});

// Deletar animal
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM animals WHERE id = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Animal não encontrado' });
    res.json({ message: 'Animal removido com sucesso!' });
  });
});

module.exports = router;

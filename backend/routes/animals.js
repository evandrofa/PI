const express = require('express');
const router = express.Router();
const db = require('../db');


router.get('/', (req, res) => {
  db.query('SELECT * FROM animals ORDER BY name', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, species, age } = req.body;
  const query = 'INSERT INTO animals (name, species, age) VALUES (?, ?, ?)';
  db.query(query, [name, species, Number(age)], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: result.insertId, message: 'Animal cadastrado com sucesso!' });
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM animals WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: 'Erro ao excluir animal' });
    res.json({ message: 'Animal excluído com sucesso!' });
  });
});

module.exports = router;

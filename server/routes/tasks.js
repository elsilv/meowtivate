const express = require('express');
const db = require('../database/database');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, status, value } = req.body;
  const sql = 'INSERT INTO tasks (name, status, value) VALUES (?, ?, ?)';
  db.run(sql, [name, status, value], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM tasks';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM tasks WHERE id = ?';
  db.run(sql, id, function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task successfully deleted" });
  });
});

module.exports = router;

const express = require('express');
const db = require('../database/database');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, description, value, image } = req.body;
  const sql = 'INSERT INTO rewards (name, description, value, image) VALUES (?, ?, ?, ?)';
  db.run(sql, [name, description, value, image], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM rewards';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;

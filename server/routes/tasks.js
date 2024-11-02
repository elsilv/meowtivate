const express = require('express');
const db = require('../database/database');
const router = express.Router();

router.post('/', (req, res) => {
  const { user_id, name, status, value } = req.body;
  const sql = 'INSERT INTO tasks (user_id, name, status, value) VALUES (?, ?, ?, ?)';
  db.run(sql, [user_id, name, status, value], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ id: this.lastID });
  });
});

router.get('/', (req, res) => {
  const { user_id } = req.query;
  const sql = 'SELECT * FROM tasks WHERE user_id = ?';
  db.all(sql, [user_id], (err, rows) => {
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

router.post('/:id/mark-done', (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;

  const getTaskSQL = 'SELECT value FROM tasks WHERE id = ? AND user_id = ? AND status != ?';
  const updateTaskSQL = 'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?';
  const updateUserBalanceSQL = 'UPDATE users SET balance = balance + ? WHERE id = ?';

  db.get(getTaskSQL, [id, user_id, 2], (err, task) => {
    if (err || !task) {
      return res.status(400).json({ success: false, message: 'Task not found or already completed.' });
    }

    db.run(updateTaskSQL, [2, id, user_id], (err) => {
      if (err) {
        return res.status(500).json({ success: false, message: 'Failed to update task.' });
      }

      db.run(updateUserBalanceSQL, [task.value, user_id], (err) => {
        if (err) {
          return res.status(500).json({ success: false, message: 'Failed to update balance.' });
        }
        res.json({ success: true, message: 'Task marked as done and balance updated.' });
      });
    });
  });
});

module.exports = router;

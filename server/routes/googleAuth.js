const express = require('express');
const db = require('../database/database');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const router = express.Router();

router.post('/', (req, res) => {
  const { token, userInfo } = req.body;
  const { email, name } = userInfo;

  db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
    if (err) {
      console.error('Error querying database:', err);
      return res.status(500).json({ success: false, message: 'Server error' });
    }

    if (row) {
      db.run('UPDATE users SET token = ?, updatedAt = CURRENT_TIMESTAMP WHERE email = ?', [token, email], (err) => {
        if (err) {
          console.error('Error updating user:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
        return res.json({ success: true, message: 'User logged in successfully', user: { id: row.id } });
      });
    } else {
      db.run('INSERT INTO users (email, name, token) VALUES (?, ?, ?)', [email, name, token], function(err) {
        if (err) {
          console.error('Error saving user:', err);
          return res.status(500).json({ success: false, message: 'Server error' });
        }
        return res.json({ success: true, message: 'User created and logged in successfully',  user: { id: this.lastID } });
      });
    }
  });
});

router.get('/', (req, res) => {
  const sql = 'SELECT * FROM users';
  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;

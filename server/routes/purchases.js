const express = require('express');
const db = require('../database/database');
const router = express.Router();

router.post('/buy', (req, res) => {
  const { userId, rewardId } = req.body;

  if (!userId || !rewardId) {
    return res.status(400).json({ error: 'User ID and Reward ID are required' });
  }

  db.get('SELECT balance FROM users WHERE id = ?', [userId], (err, user) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userBalance = user.balance;

    db.get('SELECT value FROM rewards WHERE id = ?', [rewardId], (err, reward) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (!reward) {
        return res.status(404).json({ error: 'Reward not found' });
      }

      const rewardValue = reward.value;

      if (userBalance < rewardValue) {
        return res.status(400).json({ error: 'Not enough balance to purchase this reward' });
      }

      const newBalance = userBalance - rewardValue;

      db.run('UPDATE users SET balance = ? WHERE id = ?', [newBalance, userId], (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        db.run('INSERT INTO purchases (user_id, reward_id) VALUES (?, ?)', [userId, rewardId], function (err) {
          if (err) {
            return res.status(500).json({ error: err.message });
          }

          res.status(200).json({
            message: 'Purchase successful',
            newBalance: newBalance,
            purchaseId: this.lastID,
          });
        });
      });
    });
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
      SELECT purchases.id AS purchase_id, purchases.purchased_at, purchases.is_used, rewards.id AS reward_id, rewards.name, rewards.description, rewards.value, rewards.image
      FROM purchases
      INNER JOIN rewards ON purchases.reward_id = rewards.id
      WHERE purchases.user_id = ?
    `;

  db.all(sql, id, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

router.patch('/:id/use', (req, res) => {
  const { id } = req.params;
  const sql = `UPDATE purchases SET is_used = 1 WHERE id = ?`;

  db.run(sql, [id], function (err) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    res.json({ success: true, message: 'Reward marked as used.' });
  });
});

module.exports = router;

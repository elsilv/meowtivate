const OpenAI = require('openai');
const express = require('express');
const db = require('../database/database');
const router = express.Router();

require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { user_id, task_id, taskName } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      store: true,
      messages: [
        {"role": "user", "content":  `Generate a motivational compliment for a user who just completed a task. Use cat-themed words and compliments.
          Compliment example: "Meow, that was purrfect! You're on fire!" Task name: "${taskName}"`},
      ],
      max_tokens: 50,
    });

    console.log('Message:', response.choices[0].message.content);
    const compliment = response.choices[0].message.content.trim();

    await db.run(`
      INSERT INTO compliments (user_id, task_id, compliment_text)
      VALUES (?, ?, ?)`, [user_id, task_id, compliment]
    );
    console.log('Compliment inserted in db:', user_id, task_id);

    res.status(200).json({ compliment });
  } catch (error) {
    console.error("Error creating chat completion:", error);
    res.status(500).json({ error: "Failed to generate completion." });
  }
});

router.get('/compliments', async (req, res) => {
  const { user_id } = req.params;

  try {
    const compliments = await db.all(`
     SELECT * FROM compliments WHERE user_id = 2`, []);

    res.json({ compliments });
  } catch (error) {
    console.error('Error fetching compliments:', error);
    res.status(500).json({ message: 'Error fetching compliments.' });
  }
});

router.get('/compliments/:id', (req, res) => {
  const { id } = req.params;
  const sql = `
      SELECT *
      FROM compliments
      WHERE user_id = ?
      ORDER BY created_at DESC
    `;

  db.all(sql, id, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(rows);
  });
});

module.exports = router;
const OpenAI = require('openai');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { taskName } = req.body;
  
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

    res.status(200).json({ compliment });
  } catch (error) {
    console.error("Error creating chat completion:", error);
    res.status(500).json({ error: "Failed to generate completion." });
  }
});

module.exports = router;
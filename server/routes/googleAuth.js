const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const router = express.Router();

async function verifyToken(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.REACT_APP_GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
}

router.post('/', async (req, res) => {
  const token = req.body.token;
  try {
    const userData = await verifyToken(token);
    res.json({ success: true, user: userData });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Unauthorized' });
  }
});

module.exports = router;

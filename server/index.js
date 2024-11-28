const express = require('express');
const cors = require('cors');
const db = require('./database/database');
const googleAuthRoutes = require('./routes/googleAuth');
const taskRoutes = require('./routes/tasks');
const rewardRoutes = require('./routes/rewards');
const purchaseRoutes = require('./routes/purchases');
const app = express();
const port = 3001;

require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use('/api/google-login', googleAuthRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/rewards', rewardRoutes);
app.use('/api/purchases', purchaseRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

module.exports = app;

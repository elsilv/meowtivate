const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./meowtivate.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Database connected.');
});


//TODO: Add more info field
//TODO: Add deadline
db.serialize(() => {
  //db.run(`DROP TABLE IF EXISTS users`);

  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      name TEXT,
      token TEXT,
      balance INTEGER DEFAULT 0,
      createdAt TEXT DEFAULT CURRENT_TIMESTAMP,
      updatedAt TEXT DEFAULT CURRENT_TIMESTAMP
    )`);

  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      status INTEGER,
      value INTEGER CHECK (value <= 99999),
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      name TEXT NOT NULL,
      description TEXT,
      value INTEGER,
      image TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  db.run(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      reward_id INTEGER,
      is_used INTEGER DEFAULT 0,
      purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (reward_id) REFERENCES rewards(id)
    )
  `);
});

/*
db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Tietokantayhteys suljettu.');
});  */

module.exports = db;

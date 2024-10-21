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
  db.run(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      status INTEGER,
      value INTEGER CHECK (value <= 100)
    )
  `);

  //TODO: Add photo
  db.run(`
    CREATE TABLE IF NOT EXISTS rewards (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      value INTEGER,
      image TEXT
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

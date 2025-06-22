const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT,
    password TEXT,
    role TEXT
  )`);

  db.run(`CREATE TABLE medications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    name TEXT,
    dosage TEXT,
    frequency TEXT,
     date TEXT,          
    time TEXT, 
    taken INTEGER DEFAULT 0,
    photo_path TEXT
  )`);

  db.run(`
    INSERT INTO medications (user_id, name, dosage, frequency, date, time, taken)
    VALUES 
      (1, 'Paracetamol', '500mg', 'Once daily', '2025-06-20', '08:00', 0),
      (1, 'Metformin', '850mg', 'Twice daily', '2025-06-19', '09:00', 1),
      (1, 'Atorvastatin', '10mg', 'Once at night', '2025-06-18', '21:00', 0),
      (1, 'Amlodipine', '5mg', 'Once in morning', '2025-06-21', '07:30', 1),
      (1, 'Omeprazole', '20mg', 'Before breakfast', '2025-06-22', '07:00', 0)
  `);
});

module.exports = db;

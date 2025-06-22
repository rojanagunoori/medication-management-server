const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const today = new Date();

function getFormattedDate(offsetDays) {
  const date = new Date(today);
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().split('T')[0]; // YYYY-MM-DD
}

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
    VALUES (?, ?, ?, ?, ?, ?, ?),
           (?, ?, ?, ?, ?, ?, ?),
           (?, ?, ?, ?, ?, ?, ?),
           (?, ?, ?, ?, ?, ?, ?),
           (?, ?, ?, ?, ?, ?, ?)
  `,
  [
    1, 'Paracetamol', '500mg', 'Once daily', getFormattedDate(-2), '08:00', 0,
    1, 'Metformin', '850mg', 'Twice daily', getFormattedDate(-1), '09:00', 1,
    1, 'Atorvastatin', '10mg', 'Once at night', getFormattedDate(0), '21:00', 0,
    1, 'Amlodipine', '5mg', 'Once in morning', getFormattedDate(1), '07:30', 1,
    1, 'Omeprazole', '20mg', 'Before breakfast', getFormattedDate(2), '07:00', 0
  ]);

  console.log("✅ Database initialized with medications");
});

module.exports = db;

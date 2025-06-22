const db = require('../db/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) return res.status(400).json({ message: 'All fields required' });
  const hash = await bcrypt.hash(password, 10);

  db.run(`INSERT INTO users (username, password, role) VALUES (?, ?, ?)`, [username, hash, role], function (err) {
    if (err) return res.status(500).send(err.message);
    res.json({ message: 'User created', id: this.lastID, username, role });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password required" });
  }

  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user) => {
    if (err || !user) return res.status(400).send('Invalid credentials');
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).send('Invalid credentials');

    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
    res.json({ token });
  });
};

const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

function authenticateToken(req, res, next) {
  //const token = req.headers['authorization'];
  //if (!token) return res.sendStatus(401);

  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ error: "Access denied. No token provided." }); // <- Fix this
  }

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token." }); // <- Consistent structure
  }

  //jwt.verify(token.split(" ")[1], process.env.JWT_SECRET, (err, user) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403).json({ error: "Invalid token." });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;

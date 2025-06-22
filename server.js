const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const http = require("http");
const { Server } = require("socket.io");

app.use(cors());
app.use(express.json());
app.use(cors({ origin: 'https://medication-management-one.netlify.app', credentials: true }));

const authRoutes = require('./routes/authRoutes');
const medicationRoutes = require('./routes/medicationRoutes');

app.use('/uploads', express.static('uploads'));


app.use('/api/auth', authRoutes);
app.use('/api/medications', medicationRoutes);


const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' }});


io.on("connection", (socket) => {
    console.log("A user connected", socket.id);
  
    socket.on("medicationTaken", (data) => {
      io.emit("medicationUpdate", data);
    });
  
    socket.on("disconnect", () => {
      console.log("User disconnected", socket.id);
    });
  });
  

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
module.exports = app; 
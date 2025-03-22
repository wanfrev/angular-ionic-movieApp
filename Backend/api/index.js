const express = require('express');
const serverless = require('serverless-http');
const dotenv = require('dotenv');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

dotenv.config();

const connectDB = require('../db/db');
const routes = require('../routes/index');
const movieRoutes = require('../routes/movieRoutes');
const libraryRoutes = require('../routes/libraryRoutes');
const errorHandler = require('../middlewares/errorHandler');

const app = express();

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8100'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);
app.use('/api/movies', movieRoutes);
app.use('/api/libraries', libraryRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});
app.use(errorHandler);

// Manejo seguro de conexión a DB
let isConnected = false;
async function connectOnce() {
  if (!isConnected) {
    try {
      await connectDB();
      isConnected = true;
    } catch (err) {
      console.error("Error al conectar a la base de datos:", err.message);
    }
  }
}
connectOnce();

module.exports = app;
module.exports.handler = serverless(app);
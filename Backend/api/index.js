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

// Conectar a la base de datos
connectDB();

const app = express();

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8100'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(cookieParser());
app.use(express.json());

// Rutas
app.use('/api', routes);
app.use('/api/movies', movieRoutes);
app.use('/api/libraries', libraryRoutes);

// Archivos estáticos (si usas imágenes, por ejemplo)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware de errores
app.use(errorHandler);

// Exportar como función serverless para Vercel
module.exports = app;
module.exports.handler = serverless(app);

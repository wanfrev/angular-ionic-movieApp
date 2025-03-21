require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser'); // 📌 Agregado para manejar cookies
const connectDB = require('./db/db');
const routes = require('./routes/index');
const movieRoutes = require('./routes/movieRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Conectar a la base de datos
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
const localIp = process.env.LOCAL_IP || 'localhost';

app.use(cors({
  origin: ['http://localhost:4200', 'http://localhost:8100'], // Permitir estos orígenes
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // 📌 Permitir cookies y autenticación
}));

app.use(cookieParser());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir archivos estáticos

// Usar las rutas
app.use('/api', routes);
app.use('/api/movies', movieRoutes);
app.use('/api/libraries', libraryRoutes);

// Manejar rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware para manejar errores
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://${localIp}:${PORT}`);
});
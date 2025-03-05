const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

// Registrar nuevo usuario
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'El correo electrónico ya está registrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Iniciar sesión
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Correo o contraseña incorrectos' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET || 'secreto', { expiresIn: '1h' });

    res.cookie('token', token, { httpOnly: true });
    res.json({ mensaje: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Ruta protegida para obtener el perfil del usuario
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cerrar sesión
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ mensaje: "Cierre de sesión exitoso" });
});

module.exports = router;
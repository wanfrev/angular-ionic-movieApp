const express = require('express');
const { getPopularMovies, searchMovies, getMovieDetails, createMovie } = require('../services/movieService');
const multer = require('multer');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/popular', async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas populares' });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const movies = await searchMovies(query);
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar películas' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await getMovieDetails(movieId);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los detalles de la película' });
  }
});

router.post('/create', upload.single('image'), async (req, res) => {
  try {
    const movieData = req.body;
    if (req.file) {
      movieData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const movie = await createMovie(movieData);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la película' });
  }
});

module.exports = router;
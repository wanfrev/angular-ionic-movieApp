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
    console.error('Error al obtener las películas populares:', error.message);
    res.status(500).json({ message: 'Error al obtener las películas populares', error: error.message });
  }
});

router.get('/top_rated', async (req, res) => {
  try {
    const movies = await movieService.getRecommendedMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/discover', async (req, res) => {
  try {
    const movies = await movieService.getExploreMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/search', async (req, res) => {
  try {
    const query = req.query.query;
    const movies = await searchMovies(query);
    res.json(movies);
  } catch (error) {
    console.error('Error al buscar películas:', error.message);
    res.status(500).json({ message: 'Error al buscar películas', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await getMovieDetails(movieId);
    res.json(movie);
  } catch (error) {
    console.error('Error al obtener los detalles de la película:', error.message);
    res.status(500).json({ message: 'Error al obtener los detalles de la película', error: error.message });
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
    console.error('Error al crear la película:', error.message);
    res.status(500).json({ message: 'Error al crear la película', error: error.message });
  }
});

module.exports = router;
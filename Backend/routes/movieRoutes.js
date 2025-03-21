const express = require('express');
const {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  createMovie,
  getRecommendedMovies,
  getExploreMovies,
  getGenres
} = require('../services/movieService');

const multer = require('multer');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.get('/popular', async (req, res) => {
  try {
    const movies = await getPopularMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas populares', error: error.message });
  }
});

router.get('/top_rated', async (req, res) => {
  try {
    const movies = await getRecommendedMovies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/discover', async (req, res) => {
  try {
    const movies = await getExploreMovies();
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
    res.status(500).json({ message: 'Error al buscar películas', error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await getMovieDetails(movieId);
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener detalles de la película', error: error.message });
  }
});

router.get('/genres', async (req, res) => {
  try {
    const genres = await getGenres();
    res.json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los géneros', error: error.message });
  }
});


// Ruta para obtener solo las películas del usuario autenticado
router.get('/user-movies', authMiddleware, async (req, res) => {
  try {
    const movies = await Movie.find({ user: req.user.id });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las películas del usuario', error: error.message });
  }
});

router.post('/create', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const movieData = req.body;
    movieData.user = req.user.id;
    if (req.file) {
      movieData.imageUrl = `/uploads/${req.file.filename}`;
    }
    const movie = await createMovie(movieData);
    res.status(201).json(movie);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la película', error: error.message });
  }
});

module.exports = router;
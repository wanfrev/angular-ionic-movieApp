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

    if (typeof movieData.categories === 'string') {
      movieData.categories = JSON.parse(movieData.categories);
    }

    if (typeof movieData.cast === 'string') {
      movieData.cast = JSON.parse(movieData.cast);
    }

    if (req.file) {
      movieData.imageUrl = req.file.path;
    }

    const newMovie = await createMovie(movieData, req.user.id);
    res.status(201).json(newMovie);
  } catch (error) {
    console.error('❌ Error al crear película:', error.message);
    res.status(500).json({ message: 'Error al crear película', error: error.message });
  }
});

router.get('/search-all', authMiddleware, async (req, res) => {
  try {
    const query = req.query.query || '';
    const userId = req.user.id;

    const userMovies = await Movie.find({
      user: userId,
      title: { $regex: query, $options: 'i' }
    });

    const tmdbMovies = await searchMovies(query);

    res.json({
      userMovies,
      tmdbMovies
    });
  } catch (error) {
    console.error('Error al buscar películas:', error);
    res.status(500).json({ message: 'Error al buscar películas', error: error.message });
  }
});


router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;

    const movie = await Movie.findOne({ _id: movieId, user: userId });

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada o no autorizada' });
    }

    await Movie.deleteOne({ _id: movieId });

    res.json({ message: 'Película eliminada correctamente' });
  } catch (error) {
    console.error('Error al eliminar película:', error);
    res.status(500).json({ message: 'Error al eliminar la película' });
  }
});

router.put('/:id', authMiddleware, upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.id;
    const movieId = req.params.id;

    const movie = await Movie.findOne({ _id: movieId, user: userId });

    if (!movie) {
      return res.status(404).json({ message: 'Película no encontrada o no autorizada' });
    }

    const {
      title,
      originalTitle,
      categories,
      releaseDate,
      synopsis,
      cast,
      director,
      duration,
      type,
    } = req.body;

    movie.title = title || movie.title;
    movie.originalTitle = originalTitle || movie.originalTitle;
    movie.categories = categories?.split(',').map(c => c.trim()) || movie.categories;
    movie.releaseDate = releaseDate || movie.releaseDate;
    movie.synopsis = synopsis || movie.synopsis;
    movie.cast = cast?.split(',').map(a => a.trim()) || movie.cast;
    movie.director = director || movie.director;
    movie.duration = duration || movie.duration;
    movie.type = type || movie.type;

    if (req.file) {
      movie.imageUrl = `/uploads/${req.file.filename}`;
    }

    await movie.save();

    res.json({ message: 'Película actualizada con éxito', movie });
  } catch (error) {
    console.error('Error al actualizar película:', error);
    res.status(500).json({ message: 'Error al actualizar la película' });
  }
});

module.exports = router;
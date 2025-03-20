const axios = require('axios');
const Movie = require('../models/Movies');
const { apiUrl, apiKey } = require('../config');

const getPopularMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movie/popular`, {
      params: {
        api_key: apiKey
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error al obtener películas populares');
  }
};

const getRecommendedMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movie/top_rated`, {
      params: {
        api_key: apiKey
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error al obtener películas recomendadas');
  }
};

const getExploreMovies = async () => {
  try {
    const response = await axios.get(`${apiUrl}/movie/upcoming`, {
      params: {
        api_key: apiKey
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error al obtener películas para explorar');
  }
};

const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${apiUrl}/search/movie`, {
      params: {
        api_key: apiKey,
        query: query
      }
    });
    return response.data.results;
  } catch (error) {
    throw new Error('Error al buscar películas');
  }
};

const getMovieDetails = async (movieId) => {
  try {
    const response = await axios.get(`${apiUrl}/movie/${movieId}`, {
      params: {
        api_key: apiKey
      }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error al obtener detalles de la película');
  }
};

const createMovie = async (movieData) => {
  const movie = new Movie(movieData);
  await movie.save();
  return movie;
};

module.exports = {
  getPopularMovies,
  getRecommendedMovies,
  getExploreMovies,
  searchMovies,
  getMovieDetails,
  createMovie,
};
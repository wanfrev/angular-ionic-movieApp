const axios = require('axios');
const Movie = require('../models/MovieSeries');
const { apiUrl, apiKey } = require('../config');

const getPopularMovies = async () => {
  const response = await axios.get(`${apiUrl}/movie/popular`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data.results;
};

const searchMovies = async (query) => {
  const response = await axios.get(`${apiUrl}/search/movie`, {
    params: {
      api_key: apiKey,
      query: query
    }
  });
  return response.data.results;
};

const getMovieDetails = async (movieId) => {
  const response = await axios.get(`${apiUrl}/movie/${movieId}`, {
    params: {
      api_key: apiKey
    }
  });
  return response.data;
};

const createMovie = async (movieData) => {
  const movie = new Movie(movieData);
  await movie.save();
  return movie;
};

module.exports = {
  getPopularMovies,
  searchMovies,
  getMovieDetails,
  createMovie,
};
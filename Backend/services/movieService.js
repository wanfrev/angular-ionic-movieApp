const axios = require('axios');

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = '64d148b6a9644b7ea9ae5b72c887014a'; // Reemplaza con tu clave de API

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

module.exports = {
  getPopularMovies,
  searchMovies,
  getMovieDetails
};
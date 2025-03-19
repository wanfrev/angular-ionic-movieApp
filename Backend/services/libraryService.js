const Library = require('../models/Library');
const Movie = require('../models/MovieSeries');

const createLibrary = async (libraryData) => {
  const library = new Library(libraryData);
  await library.save();
  return library;
};

const addMovieToLibrary = async (libraryId, movieId) => {
  const library = await Library.findById(libraryId);
  const movie = await Movie.findById(movieId);

  if (!library || !movie) {
    throw new Error('Library or Movie not found');
  }

  library.movies.push(movie);
  await library.save();
  return library;
};

const getLibraries = async () => {
  return await Library.find().populate('movies');
};

const getLibraryById = async (libraryId) => {
  return await Library.findById(libraryId).populate('movies');
};

module.exports = {
  createLibrary,
  addMovieToLibrary,
  getLibraries,
  getLibraryById,
};
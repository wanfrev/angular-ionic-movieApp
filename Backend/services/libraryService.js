const Library = require('../models/Library');
const Movie = require('../models/Movies');

const createLibrary = async (libraryData, userId) => {
    const library = new Library({ ...libraryData, user: userId });
    await library.save();
    return library;
};

const addMovieToLibrary = async (libraryId, movieId, userId) => {
    const library = await Library.findOne({ _id: libraryId, user: userId });
    if (!library) throw new Error('No tienes permiso para modificar esta lista');

    const movie = await Movie.findById(movieId);
    if (!movie) throw new Error('Película no encontrada');

    library.movies.push(movie);
    await library.save();
    return library;
};

const getLibraries = async (userId) => {
    return await Library.find({ user: userId }).populate('movies');
};

const getLibraryById = async (libraryId, userId) => {
    return await Library.findOne({ _id: libraryId, user: userId }).populate('movies');
};

module.exports = {
    createLibrary,
    addMovieToLibrary,
    getLibraries,
    getLibraryById,
};
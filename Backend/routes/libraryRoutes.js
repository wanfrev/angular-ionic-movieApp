const express = require('express');
const { createLibrary, addMovieToLibrary, getLibraries, getLibraryById } = require('../services/libraryService');
const router = express.Router();

router.post('/create', async (req, res) => {
  try {
    const libraryData = req.body;
    const library = await createLibrary(libraryData);
    res.status(201).json(library);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear la biblioteca' });
  }
});

router.post('/:libraryId/add-movie/:movieId', async (req, res) => {
  try {
    const { libraryId, movieId } = req.params;
    const library = await addMovieToLibrary(libraryId, movieId);
    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ message: 'Error al agregar la película a la biblioteca' });
  }
});

router.get('/', async (req, res) => {
  try {
    const libraries = await getLibraries();
    res.status(200).json(libraries);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las bibliotecas' });
  }
});

router.get('/:libraryId', async (req, res) => {
  try {
    const { libraryId } = req.params;
    const library = await getLibraryById(libraryId);
    res.status(200).json(library);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la biblioteca' });
  }
});

module.exports = router;
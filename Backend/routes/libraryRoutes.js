const express = require('express');
const { createLibrary, addMovieToLibrary, getLibraries, getLibraryById } = require('../services/libraryService');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const libraryData = req.body;
        const library = await createLibrary(libraryData, req.user.id);
        res.status(201).json(library);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la biblioteca' });
    }
});

router.post('/:libraryId/add-movie/:movieId', authMiddleware, async (req, res) => {
    try {
        const { libraryId, movieId } = req.params;
        const library = await addMovieToLibrary(libraryId, movieId, req.user.id);
        res.status(200).json(library);
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar la película a la biblioteca' });
    }
});

router.get('/', authMiddleware, async (req, res) => {
    try {
        const libraries = await getLibraries(req.user.id);
        res.status(200).json(libraries);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las bibliotecas' });
    }
});

router.get('/:libraryId', authMiddleware, async (req, res) => {
    try {
        const { libraryId } = req.params;
        const library = await getLibraryById(libraryId, req.user.id);
        if (!library) {
            return res.status(404).json({ message: 'Biblioteca no encontrada' });
        }
        res.status(200).json(library);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la biblioteca' });
    }
});

module.exports = router;
const express = require('express');
const mainController = require('../controllers/main');
const loginValidation = require('../middlewares/loginValidation');
const adMiddleware = require('../middlewares/adMiddleware');
const logMiddleware = require('../middlewares/logMiddleware');

const router = express.Router();

// HOME
router.get('/', mainController.home);

// DETALLE LIBRO
router.get('/books/detail/:id', mainController.bookDetail);

// BUSCAR LIBRO
router.get('/books/search', mainController.bookSearch);
router.post('/books/search', mainController.bookSearchResult);

// AUTOR Y BUSCAR LIBROS POR AUTOR
router.get('/authors', mainController.authors);
router.get('/authors/:id/books', mainController.authorBooks);

// REGISTRAR USUARIOS
router.get('/users/register', mainController.register);
router.post('/users/register', mainController.processRegister);

// INICIAR SESION USUARIOS
router.get('/users/login', mainController.login);
router.post('/users/login', loginValidation, mainController.processLogin);

// CERRAR SESION USUARIOS
router.get('/users/logout', logMiddleware, mainController.logOut);

// ELIMINAR LIBRO
router.get('/books/delete/:id', adMiddleware, mainController.deleteBook);

// EDITAR LIBRO
router.get('/books/edit/:id', adMiddleware, mainController.edit);
router.post('/books/edit/:id', mainController.processEdit);

module.exports = router;

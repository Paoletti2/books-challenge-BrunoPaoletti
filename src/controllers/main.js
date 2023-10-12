const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op } = require("sequelize");

const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },
  bookDetail: (req, res) => {
    // Obtener el ID del libro desde los PARÁMETROS de la ruta
    const bookId = req.params.id;

    // Buscar el libro en la BASE DE DATOS por su ID
    db.Book.findByPk(bookId, {
      include: [{ association: 'authors' }]
    })
      .then((book) => {
        if (!book) {
          // Si NO se encuentra el libro
          return res.status(404).render('error', { message: 'Libro no encontrado' });
        }

        // Renderiza la vista 'bookDetail' y pasa los datos del libro
        res.render('bookDetail', { book });
      })
      .catch((error) => {
        console.log(error);
        // Errores
        res.status(500).render('error', { message: 'Error interno del servidor' });
      });
  },
  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },
  bookSearchResult: async (req, res) => {
    await db.Book.findAll(
      { where: { title: { [Op.like]: "%" + req.body.title + "%" } } })
      .then(function (booksList) {
          return res.render('search', { books: booksList });
      })
  },
  
  deleteBook: (req, res) => {
    // Implement delete book
    res.render('home');
  },
  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },
  authorBooks: (req, res) => {
    // Implement books by author
    res.render('authorBooks');
  },
  register: (req, res) => {
    res.render('register');
  },
  processRegister: (req, res) => {
    db.User.create({
      Name: req.body.name,
      Email: req.body.email,
      Country: req.body.country,
      Pass: bcryptjs.hashSync(req.body.password, 10),
      CategoryId: req.body.category
    })
      .then(() => {
        res.redirect('/');
      })
      .catch((error) => console.log(error));
  },
  login: (req, res) => {
    // Implement login process
    res.render('login');
  },
  processLogin: (req, res) => {
    // Implement login process
    res.render('home');
  },
  edit: (req, res) => {
    // Implement edit book
    res.render('editBook', {id: req.params.id})
  },
  processEdit: (req, res) => {
    // Implement edit book
    res.render('home');
  }
};

module.exports = mainController;

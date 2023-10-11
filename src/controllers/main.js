const bcryptjs = require('bcryptjs');
const db = require('../database/models');

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
  bookSearchResult: (req, res) => {
    // Obtener el título de libro ingresado por el usuario desde el cuerpo de la solicitud
    const { title } = req.body;
  
    // Realizar la búsqueda en la BASE DE DATOS
    db.Book.findAll({
      where: {
        title: {
          [db.Sequelize.Op.iLike]: `%${title}%` // Búsqueda case-insensitive por título similar
        }
      }
    })
      .then((books) => {
        res.render('searchResults', { books });
      })
      .catch((error) => {
        console.log(error);
        // Errores
        res.status(500).render('error', { message: 'Error interno del servidor' });
      });
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

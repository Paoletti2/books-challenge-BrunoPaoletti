const bcryptjs = require('bcryptjs');
const db = require('../database/models');
const { Op, Model } = require("sequelize");
const { use } = require('../routes/main');
const { validationResult } = require('express-validator');


const mainController = {
  home: (req, res) => {
    db.Book.findAll({
      where: { state: false },
      include: [{ association: 'authors' }]
    })
      .then((books) => {
        res.render('home', { books });
      })
      .catch((error) => console.log(error));
  },


  bookDetail: (req, res) => {
    const bookId = req.params.id;
    
    db.Book.findByPk(bookId,
      { where: { state: false }, include: [{ association: 'authors' }] })

      .then((book) => {
        if (!book) {
          return res.send('404')
        }
        res.render('bookDetail', { book });
      })
      .catch((error) => {
        console.log(error);
      });
  },


  bookSearch: (req, res) => {
    res.render('search', { books: [] });
  },


  bookSearchResult: async (req, res) => {
    await db.Book.findAll(
      { where: { state: false, title: { [Op.like]: "%" + req.body.title + "%" } } })
      .then(function (booksList) {
          return res.render('search', { books: booksList });
      })
  },
  

  deleteBook: async (req, res) => {
    await db.Book.destroy(
      {
      where: {
          id: req.params.id,
      }
  });
      return res.redirect('/')
  },


  authors: (req, res) => {
    db.Author.findAll()
      .then((authors) => {
        res.render('authors', { authors });
      })
      .catch((error) => console.log(error));
  },


  authorBooks: async (req, res) => {
    const authorId = req.params.id;
    console.log(authorId)

    db.Author.findByPk(authorId, {
      include: [{ association: 'books' }]
    })
    .then((author) => {
      if (!author) {
        return res.send('404')
      }
      res.render('authorBooks', { author });
    })
    .catch((error) => {
      console.error(error);
    });
  },


  register: (req, res) => {
    res.render('register');
  },


  processRegister: (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('register', { errors: errors.mapped() })
    }
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
    res.render('login');
  },


  processLogin: async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.render('login', { errors: errors.mapped() })
    }
    try {
      const user = await db.User.findOne(
        { where: { email:req.body.email } })
        if (!user) {
          res.render('login')
        }   
        if (bcryptjs.compareSync(req.body.password, user.Pass, { maxAge: 1000 * 60 * 60 * 72 })) {

          delete user.Pass 
          req.session.userLog = user
          res.cookie('rememberMe', user.Id)

          return res.redirect('/') }
 
        else { 
          res.render('login')
         }
    } catch (error) {
      console.log(error)
    }
  },


  logOut: async (req, res) =>  {
    req.session.destroy();
    res.clearCookie('rememberMe')
    return res.redirect('/')
  },


  edit: async (req, res) => {
    const bookId = req.params.id;

    db.Book.findByPk(bookId, 
      { where: { state: false } })
      
      .then((book) => {
        if (!book) {
          return res.send('404')
        }
        res.render('editBook', { book: book });
      })
      .catch((error) => {
        console.log(error);
      });
  },


  processEdit: async (req, res) => {
    const obj = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      cover: req.body.cover,
    };
    await db.Book.update(obj, {
      where: {
          id: req.params.id,
      }
    });
    return res.redirect('/')
  },
  
}

module.exports = mainController;

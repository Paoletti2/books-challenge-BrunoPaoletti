const logMiddleware = (req, res, next) => {
    if (!req.session.userLog) {
      return res.redirect('/login')
    } else {
      next();
    }
  }
  
module.exports = logMiddleware;
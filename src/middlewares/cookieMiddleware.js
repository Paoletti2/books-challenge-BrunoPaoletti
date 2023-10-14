const db = require('../database/models');

const cookie = async (req,res,next) => {
  if(!req.session.userLog && req.cookies.rememberMe) {
    const user = await db.User.findByPk(req.cookies.rememberMe)
    delete user.Pass
    req.session.userLog = user
    res.locals.isLoged = true;
    res.locals.userLog = req.session.userLog;
  }
  next()
}

module.exports = cookie
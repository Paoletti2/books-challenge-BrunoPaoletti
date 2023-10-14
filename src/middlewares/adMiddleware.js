const adMiddleware = (req, res, next) => {
    if (!req.session.userLog || req.session.userLog.CategoryId != 1) {
        return res.send('403 NOT FOUND')
    } else {
        next();
    }
}

module.exports = adMiddleware;
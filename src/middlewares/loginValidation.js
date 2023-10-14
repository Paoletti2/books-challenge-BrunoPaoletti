const { body } = require('express-validator');
const db = require("../database/models");
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");
const sequelize = require("sequelize");

module.exports = [

    body('password').exists().notEmpty().withMessage('The field cannot be empty'),
    body('email').exists().notEmpty().withMessage('The field cannot be empty').isEmail().withMessage('It must be a valid email address').custom(async (value, { req }) => {
        const user = await db.User.findAll({ where: { Email: value }, raw: true })
        .then(usuarios => usuarios[0]);
        if (!user) {
            throw new Error('Incorrect email and/or password')
        }
        if (await bcrypt.compare(req.body.password, user.Pass)) {
            delete user.Pass;
            req.session.userLog = user;
            if (req.body.cookie) {
                res.cookie("rememberMe", user.email, { maxAge: 1000 * 60 * 60 })
            }
        } else {
            throw new Error('Incorrect email and/or password')
        }
    })

]
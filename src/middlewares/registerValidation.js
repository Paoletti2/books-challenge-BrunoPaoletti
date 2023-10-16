const { body } = require('express-validator');
const db = require("../database/models");
const path = require('path');

module.exports = [ 
  body('name').exists().notEmpty().withMessage('The name cannot be empty').isLength({min:2}).withMessage('Name length is too short'),
  body('email').exists().notEmpty().withMessage('The email cannot be empty').isEmail().withMessage('Please provide a valid email').custom(async (value, { req }) => {
    const existingUser = await db.User.findAll({where: { email: value }}).then(usuarios => usuarios[0]);
    if (existingUser) {
      throw new Error('An existing user is registered with this email address');
    }
    req.body={"user":existingUser,...req.body}
  }),
  body('password').exists().isStrongPassword({ minLength: 8, minUppercase: 1, minLowercase: 1, minSymbols: 1, minNumbers: 1 }).withMessage('Invalid password')
]
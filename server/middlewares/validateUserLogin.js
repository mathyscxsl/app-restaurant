const { check, validationResult } = require('express-validator');

const validateUserLogin = [
  check('email')
    .notEmpty().withMessage('L\'email est obligatoire.')
    .isEmail().withMessage('L\'email doit être valide.'),

  check('password')
    .notEmpty().withMessage('Le mot de passe est obligatoire.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateUserLogin };

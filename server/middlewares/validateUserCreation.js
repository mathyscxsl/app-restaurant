const { check, validationResult } = require('express-validator');

const validateUserCreation = [
    check('name')
        .notEmpty().withMessage('Le nom est obligatoire.'),

    check('email')
        .notEmpty().withMessage('L\'email est obligatoire.')
        .isEmail().withMessage('L\'email doit être valide.'),

    check('password')
        .notEmpty().withMessage('Le mot de passe est obligatoire.')
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),

    check('role')
        .optional()
        .isIn(['admin', 'restaurant', 'user'])
        .default('user'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateUserCreation };
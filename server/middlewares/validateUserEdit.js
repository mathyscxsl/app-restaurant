const { check, validationResult } = require('express-validator');

const validateUserEdit = [
    check('name')
        .optional()
        .notEmpty().withMessage('Le nom ne peut pas être vide.'),

    check('email')
        .optional()
        .isEmail().withMessage('L\'email doit être valide.'),

    check('password')
        .optional()
        .isLength({ min: 6 }).withMessage('Le mot de passe doit contenir au moins 6 caractères.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateUserEdit };
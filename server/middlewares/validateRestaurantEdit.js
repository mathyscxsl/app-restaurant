const { check, validationResult } = require('express-validator');

const validateRestaurantEdit = [
    check('name')
        .optional()
        .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères.'),

    check('address')
        .optional()
        .isLength({ max: 255 }).withMessage('L\'adresse ne doit pas dépasser 255 caractères.'),

    check('postalCode')
        .optional()
        .isPostalCode('FR').withMessage('Le code postal doit être valide pour la France.'),

    check('city')
        .optional()
        .isLength({ max: 100 }).withMessage('La ville ne doit pas dépasser 100 caractères.'),

    check('email')
        .optional()
        .isEmail().withMessage('L\'email doit être valide.'),

    check('password')
        .optional()
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateRestaurantEdit };
const { check, validationResult } = require('express-validator');

const validateRestaurantCreation = [
    check('name')
        .notEmpty().withMessage('Le nom du restaurant est obligatoire.')
        .isLength({ max: 100 }).withMessage('Le nom ne doit pas dépasser 100 caractères.'),

    check('address')
        .notEmpty().withMessage('L\'adresse est obligatoire.')
        .isLength({ max: 255 }).withMessage('L\'adresse ne doit pas dépasser 255 caractères.'),

    check('postalCode')
        .notEmpty().withMessage('Le code postal est obligatoire.')
        .isPostalCode('FR').withMessage('Le code postal doit être valide pour la France.'),

    check('city')
        .notEmpty().withMessage('La ville est obligatoire.')
        .isLength({ max: 100 }).withMessage('La ville ne doit pas dépasser 100 caractères.'),

    check('email')
        .notEmpty().withMessage('L\'email est obligatoire.')
        .isEmail().withMessage('L\'email doit être valide.'),

    check('password')
        .notEmpty().withMessage('Le mot de passe est obligatoire.')
        .isLength({ min: 8 }).withMessage('Le mot de passe doit contenir au moins 8 caractères.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateRestaurantCreation };
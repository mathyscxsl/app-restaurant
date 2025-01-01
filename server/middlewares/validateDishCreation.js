const { check, validationResult } = require('express-validator');

const validateDishCreation = [
    check('name')
        .notEmpty().withMessage('Le nom du plat est obligatoire.')
        .isLength({ max: 100 }).withMessage('Le nom du plat ne doit pas dépasser 100 caractères.'),

    check('price')
        .notEmpty().withMessage('Le prix du plat est obligatoire.')
        .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.'),

    check('description')
        .optional()
        .isLength({ max: 255 }).withMessage('La description ne doit pas dépasser 255 caractères.'),

    check('restaurantId')
        .notEmpty().withMessage('L\'identifiant du restaurant est obligatoire.')
        .isInt().withMessage('L\'identifiant du restaurant doit être un entier.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateDishCreation };
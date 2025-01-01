const { check, validationResult } = require('express-validator');

const validateDishEdit = [
    check('name')
        .optional()
        .isLength({ max: 100 }).withMessage('Le nom du plat ne doit pas dépasser 100 caractères.'),

    check('price')
        .optional()
        .isFloat({ min: 0 }).withMessage('Le prix doit être un nombre positif.'),

    check('description')
        .optional()
        .isLength({ max: 255 }).withMessage('La description ne doit pas dépasser 255 caractères.'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
];

module.exports = { validateDishEdit };

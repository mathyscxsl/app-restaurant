const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const restrictIfAuthenticated = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
        try {
            jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
            return res.status(403).json({ message: "Vous êtes déjà connecté." });
        } catch (err) {
            return next();
        }
    }
    next();
};

module.exports = restrictIfAuthenticated;

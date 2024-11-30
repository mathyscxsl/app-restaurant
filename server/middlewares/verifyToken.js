const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Accès non autorisé, token manquant' });
    }

    try {
        const user = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Token invalide ou expiré.' });
    }
};

module.exports = verifyToken;
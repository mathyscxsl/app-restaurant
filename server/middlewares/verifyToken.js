const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé' });
    }

    try {
        const user = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET);
        req.user = user;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Votre session a expiré. veuillez vous reconnecter.' });
    }
};

module.exports = verifyToken;
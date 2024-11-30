const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

const generateAccessToken = (user) => {
    return jwt.sign(
        { id: user.id, role: user.role },
        JWT_ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
    );
};

const verifyAccessToken = (token) => {
    return jwt.verify(token, JWT_ACCESS_TOKEN_SECRET);
};

module.exports = { generateAccessToken, verifyAccessToken };
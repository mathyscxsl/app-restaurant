const bcrypt = require('bcryptjs');
const dotenv = require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role,
        });

        res.status(201).json({
            message: 'Utilisateur créé avec succès !',
            user: {
                id: newUser.id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role,
            },
        });
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: 'Mot de passe ou email incorrect' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Mot de passe ou email incorrect' });
        }

        const accessToken = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            accessToken,
        });
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
        res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = { createUser, loginUser };
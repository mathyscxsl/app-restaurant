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

const editUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, password } = req.body;
    const userId = req.user.userId;
    const userRole = req.user.role;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        if (userRole !== 'admin' && userId !== user.id) {
            return res.status(403).json({ message: "Accès non autorisé." });
        }

        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();
        return res.status(200).json({
            message: "Utilisateur mis à jour avec succès.",
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error("Erreur lors de la modification de l'utilisateur :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};


const deleteUser = async (req, res) => {
    const { id } = req.params;
    const userRole = req.user.role;

    try {
        if (userRole !== 'admin') {
            return res.status(403).json({ message: "Accès non autorisé." });
        }

        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ message: "Utilisateur introuvable." });
        }

        await user.destroy();
        return res.status(200).json({ message: "Utilisateur supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression de l'utilisateur :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

module.exports = { 
    createUser, 
    loginUser,
    editUser,
    deleteUser 
};
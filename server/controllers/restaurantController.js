const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
    const { name, address, postalCode, city, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "L'adresse email est déjà utilisée." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'restaurant',
        });

        const restaurant = await Restaurant.create({
            name,
            address,
            postalCode,
            city,
            userId: user.id,
        });

        return res.status(201).json({
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                address: restaurant.address,
                postalCode: restaurant.postalCode,
                city: restaurant.city,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                },
            },
        });
    } catch (error) {
        console.error("Erreur lors de la création du restaurant :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.findAll({
            include: {
                model: User,
                attributes: ['id', 'name', 'email'],
            },
            attributes: ['id', 'address', 'postalCode', 'city'],
        });

        return res.status(200).json({ restaurants });
    } catch (error) {
        console.error("Erreur lors de la récupération des restaurants :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const editRestaurant = async (req, res) => {
    const { id } = req.params;
    const { name, address, postalCode, city } = req.body;
    const userId = req.user.userId;
    const userRole = req.user.role;

    try {
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant introuvable." });
        }

        restaurant.name = name || restaurant.name;
        restaurant.address = address || restaurant.address;
        restaurant.postalCode = postalCode || restaurant.postalCode;
        restaurant.city = city || restaurant.city;

        if (name) {
            const user = await User.findByPk(restaurant.userId);
            if (user) {
                user.name = name;
                await user.save();
            }
            restaurant.name = name;
        }

        await restaurant.save();

        return res.status(200).json({
            message: "Restaurant mis à jour avec succès.",
            restaurant: {
                id: restaurant.id,
                name: restaurant.name,
                address: restaurant.address,
                postalCode: restaurant.postalCode,
                city: restaurant.city,
                user: {
                    id: restaurant.userId,
                    name: name || req.user.name,
                },
            },
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du restaurant :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const deleteRestaurant = async (req, res) => {
    const { id } = req.params;

    try {
        const restaurant = await Restaurant.findByPk(id);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant introuvable." });
        }

        const user = await User.findByPk(restaurant.userId);
        
        if (user) {
            await user.destroy();
        }

        await restaurant.destroy();

        return res.status(200).json({ message: "Restaurant et utilisateur associé supprimés avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du restaurant :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};


module.exports = {
    createRestaurant,
    getAllRestaurants,
    editRestaurant,
    deleteRestaurant,
};

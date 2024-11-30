const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Restaurant = require('../models/Restaurant');

const createRestaurant = async (req, res) => {
    const { name, address, postalCode, city, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "L'\ adresse email est déjà utilisé." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'restaurant',
        });

        const restaurant = await Restaurant.create({
            address,
            postalCode,
            city,
            userId: user.id,
        });

        return res.status(201).json({
            restaurant: {
                id: restaurant.id,
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

module.exports = {
    createRestaurant,
};

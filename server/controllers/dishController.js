const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');

const createDish = async (req, res) => {
    const { name, price, description, restaurantId } = req.body;

    try {
        const restaurant = await Restaurant.findByPk(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: "Restaurant introuvable." });
        }

        const dish = await Dish.create({
            name,
            price,
            description,
            restaurantId,
        });

        return res.status(201).json({
            message: "Plat créé avec succès.",
            dish,
        });
    } catch (error) {
        console.error("Erreur lors de la création du plat :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const getAllDishes = async (req, res) => {
    try {
        const dishes = await Dish.findAll({
            include: {
                model: Restaurant,
                as: 'restaurant',
                attributes: ['id', 'name'],
            },
        });

        return res.status(200).json(dishes);
    } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const getDishById = async (req, res) => {
    const { id } = req.params;

    try {
        const dish = await Dish.findByPk(id, {
            include: {
                model: Restaurant,
                as: 'restaurant',
                attributes: ['id', 'name'], // Inclure les infos du restaurant
            },
        });

        if (!dish) {
            return res.status(404).json({ message: "Plat introuvable." });
        }

        return res.status(200).json(dish);
    } catch (error) {
        console.error("Erreur lors de la récupération du plat :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const updateDish = async (req, res) => {
    const { id } = req.params;
    const { name, price, description } = req.body;

    try {
        const dish = await Dish.findByPk(id);

        if (!dish) {
            return res.status(404).json({ message: "Plat introuvable." });
        }

        dish.name = name || dish.name;
        dish.price = price || dish.price;
        dish.description = description || dish.description;

        await dish.save();

        return res.status(200).json({
            message: "Plat mis à jour avec succès.",
            dish,
        });
    } catch (error) {
        console.error("Erreur lors de la mise à jour du plat :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const deleteDish = async (req, res) => {
    const { id } = req.params;

    try {
        const dish = await Dish.findByPk(id);

        if (!dish) {
            return res.status(404).json({ message: "Plat introuvable." });
        }

        await dish.destroy();

        return res.status(200).json({ message: "Plat supprimé avec succès." });
    } catch (error) {
        console.error("Erreur lors de la suppression du plat :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

module.exports = {
    createDish,
    getAllDishes,
    getDishById,
    updateDish,
    deleteDish,
};
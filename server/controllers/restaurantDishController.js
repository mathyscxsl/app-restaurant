const Dish = require('../models/Dish');
const Restaurant = require('../models/Restaurant');

const getAllDishesForRestaurant = async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const restaurant = await Restaurant.findByPk(restaurantId, {
            include: Dish,
        });

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant introuvable.' });
        }

        return res.status(200).json(restaurant.Dishes);
    } catch (error) {
        console.error('Erreur lors de la récupération des plats :', error);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }
};

const getDishForRestaurant = async (req, res) => {
    const { restaurantId, dishId } = req.params;

    try {
        const dish = await Dish.findOne({
            where: { id: dishId, restaurantId },
        });

        if (!dish) {
            return res.status(404).json({ message: 'Plat introuvable.' });
        }

        return res.status(200).json(dish);
    } catch (error) {
        console.error('Erreur lors de la récupération du plat :', error);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }
};

const addDishToRestaurant = async (req, res) => {
    const { restaurantId } = req.params;
    const { name, price, description } = req.body;

    try {
        const restaurant = await Restaurant.findByPk(restaurantId);

        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant introuvable.' });
        }

        const dish = await Dish.create({
            name,
            price,
            description,
            restaurantId,
        });

        return res.status(201).json(dish);
    } catch (error) {
        console.error('Erreur lors de l\'ajout du plat :', error);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }
};

const updateDishForRestaurant = async (req, res) => {
    const { restaurantId, dishId } = req.params;
    const { name, price, description } = req.body;

    try {
        const dish = await Dish.findOne({
            where: { id: dishId, restaurantId },
        });

        if (!dish) {
            return res.status(404).json({ message: 'Plat introuvable.' });
        }

        dish.name = name || dish.name;
        dish.price = price || dish.price;
        dish.description = description || dish.description;

        await dish.save();

        return res.status(200).json(dish);
    } catch (error) {
        console.error('Erreur lors de la mise à jour du plat :', error);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }
};

const deleteDishForRestaurant = async (req, res) => {
    const { restaurantId, dishId } = req.params;

    try {
        const dish = await Dish.findOne({
            where: { id: dishId, restaurantId },
        });

        if (!dish) {
            return res.status(404).json({ message: 'Plat introuvable.' });
        }

        await dish.destroy();

        return res.status(200).json({ message: 'Plat supprimé avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du plat :', error);
        return res.status(500).json({ message: 'Erreur serveur.' });
    }
};

module.exports = {
    getAllDishesForRestaurant,
    getDishForRestaurant,
    addDishToRestaurant,
    updateDishForRestaurant,
    deleteDishForRestaurant,
};
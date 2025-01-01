const { Order, OrderDish, Dish } = require('../models/Order');
const User = require('../models/User');

const addToCart = async (req, res) => {
    const { dishId, quantity } = req.body;
    const userId = req.user.id;

    try {
        let order = await Order.findOne({ where: { userId, status: 'pending' } });

        if (!order) {
            order = await Order.create({ userId, status: 'pending' });
        }

        const dish = await Dish.findByPk(dishId);
        if (!dish) {
            return res.status(404).json({ message: "Le plat n'existe pas." });
        }

        const [orderDish, created] = await OrderDish.findOrCreate({
            where: { orderId: order.id, dishId },
            defaults: { quantity },
        });

        if (!created) {
            orderDish.quantity += quantity;
            await orderDish.save();
        }

        order.totalPrice += dish.price * quantity;
        await order.save();

        return res.status(200).json({
            message: "Plat ajouté au panier avec succès.",
            cart: order,
        });
    } catch (error) {
        console.error("Erreur lors de l'ajout au panier :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const getCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const order = await Order.findOne({
            where: { userId, status: 'pending' },
            include: [
                {
                    model: Dish,
                    through: { attributes: ['quantity'] },
                },
            ],
        });

        if (!order) {
            return res.status(404).json({ message: "Panier introuvable." });
        }

        return res.status(200).json(order);
    } catch (error) {
        console.error("Erreur lors de la récupération du panier :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

const validateCart = async (req, res) => {
    const userId = req.user.id;

    try {
        const order = await Order.findOne({
            where: { userId, status: 'pending' },
        });

        if (!order) {
            return res.status(404).json({ message: "Panier introuvable." });
        }

        order.status = 'validated';
        await order.save();

        return res.status(200).json({ message: "Commande validée avec succès." });
    } catch (error) {
        console.error("Erreur lors de la validation du panier :", error);
        return res.status(500).json({ message: "Erreur serveur." });
    }
};

module.exports = { addToCart, getCart, validateCart };
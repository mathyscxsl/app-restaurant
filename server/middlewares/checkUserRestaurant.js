const { Restaurant } = require('../models/Restaurant');

const checkUserRestaurant = () => async (req, res, next) => {
    try {
        const restaurantId = req.params.id;
        const userId = req.user.userId;
        const userRole = req.user.role;

        let resource;

        if (userRole === 'admin') {
            resource = await Restaurant.findByPk(restaurantId);
        } else {
            resource = await Restaurant.findOne({
                where: {
                    id: restaurantId,
                    userId: userId,
                },
            });
        }

        if (!resource) {
            return res.status(404).json({ message: "Ressource non trouvée." });
        }

        if (userRole !== 'admin' && resource.userId !== userId) {
            return res.status(403).json({ message: "Accès refusé." });
        }

        return next();
    } catch (error) {
        console.error('Erreur dans checkUserRestaurant:', error);
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
};

module.exports = checkUserRestaurant;
const { Restaurant } = require('../models/Restaurant');

const checkUserRestaurant = (userIdField) => async (req, res, next) => {
    try {
        const resource = await Restaurant.findByPk(req.params.id);
        if (!resource) {
            return res.status(404).json({ message: "Ressource non trouvée." });
        }

        if (req.user.role === 'admin' || resource[userIdField] === req.user.id) {
            return next();
        }

        return res.status(403).json({ message: "Accès refusé." });
    } catch (error) {
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
};

module.exports = checkUserRestaurant;
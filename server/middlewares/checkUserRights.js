const checkUserRights = (req, res, next) => {
    try {
        const userIdFromParams = parseInt(req.params.id, 10);
        const userIdFromToken = req.user.userId;
        const userRole = req.user.role;

        if (userRole === 'admin' || userIdFromParams === userIdFromToken) {
            return next();
        }

        return res.status(403).json({ message: "Accès refusé." });
    } catch (error) {
        console.error('Erreur dans checkUserRights:', error);
        return res.status(500).json({ message: "Erreur serveur.", error });
    }
};

module.exports = checkUserRights;

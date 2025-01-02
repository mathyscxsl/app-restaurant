const checkUserRights = (req, res, next) => {
    const userIdFromParams = parseInt(req.params.id, 10);
    const userIdFromToken = req.user.id;
    const userRole = req.user.role;

    if (userRole === 'admin' || userIdFromParams === userIdFromToken) {
        return next();
    }

    return res.status(403).json({ message: "Accès refusé." });
};

module.exports = checkUserRights;

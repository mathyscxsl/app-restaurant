const checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Accès refusé." });
    }
    next();
};

module.exports = checkRole;
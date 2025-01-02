const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const userController = require('../controllers/userController');
const restrictIfAuthenticated = require('../middlewares/restrictIfAuthenticated');
const checkUserRights = require('../middlewares/checkUserRights');
const { validateUserCreation } = require('../middlewares/validateUserCreation');
const { validateUserLogin } = require('../middlewares/validateUserLogin');


router.post('/register', restrictIfAuthenticated, validateUserCreation, userController.createUser);
router.post('/login', restrictIfAuthenticated, validateUserLogin, userController.loginUser);
router.put('/:id', verifyToken, checkUserRights, userController.editUser);
router.delete('/:id', verifyToken, checkUserRights, userController.deleteUser);

module.exports = router;
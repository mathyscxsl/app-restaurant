const express = require('express');
const userController = require('../controllers/userController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole')
const { validateUserCreation } = require('../middlewares/validateUserCreation');
const { validateUserLogin } = require('../middlewares/validateUserLogin');

const router = express.Router();

router.post('/register', validateUserCreation, userController.createUser);
router.put('/:id', verifyToken, checkRole(['admin', 'user']), userController.editUser);
router.delete('/:id', verifyToken, checkRole(['admin']), userController.deleteUser);
router.post('/login', validateUserLogin, userController.loginUser);

module.exports = router;
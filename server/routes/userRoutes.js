const express = require('express');
const { createUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/userController');
const { validateUserCreation } = require('../middlewares/validateUserCreation');
const { validateUserLogin } = require('../middlewares/validateUserLogin');

const router = express.Router();

router.post('/register', validateUserCreation, createUser);
router.post('/login', validateUserLogin, loginUser);

module.exports = router;
const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateRestaurantCreation } = require('../middlewares/validateRestaurantCreation');
const restaurantController = require('../controllers/restaurantController');

router.post('/create', verifyToken, checkRole(['admin']), validateRestaurantCreation, restaurantController.createRestaurant);

module.exports = router;

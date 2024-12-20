const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateRestaurantCreation } = require('../middlewares/validateRestaurantCreation');
const restaurantController = require('../controllers/restaurantController');

router.get('/', verifyToken, checkRole(['admin']), restaurantController.getAllRestaurants);
router.post('/create', verifyToken, checkRole(['admin']), validateRestaurantCreation, restaurantController.createRestaurant);
router.put('/:id', verifyToken, checkRole(['admin', 'restaurant']), restaurantController.editRestaurant);
router.delete('/:id', verifyToken, checkRole(['admin']), restaurantController.deleteRestaurant);

module.exports = router;

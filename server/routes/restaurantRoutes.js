const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateRestaurantCreation } = require('../middlewares/validateRestaurantCreation');
const { validateRestaurantEdition } = require('../middlewares/validateRestaurantEdition');
const restaurantController = require('../controllers/restaurantController');
const restaurantDishController = require('../controllers/restaurantDishController');

router.get('/', verifyToken, checkRole(['admin']), restaurantController.getAllRestaurants);
router.post('/create', verifyToken, checkRole(['admin']), validateRestaurantCreation, restaurantController.createRestaurant);
router.put('/:id', verifyToken, checkRole(['admin', 'restaurant']), validateRestaurantEdition, restaurantController.editRestaurant);
router.delete('/:id', verifyToken, checkRole(['admin']), restaurantController.deleteRestaurant);

router.get('/:restaurantId/dishes', verifyToken, restaurantDishController.getAllDishesForRestaurant);
router.get('/:restaurantId/dishes/:dishId', verifyToken, restaurantDishController.getDishForRestaurant);
router.post('/:restaurantId/dishes', verifyToken, restaurantDishController.addDishToRestaurant);
router.put('/:restaurantId/dishes/:dishId', verifyToken, restaurantDishController.updateDishForRestaurant);
router.delete('/:restaurantId/dishes/:dishId', verifyToken, restaurantDishController.deleteDishForRestaurant);

module.exports = router;

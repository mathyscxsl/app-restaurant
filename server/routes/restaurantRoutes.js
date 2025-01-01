const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const { validateRestaurantCreation } = require('../middlewares/validateRestaurantCreation');
const { validateRestaurantEdit } = require('../middlewares/validateRestaurantEdit');
const { validateDishCreation } = require('../middlewares/validateDishCreation');
const { validateDishEdit } = require('../middlewares/validateDishEdit');
const restaurantController = require('../controllers/restaurantController');
const restaurantDishController = require('../controllers/restaurantDishController');

router.get('/', verifyToken, checkRole(['admin']), restaurantController.getAllRestaurants);
router.post('/create', verifyToken, checkRole(['admin']), validateRestaurantCreation, restaurantController.createRestaurant);
router.put('/:id', verifyToken, checkRole(['admin', 'restaurant']), validateRestaurantEdit, restaurantController.editRestaurant);
router.delete('/:id', verifyToken, checkRole(['admin']), restaurantController.deleteRestaurant);

router.get('/:restaurantId/dishes', verifyToken, restaurantDishController.getAllDishesForRestaurant);
router.get('/:restaurantId/dishes/:dishId', verifyToken, restaurantDishController.getDishForRestaurant);
router.post('/:restaurantId/dishes', verifyToken, validateDishCreation, checkRole(['admin', 'user']), restaurantDishController.addDishToRestaurant);
router.put('/:restaurantId/dishes/:dishId', verifyToken, validateDishEdit, checkRole(['admin', 'user']), restaurantDishController.updateDishForRestaurant);
router.delete('/:restaurantId/dishes/:dishId', verifyToken, checkRole(['admin', 'user']), restaurantDishController.deleteDishForRestaurant);

module.exports = router;
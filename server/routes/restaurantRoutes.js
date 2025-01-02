const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const restrictIfAuthenticated = require('../middlewares/restrictIfAuthenticated');
const checkRole = require('../middlewares/checkRole');
const checkUserRestaurant = require('../middlewares/checkUserRestaurant');
const { validateRestaurantCreation } = require('../middlewares/validateRestaurantCreation');
const { validateRestaurantEdit } = require('../middlewares/validateRestaurantEdit');
const { validateDishCreation } = require('../middlewares/validateDishCreation');
const { validateDishEdit } = require('../middlewares/validateDishEdit');
const restaurantController = require('../controllers/restaurantController');
const restaurantDishController = require('../controllers/restaurantDishController');

router.get('/', restaurantController.getAllRestaurants);
router.post('/create', verifyToken, checkRole(['admin']), validateRestaurantCreation, restaurantController.createRestaurant);
router.put('/:id', verifyToken, checkUserRestaurant('userId'), validateRestaurantEdit, restaurantController.editRestaurant);
router.delete('/:id', verifyToken, checkUserRestaurant('userId'), restaurantController.deleteRestaurant);
router.get('/:restaurantId/dishes', restaurantDishController.getAllDishesForRestaurant);
router.get('/:restaurantId/dishes/:dishId', restaurantDishController.getDishForRestaurant);
router.post('/:restaurantId/dishes', verifyToken, checkRole(['admin', 'user']), validateDishCreation, restaurantDishController.addDishToRestaurant);
router.put('/:restaurantId/dishes/:dishId', verifyToken, checkUserRestaurant('userId'), validateDishEdit, restaurantDishController.updateDishForRestaurant);
router.delete('/:restaurantId/dishes/:dishId', verifyToken, checkUserRestaurant('userId'), restaurantDishController.deleteDishForRestaurant);

module.exports = router;
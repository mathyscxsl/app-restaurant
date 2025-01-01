const express = require('express');
const router = express.Router();
const dishController = require('../controllers/dishController');
const { validateDishCreation } = require('../middlewares/validateDishCreation');
const { validateDishEdit } = require('../middlewares/validateDishEdit');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');

router.post('/', verifyToken, checkRole(['restaurant', 'admin']), validateDishCreation, dishController.createDish);
router.get('/', verifyToken, dishController.getAllDishes);
router.get('/:id', verifyToken, dishController.getDishById);
router.put('/:id', verifyToken, checkRole(['restaurant', 'admin']), validateDishEdit, dishController.updateDish);
router.delete('/:id', verifyToken, checkRole(['restaurant', 'admin']), dishController.deleteDish);

module.exports = router;

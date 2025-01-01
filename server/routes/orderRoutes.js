const express = require('express');
const router = express.Router();
const { addToCart, getCart, validateCart } = require('../controllers/orderController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/cart', verifyToken, addToCart);
router.get('/cart', verifyToken, getCart);
router.post('/cart/validate', verifyToken, validateCart);

module.exports = router;
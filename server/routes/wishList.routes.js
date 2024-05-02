const express = require('express');
const router = express.Router();
const wishListController = require('../controllers/wishList.controller');

// Rutas para la lista de deseos
router.post('/wishlist/add', wishListController.addToWishList);
router.get('/wishlist/:userId', wishListController.getWishList);
router.delete('/wishlist/remove/:userId/:productId', wishListController.removeFromWishList);

module.exports = router;

const WishList = require('../models/wishList.model');
// Agregar un producto a la lista de deseos del usuario
exports.addToWishList = async (req, res) => {
  console.log("Body received:", req.body);
  const { userId, productId } = req.body;

  try {
    let wishList = await WishList.findOne({ userId });
    console.log("Found wishlist:", wishList);

    if (!wishList) {
      wishList = new WishList({ userId, products: [productId] });
      await wishList.save();
      console.log("New wishlist created:", wishList);
    } else {
      if (!wishList.products.includes(productId)) {
        wishList.products.push(productId);
        await wishList.save();
        console.log("Product added to wishlist:", wishList);
      }
    }

    res.status(201).json(wishList);
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ message: err.message });
  }
};

// Obtener la lista de deseos del usuario
exports.getWishList = async (req, res) => {
  const userId = req.params.userId;

  try {
    const wishList = await WishList.findOne({ userId }).populate('products');
    console.log("Wishlist:", wishList);
    res.json(wishList);
  } catch (err) {
    console.error("Error getting wishlist:", err);
    res.status(500).json({ message: err.message });
  }
};

// Eliminar un producto de la lista de deseos del usuario
exports.removeFromWishList = async (req, res) => {
  const { userId, productId } = req.params;
  console.log("UserID:", userId);
  console.log("ProductID:", productId);

  try {
    const wishList = await WishList.findOne({ userId });
    console.log("Wishlist:", wishList);

    if (!wishList) {
      return res.status(404).json({ message: 'Wish list not found' });
    }

    wishList.products = wishList.products.filter(
      (product) => product && product.toString() !== productId
    );

    await wishList.save();
    console.log("Product removed from wishlist:", wishList);
    res.json(wishList);
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ message: err.message });
  }
};
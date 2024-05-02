const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  image_url: { type: String, required: true },
  price: { type: String, required: true },
});

const Product = mongoose.model('Products', productSchema);

module.exports = Product;

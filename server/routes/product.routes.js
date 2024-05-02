const ProductController = require("../controllers/product.controller");

module.exports = app => {
  // Obtener todos los productos
  app.get("/api/products", ProductController.findAllProducts);

  // Obtener un producto por su ID
  app.get("/api/products/:id", ProductController.findProductById);
  
  // Buscar productos por término de búsqueda
  app.get("/api/search", ProductController.searchProducts);
};

const Product = require("../models/product.model");

exports.findProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ product });
  } catch (error) {
    console.error("Error al buscar el producto por ID:", error);
    res.status(500).json({ message: "Error al buscar el producto por ID" });
  }
};

exports.findAllProducts = (req, res) => {
  Product.find()
    .then(allProducts => res.json({ products: allProducts })) // Enviar todos los productos como respuesta
    .catch(err => res.status(500).json({ message: "Algo salió mal", error: err })); // Manejar errores
};

exports.searchProducts = async (req, res) => {
  try {
    const searchTerm = req.query.searchTerm; // Obtiene el término de búsqueda del parámetro de consulta de la solicitud

    // Verifica si se proporcionó un término de búsqueda
    if (!searchTerm || searchTerm.trim() === '') {
      return res.status(400).json({ message: "Search term is required" });
    }

    // Realiza la búsqueda de productos en tiempo real para buscar en el campo de nombre 
    const products = await Product.find({  
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
      ]
    });

    // Envía los productos encontrados como respuesta al cliente
    res.status(200).json({ products });
  } catch (error) {
    // Maneja los errores de la base de datos u otros errores
    console.error('Error searching products:', error);
    res.status(500).json({ message: "Error searching products", error });
  }
};

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProductsP = () => {
  const [products, setProducts] = useState([]);
  const { getUserId } = useContext(UserContext); // Obtiene la función getUserId del contexto de usuario

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/products");
        setProducts(response.data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const addToWishList = async (productId) => {
    const userId = getUserId(); // Obtiene el ID del usuario del contexto

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/wishlist/add", {
        userId: userId,
        productId: productId,
      });
      console.log("");
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }
  };

  return (
    <section className="text-gray-600 body-font bg-white">
      <div className="container px-5 py-24 mx-auto flex">
        <div className="w-full p-4 flex flex-wrap -m-4">
          {products.map((product) => (
            <div key={product._id} className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <Link
                to={`/product/${product._id}`}
                className="group block overflow-hidden"
              >
                <div className="h-[350px] w-full overflow-hidden rounded-lg group relative">
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="h-full w-full object-cover transition-transform duration-300 transform-gpu scale-100 group-hover:scale-105"
                  />
                </div>
                <div className="relative bg-white pt-3">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:underline group-hover:underline-offset-4">
                    {product.title}
                  </h3>
                </div>
              </Link>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex justify-between w-full">
                  <span className="tracking-wider text-gray-900">
                    {product.price} Gs
                  </span>
                  <button
                    onClick={() => addToWishList(product._id)}
                    className="ml-auto text-gray-500 hover:text-gray-700"
                  >
                    Add to Wishlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsP;

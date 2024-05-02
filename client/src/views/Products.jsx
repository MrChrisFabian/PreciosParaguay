import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductsP = () => {
  const [products, setProducts] = useState([]);

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
                  <div className="ml-auto">
                    {/* Componente de añadir al carrito */}
                  </div>
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

import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import NavBarra from "../components/Navbar";
import MyFooter from "../components/Footer";

const WishlistView = () => {
  const [wishlist, setWishlist] = useState([]);
  const { getUserId } = useContext(UserContext); // Obtiene la función getUserId del contexto de usuario

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = getUserId(); // Obtiene el ID del usuario del contexto
      console.log(userId);
      if (!userId) return;

      try {
        const response = await axios.get(
          `http://localhost:8000/api/wishlist/${userId}`
        );
        setWishlist(response.data.products);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      }
    };
    fetchWishlist();
  }, [getUserId]);

  const removeFromWishlist = async (productId) => {
    const userId = getUserId(); // Obtiene el ID del usuario del contexto
    if (!userId) return;

    try {
      await axios.delete(
        `http://localhost:8000/api/wishlist/remove/${userId}/${productId}`
      );
      setWishlist((prevWishlist) =>
        prevWishlist.filter((item) => item._id !== productId)
      );
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <>
      <NavBarra />
      <section className="text-gray-600 body-font bg-white">
        <div className="container px-5 py-24 mx-auto flex">
          <div className="w-full p-4">
            <h2 className="text-3xl font-bold mb-4">Wishlist</h2>
            {wishlist.length === 0 ? (
              <p>No items in wishlist</p>
            ) : (
              <ul className="space-y-4">
                {wishlist.map((product) => (
                  <li
                    key={product._id}
                    className="flex items-center justify-between border-b border-gray-200 py-2"
                  >
                    <div>
                      <h3 className="text-lg font-bold">{product.title}</h3>
                      <span className="text-gray-500">{product.price} Gs</span>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default WishlistView;
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const ProductsP = ({ title, price, url, image_url, id }) => {

  const { getUserId } = useContext(UserContext); // Obtiene la función getUserId del contexto de usuario
  const [Wishlist, setWishlist] = useState(false); // Estado para verificar si el producto está en la lista de deseos del usuario

  const addToWishList = async () => {
    const userId = getUserId(); // Obtiene el ID del usuario del contexto

    if (!userId) {
      console.error("User ID not found");
      return;
    }

    try {
      await axios.post("http://localhost:8000/api/wishlist/add", {
        userId: userId,
        productId: id,
      });
      setWishlist(true)
    } catch (error) {
      console.error("Error adding to wishlist:", error);
    }

  };
  const removeFromWishlist = () => {
    const userId = getUserId(); // Obtiene el ID del usuario del contexto
    axios.delete(
      `http://localhost:8000/api/wishlist/remove/${userId}/${id}`
    )
      .then((res) => {
        setWishlist(false)
        console.log('se elimino de la wishlist papá')
      })
      .catch((error) => {
        console.log(`Error deleting from wishlist ${error}`)
      })
  }
  const isOnWhislist = () => {
    const userId = getUserId(); // Obtiene el ID del usuario del contexto
    if (!userId) {
      console.error("User ID not found");
      return;
    }
    axios.get(`http://localhost:8000/api/wishlist/${userId}`)
      .then((res) => {
        setWishlist(res.data.products.some(products => products._id === id))
      })
      .catch((err) => console.log(JSON.stringify(err)))
  }

  useEffect(() => {
    isOnWhislist();
  }, [])

  return (
    <div class=" flex flex-col w-full pb-6 pt-0 px-10 max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
      <img class=" rounded-t-lg" src={image_url} alt={title} />
      <div class="px-5 pb-5">
        <h5 class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{title}</h5>
      </div>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold text-gray-900 dark:text-white">{price}₲</span>
        <div className="flex items-center content-center justify-between">
          <a href={url} target="_blank" class="text-white bg-blue-700  hover:text-blue-700 hover:bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg className="w-6 h-6  dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
            </svg>
          </a>

          <button onClick={() => { Wishlist ? removeFromWishlist() : addToWishList() }}>
            <span>
              <svg className={`w-10 h-10 transition-colors duration-500 ${Wishlist ? 'text-red-600' : 'text-white'}`} stroke="black" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z" />
              </svg>

            </span>
          </button>
        </div>

      </div>
    </div>


  );
};

export default ProductsP;

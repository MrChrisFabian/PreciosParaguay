import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const fetchSearchResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/search?searchTerm=${searchTerm}`
      );
      setSearchResults(response.data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && searchTerm.trim() !== "") {
      // Prevent default behavior (navigation)
      event.preventDefault();
      navigate(`/busqueda/${searchTerm}`);
    }
  };
  useEffect(() => {
    if (searchTerm.trim() !== "") {
      fetchSearchResults();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <div className="relative">
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar producto"
          className=" md:w-96 rounded-lg hover:border-blue-500 text-black"
        />
        <span>
          <FaSearch className="absolute right-3 top-3 text-gray-400 hover:text-blue-500" />
        </span>
      </div>
      {/* resultados list */}
      <div className="max-h-screen overflow-y-auto">
        {searchResults.length > 0 && (
          <div className="absolute mt-2 bg-white shadow-md border border-gray-200 rounded-lg">
            {searchResults.map((product) => (
              <a
                target="_blank"
                href={product.url}
                key={product._id}
                className="p-2 hover:text-slate-800 hover:underline hover:border border-black cursor-pointer text-black block"
                onClick={() => {
                  navigate(`/busqueda/${searchTerm}`);
                  setSearchTerm("");
                }}
              >
                {product.title}
              </a>
            ))}
          </div>
        )}

      </div>
    </div>

  );
}

export default SearchBar;

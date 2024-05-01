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
      <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
        <input
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Buscar producto"
          className="w-full py-2 px-4 focus:outline-none focus:border-blue-500 text-black pr-10"
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
      {searchResults.length > 0 && (
        <div className="absolute mt-2 w-full bg-white shadow-md border border-gray-200 rounded-lg">
          {searchResults.map((product) => (
            <a
              href={product.url}
              key={product._id}
              className="p-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              <p className="text-gray-800">{product.title}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;

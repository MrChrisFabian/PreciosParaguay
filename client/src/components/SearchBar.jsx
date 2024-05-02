import React from "react";
import { Dropdown } from "flowbite-react";
import { FiSearch } from "react-icons/fi";

const SearchBar = () => {
  return (
    <form className="max-w-lg mx-auto">
      <div className="flex">
        <div className="p-2.5 bg-blue-700 rounded-l-lg">
          <Dropdown inline label="Categorias" dismissOnClick={false}>
            <Dropdown.Item>Todos</Dropdown.Item>
            <Dropdown.Item>Mouses</Dropdown.Item>
            <Dropdown.Item>Teclados</Dropdown.Item>
            <Dropdown.Item>Auriculares</Dropdown.Item>
            <Dropdown.Item>Notebooks</Dropdown.Item>
          </Dropdown>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search"
            className="block p-2.5 w-full z-20 text-gray-900 rounded-r-lg"
            placeholder="Buscar Productos"
            required
          />
          <button
            type="submit"
            className="absolute top-0 right-0 p-2.5 h-full text-white bg-blue-700 rounded-r-lg"
          >
            <FiSearch className="w-4 h-4" />
            <span className="sr-only">Search</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default SearchBar;

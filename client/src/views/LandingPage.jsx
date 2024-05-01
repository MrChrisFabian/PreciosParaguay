import React from "react";
import bg from "../images/bg.svg";
import SearchBar from "../components/SearchBar";

const LandingPage = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-blue-500">
            Encuentra todo en un solo lugar
          </h1>
          <p className="text-lg text-center mb-6 text-black">
            Busca y compara productos y precios de diferentes sitios web de
            Paraguay.
          </p>
          <SearchBar />
        </div>
        <div className="md:w-1/2">
          <img src={bg} alt="kkk" className="w-full md:max-w-lg mx-auto" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import React from "react";
import bg from "../images/bg.svg";
import Footer from "../components/Footer";
import NavBarra from "../components/Navbar";
import SearchBar from "../components/SearchBar";
const LandingPage = () => {
  return (
    <>
      <div class="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
        <NavBarra />
        <main className=" flex flex-col content-center items-center px-2">
          <div className="flex flex-col md:my-32 md:flex-row items-center ">

            {/* Contains text and the searchbar */}
            <article className="my-10 mx-14 flex flex-col items-center content-center">
              <h1 className="text-3xl md:text-5xl font-bold text-center mb-4 text-blue-500">
                Encuentra todo en un solo lugar
              </h1>
              <p className="text-lg text-center mb-6 text-black">
                Busca y compara productos de diferentes sitios web de
                Paraguay.
              </p>
              <SearchBar />
            </article>

            {/* Ilustration */}
            <section className="my-11">
              <img src={bg} alt="Illustration of costumers" />
            </section>

          </div>
        </main>

        <Footer /></div>
    </>
  );
};

export default LandingPage;

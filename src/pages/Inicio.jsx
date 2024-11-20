import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Carrusel } from "../components/Carrusel";
import { cardsEstudiantes } from '../data/dataSlices'
import { cardsOfertas } from '../data/dataSliceOferta'
import axios from "axios";
import Navbar from "../components/Navbar";

const Inicio = () => {
    
  return (
    <>
    <header className="h-[370px] bg-Dark-Blue rounded-b-2xl relative">
      <Navbar/>
      <h1 className="text-white font-medium w-[90%] mx-auto md:mx-0 text-3xl md:text-4xl md:w-[60%] md:left-[40px] relative text-center md:top-20 phone:top-10 phone:px-4">
          Te ayudamos a encontrar tu primer empleo
      </h1>
      <img
          src="/minerva_sola_white.png"
          alt="minerva"
          className="phone:w-[80px] phone:h-[120px] md:w-[140px] md:h-[190px] absolute md:top-32 md:right-10 lg:right-20 phone:bottom-8 phone:right-8"
        />
    </header> 
    <main className="grid xl:grid-cols-2 my-5 mx-auto md:gap-8 relative items-center justify-center w-[95%] pb-5">

        <NavLink to="/studentsPublications">

        <h3 className="text-center text-3xl font-semibold my-3">Estudiantes</h3>

          <section className="overflow-hidden"> 

          <Carrusel data={cardsEstudiantes}/> 

          </section>

        </NavLink>

        <NavLink to="/OfferExploreStudent">

        <h3 className="text-center text-3xl font-semibold    my-3">Ofertas laborales</h3>

          <section className="overflow-hidden">
            <Carrusel data={cardsOfertas}/> 
          </section>

        </NavLink>
        
    </main>

    <div className="justify-between w-[95%] mx-auto mt-5 font-semibold text-white my-5 phone:hidden xl:flex">

      <NavLink to="/studentsPublications" className="pl-4">
        <button className="bg-Malachite px-10 py-3 rounded-md">Ver Estudiantes</button>
      </NavLink>

      <NavLink to="/OfferExploreStudent" className="">
        <button className="bg-Malachite px-10 py-3 rounded-md">Ver Ofertas</button>
      </NavLink>

    </div>

    <footer className="w-full h-max bg-Dark-Blue space-y-5 py-7 ">
        <div className="w-[95%] mx-auto h-max flex flex-col items-center text-white font-normal text-xl space-y-5">
          <h2>Descarga nuestra app en tu celular!</h2>
          <a href="https://play.google.com/store/apps/details?id=com.unichamba">
          <img
            src="/google-play.cf5ae74d.svg"
            alt="logo-google-play"
            className="w-[150px] cursor-pointer"
          /></a>
          <h2 className="text-white font-normal text-xl">
            copyright© 2024 Unichamba
          </h2>
          <div className="w-full flex justify-center text-center">
            <a href="https://website-unichamba.netlify.app/policy"
            >
              Términos y Condiciones
            </a>
            <span className="px-3"> - </span>
            <a
              className="cursor-pointer"
            >
              Política de Privacidad
            </a>
          </div>
          <h3 className="text-white font-normal text-xl">
            Universidad Nacional de El Salvador
          </h3>
        </div>

        <div className="w-[95%] h-max mx-auto flex items-center justify-center ">
          <img
            src="/minerva_sola_white.png"
            alt=""
            className="w-[100px] h-[130px]"
          />
        </div>
      </footer> 

    </>
  );
};

export default Inicio;

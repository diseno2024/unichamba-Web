import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import OrdenarTrabajos from "./ListarTrabajos";
import CarrerasInicio from "./ListarCarreras";

const Navbar = ({ setCarreraSeleccionadaNav, setTrabajoSeleccionadoNav }) => {
  const location = useLocation();

  const handleCarreraChange = (carrera) => {
    setCarreraSeleccionadaNav(carrera);
  };

  const handleTrabajoChange = (trabajo) => {
    setTrabajoSeleccionadoNav(trabajo);
  };

  return (
    <>
      {location.pathname === "/studentProfile" ? (
        <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
          <div className="flex w-[200px] items-center justify-center">
            <NavLink to="/studentProfile">
              <h2 className="text-xl font-normal text-white">Usuario</h2>
            </NavLink>
          </div>
        </nav>
      ) : (
        <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
          <div className="bg-white border-[1px] border-Azul-Fuerte h-[50px] rounded-[15px] w-[750px] flex items-center justify-between px-5">
            <OrdenarTrabajos onSelect={handleTrabajoChange} />
            <span className="h-[88%] border-[1px] border-white/50 ml-2"></span>
            <CarrerasInicio onSelect={handleCarreraChange} />
          </div>
          <div className="flex w-[200px] items-center justify-center">
            <NavLink to="/studentProfile">
              <h2 className="text-xl font-normal text-white">Usuario</h2>
            </NavLink>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;

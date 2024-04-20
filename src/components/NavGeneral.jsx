import React from "react";
import { NavLink } from 'react-router-dom'

const NavGeneral = () => {
  return (
    <>
    <nav className="border-b-2 border-black/20 h-[85px] mx-auto flex items-center justify-between px-8 shadow-md bg-Gris-claro">
        <NavLink
          to="/"
          className="h-[50px] w-[80px] px-5 border-[1px] border-Gris-claro rounded-lg placeholder:text-blue-600 focus:outline-none mr-3 flex  text-blue-900"
        >
          <button>
            <box-icon name="arrow-back" color="#31304D" size="35px"></box-icon>
          </button>
        </NavLink>

        <div className="flex justify-center items-center gap-8">
          <NavLink to="/">
            <img src="/LOGO-AZUL.svg" alt="" />
          </NavLink>
        </div>
      </nav>

    </>
  );
};

export default NavGeneral;
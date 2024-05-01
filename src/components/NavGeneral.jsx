import React from "react";
import { NavLink } from 'react-router-dom'

const NavGeneral = () => {
  return (
    <>
    <nav className="border-b-2 border-black/20 h-[85px] mx-auto flex items-center justify-between px-8 shadow-md bg-Dark-Blue">
        <NavLink
          to="/"
          className="h-[50px] w-[80px] px-5 border-[1px]  border-transparent rounded-lg placeholder:text-white focus:outline-none mr-3 flex  text-white"
        >
          <button>
            <span class="material-symbols-outlined">
            arrow_back
            </span>
          </button>
        </NavLink>

        <div className="flex justify-center items-center gap-8">
          <NavLink to="/">
            <img src="/LOGO.svg" alt="" />
          </NavLink>
        </div>
      </nav>

    </>
  );
};

export default NavGeneral;
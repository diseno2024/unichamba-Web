import React from "react";
import { NavLink } from 'react-router-dom'

const NavGeneral = () => {
  return (
    <>
      <nav className="border-b-2 border-black/20 h-[85px] mx-auto flex items-center justify-between px-8 shadow-md">
        
        <NavLink to="/" className="h-[50px] w-[250px] px-5 border-[1px] border-Lapislazuli rounded-lg placeholder:text-blue-600 focus:outline-none mr-3 flex  text-blue-900">
        <button>
          <box-icon name="arrow-back" color="#31304D"></box-icon>
        </button>
        </NavLink>

       
        <div className="flex justify-center items-center gap-8">
        <img src="./public/LOGO.png" alt="" className="mx-auto "/>
        </div>
      </nav>
    </>
  );
};

export default NavGeneral;
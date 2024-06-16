import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import OrdenarTrabajos from "./ListarTrabajos";
import CarrerasInicio from "./ListarCarreras";
import { UserAuth } from "../context/AuthContext";
import { db } from "../data/firebase";
import { collection, getDocs } from "firebase/firestore";

const Navbar = ({ setCarreraSeleccionadaNav, setTrabajoSeleccionadoNav }) => {
  const location = useLocation();
  const {user} = UserAuth();
  const [nombres, setnombres] = useState([]);
  
  const handleCarreraChange = (carrera) => {
    setCarreraSeleccionadaNav(carrera);
   
  };

  const handleTrabajoChange = (trabajo) => {
    setTrabajoSeleccionadoNav(trabajo);
  };

  const fetchData = async () => {
    const studentsSnapshot = await getDocs(collection(db, 'estudiantes'));
    const studentsData = studentsSnapshot.docs.map(doc => doc.data());
    studentsData.filter( perfil => {
      if(perfil.email === user.email){
        setnombres(perfil)
      }
    })
  }

  useEffect(() => {
    fetchData();
  
    return () => {
      fetchData();
    }
  }, [])
  
  // extraccion del nombre segun el inicio de sesion 
  // const {user} = UserAuth();
  // const nombreCompleto = user.displayName;
  // const recorte = nombreCompleto.split( ' ' );
  // const nombres = recorte[0] +" "+ recorte[1];

 
  return (
    <>
      { location.pathname === "/studentProfile"  ?
      
      <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
        </nav>

        : location.pathname === "/anuncios/:idOferta" ?

        <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
        </nav>

        : location.pathname === "/studentsPublications" ?

        <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
          <div className="bg-white border-[1px] border-Azul-Fuerte h-[50px] rounded-[15px] w-[750px] flex items-center justify-between px-5">
            <OrdenarTrabajos onSelect={handleTrabajoChange}></OrdenarTrabajos>
            <span className="h-[88%] border-[1px] border-white/50 ml-2"></span>
            <CarrerasInicio onSelect={handleCarreraChange}></CarrerasInicio>
          </div>
          <div className="flex w-[200px] items-center justify-center">
            <NavLink to="/studentProfile">
            { !user ? <h2 className="text-xl font-normal text-Dark-Blue">{nombres.nombre}</h2> : <h2 className="text-xl font-normal text-white">{nombres.nombre}</h2>}
            </NavLink>
          </div>
        </nav>

        :
        
        <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
          <div className="bg-white border-[1px] border-Azul-Fuerte h-[50px] rounded-[15px] w-[750px] flex items-center justify-center px-5">
            <CarrerasInicio onSelect={handleCarreraChange}></CarrerasInicio>
          </div>
          <div className="flex w-[200px] items-center justify-center">
            <NavLink to="/studentProfile">
            { !user ? <h2 className="text-xl font-normal text-Dark-Blue">{nombres.nombre}</h2> : <h2 className="text-xl font-normal text-white">{nombres.nombre}</h2>}
            </NavLink>
          </div>
        </nav>

      }
    </>
  );
};

export default Navbar;
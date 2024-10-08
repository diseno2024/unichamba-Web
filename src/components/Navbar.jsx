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
    console.log(carrera)
   
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
      
      <nav className="h-[90px] flex items-center justify-center px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
        </nav>

        : location.pathname === "/anuncios/:idOferta" ?

        <nav className="h-[90px] flex items-center justify-center md:justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
        </nav>

        : location.pathname === "/studentsPublications" ?

        <nav className="h-[90px] flex items-center justify-center md:justify-between px-5 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
          
          <div className="md:flex w-[200px] items-center md:justify-between justify-center hidden">
            <NavLink to="/studentProfile">
            { !user ? <h2 className="text-xl font-normal text-Dark-Blue">{nombres.nombre}</h2> : <h2 className="text-xl font-normal text-white">{nombres.nombre}</h2>}
            </NavLink>
          </div>
        </nav>

        :
        
        <nav className="h-[90px] flex items-center justify-center md:justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
  
          <div className="md:flex w-[200px] items-center justify-center hidden">
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
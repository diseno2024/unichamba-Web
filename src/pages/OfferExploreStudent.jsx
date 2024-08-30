import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar';
import OfertaLaboral from '../components/OfertaLaboral';
import CarrerasFiltro from '../components/CarrerasFiltroOES';
import { NavLink } from 'react-router-dom';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/firebase";

const OfferExploreStudent = () => {
  const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState([null, null, null]);
  const [dataStd, setDataStd] = useState([]);
  const [carreraSeleccionadaNav, setCarreraSeleccionadaNav] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false); // Estado para menú de hamburguesa

  const handleCarreraSeleccionadaNav = (carrera) => {
    setCarreraSeleccionadaNav(carrera);
  };

  useEffect(() => {
    const fetchNavData = async () => {
      try {
        let q = collection(db, "anuncios");

        if (carreraSeleccionadaNav) {
          q = query(q, where("carrera", "array-contains", carreraSeleccionadaNav));
        }

        const avisosSnapshot = await getDocs(q);
        const anuncios = avisosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

        setDataStd(anuncios);
      } catch (error) {
        console.error("Error fetching documents: ", error);
      }
    };

    fetchNavData();
  }, [carreraSeleccionadaNav]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  return (
    <>
      <header>
        <Navbar setCarreraSeleccionadaNav={setCarreraSeleccionadaNav}/>
      </header>

      <main className='flex flex-col md:flex-row h-auto mt-[90px] relative space-y-8 md:space-y-0 md:space-x-7 '>
        {/* Filtros */}
        <div className='md:min-w-[250px] lg:min-w-[300px] ml-2 mt-4 md:mt-10 pl-4 py-2 lg:border-r-2 border-black/20'>
          {/* Botón de menú hamburguesa (visible solo en pantallas pequeñas) */}
          <div className="flex lg:hidden md:hidden justify-between items-center mb-3">
          <div className='block sm:hidden'>
            <NavLink to="/inicio">
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </NavLink>
          </div>
            <button onClick={toggleMenu} className="text-black focus:outline-none pr-9">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>

          {/* Filtros (visible en pantallas grandes y tablets o cuando el menú está abierto) */}
          <div className={`lg:block md:block md:pl-2 ${menuAbierto ? 'block' : 'hidden'}`}>
            <CarrerasFiltro
              carrerasSeleccionadas={carrerasSeleccionadas}
              setCarrerasSeleccionadas={setCarrerasSeleccionadas}
              setCarreraSeleccionadaNav={handleCarreraSeleccionadaNav}
            />
          </div>
        </div>

        {/* Tarjetas de ofertas laborales */}
        <div className='flex-1 '>
          <div className='hidden lg:inline-block md:inline-block mt-4 mb-2'>
            <NavLink to="/inicio">
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </NavLink>

          </div>
          <NavLink to='/DetailsOffer'>
            {/* Cambiar el grid según el tamaño de la pantalla */}
            <section className='grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-3 mr-3'>
              <OfertaLaboral
                carrerasSeleccionadas={carrerasSeleccionadas}
                carreraSeleccionadaNav={carreraSeleccionadaNav}
              />
            </section>
          </NavLink>
        </div>
      </main>
    </>
  );
};

export default OfferExploreStudent;


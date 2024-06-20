import React, { useEffect, useState } from "react";
import Navbar from '../components/Navbar'
import OfertaLaboral from '../components/OfertaLaboral';
import CarrerasFiltro from '../components/CarrerasFiltroOES'
import { NavLink } from 'react-router-dom'
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/firebase";

const OfferExploreStudent = () => {
  const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState([null, null, null]);
  const [dataStd, setDataStd] = useState([]);
  const [carreraSeleccionadaNav, setCarreraSeleccionadaNav] = useState(null);

  // Función para manejar la selección de carrera desde el NavBar
  const handleCarreraSeleccionadaNav = (carrera) => {
    setCarreraSeleccionadaNav(carrera);
  };

  useEffect(() => {
    // Lógica para obtener datos de Firestore y filtrar por carrera seleccionada
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

  return (
    <>
      <header>
        <Navbar setCarreraSeleccionadaNav={setCarreraSeleccionadaNav}/>
      </header>

      <main className='flex h-auto mt-[90px]  space-y-8 relative'>
        <div className='ml-2 mt-10 pl-4 py-2 mr-3 min-w-[300px]' >

          <div className=' border-r-2 border-black/20 '>
            {/* Componente CarrerasFiltroOES para seleccionar carreras */}
            <CarrerasFiltro
              carrerasSeleccionadas={carrerasSeleccionadas} setCarrerasSeleccionadas={setCarrerasSeleccionadas}
              setCarreraSeleccionadaNav={handleCarreraSeleccionadaNav} // Pasar función para actualizar carrera seleccionada en Nav
            />
          </div>

        </div>

        <div>
          <div className='mt-4 mb-4'>
            <NavLink to="/inicio">
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </NavLink>
          </div>
          <NavLink to='/DetailsOffer'>
            <section className=' grid grid-cols-2 gap-3 mr-3'>
              {/* Componente OfertaLaboral con carrerasSeleccionadas para filtrar */}
              <OfertaLaboral carrerasSeleccionadas={carrerasSeleccionadas} carreraSeleccionadaNav={carreraSeleccionadaNav} />
            </section>
          </NavLink>
        </div>

      </main>
    </>
  )
}

export default OfferExploreStudent;

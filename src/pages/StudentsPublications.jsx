import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CarreraFiltro from "../components/CarreraFiltro";
import AreadeTrabajo from "../components/AreaTrabajo";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { NavLink } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/firebase";

const StudentsPublications = () => {
  const [dataStd, setDataStd] = useState([]);
  const [carreraSeleccionadaNav, setCarreraSeleccionadaNav] = useState(null);
  const [trabajoSeleccionadoNav, setTrabajoSeleccionadoNav] = useState(null);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false); 

  //Estado para menu hamburguesa

  const fetchNavData = async () => {
    try {
      let q = collection(db, "estudiantes");

      if (carreraSeleccionadaNav) {
        q = query(q, where("carrera", "==", carreraSeleccionadaNav));
      }

      const studentsSnapshot = await getDocs(q);
      let estudiantes = studentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      if (trabajoSeleccionadoNav) {
        estudiantes = estudiantes.filter(estudiante =>
          estudiante.trabajos.some(trabajo => trabajo.icono === trabajoSeleccionadoNav)
        );
      }

      setDataStd(estudiantes);
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

   const fetchFilterData = async () => {
    try {
      let q = collection(db, "estudiantes");

      if (carreraSeleccionada) {
        q = query(q, where('carrera', '==', carreraSeleccionada));
      }

      const studentsSnapshot = await getDocs(q);
      let estudiantesSeleccionados = studentsSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      if (trabajoSeleccionado) {
        estudiantesSeleccionados = estudiantesSeleccionados.filter(estudiante =>
          estudiante.trabajos.some(trabajo => trabajo.nombre === trabajoSeleccionado)
        );
      }
      // Actualiza el estado nuevamente con los resultados de la segunda consulta si es necesario
      setDataStd(estudiantesSeleccionados);

    } catch (error) {
      console.error("Error fetching documents: ", error);
    }
  };

  useEffect(() => {
    fetchNavData();
  }, [carreraSeleccionadaNav, trabajoSeleccionadoNav]);

  useEffect(() => {
    fetchFilterData();
  }, [carreraSeleccionada, trabajoSeleccionado]);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };
  
  
  return (
    <>
      <header>
        <Navbar 
          setCarreraSeleccionadaNav={setCarreraSeleccionadaNav}
          setTrabajoSeleccionadoNav={setTrabajoSeleccionadoNav}
        />
      </header>
      <br />
      <main className="flex flex-col md:flex-row h-auto mt-[90px] relative space-y-8 md:space-y-0 md:space-x-7">

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

        <section className="px-5 h-max w-full md:w-1/5 border-r-2 flex flex-col space-y-4">
        <div className={`lg:block md:block md:pl-2 ${menuAbierto ? 'block' : 'hidden'}`}> 
          <div>
            <CarreraFiltro 
              carreraSeleccionada={carreraSeleccionada} 
              setCarreraSeleccionada={setCarreraSeleccionada} 
            />
          </div>
          <div>
            <AreadeTrabajo 
              trabajoSeleccionado={trabajoSeleccionado} 
              setTrabajoSeleccionado={setTrabajoSeleccionado} 
            />
          </div>
          </div>

        </section>

        <div className=" ml-2 px-3 ">
          
          <section className={`grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-20 mr-5 ${menuAbierto ? 'hidden' : 'grid'}`}>
          {dataStd.length > 0 ? (
            dataStd.map(student => (
              <TarjetaPublicacion listStudent={student} key={student.id} />
            ))
          ) : (
            <p>No hay resultados para los filtros seleccionados.</p>
          )}
        </section>
        </div>
        
      </main>
    </>
  );
};

export default StudentsPublications;



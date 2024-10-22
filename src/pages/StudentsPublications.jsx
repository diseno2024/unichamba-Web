import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CarreraFiltro from "../components/CarreraFiltro";
import AreadeTrabajo from "../components/AreaTrabajo";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { NavLink } from "react-router-dom";
import axios from "axios";

const StudentsPublications = () => {
  const [dataStd, setDataStd] = useState([]);
  const [carreraSeleccionadaNav, setCarreraSeleccionadaNav] = useState(null);
  const [trabajoSeleccionadoNav, setTrabajoSeleccionadoNav] = useState(null);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Estado para el menú hamburguesa

  // Función para obtener estudiantes desde CouchDB
  const fetchNavData = async () => {
    try {
      const auth = {
        username: "unichamba", // Cambia esto por tu usuario
        password: "S3pt13mbre#2024Work", // Cambia esto por tu contraseña
      };

      const response = await axios.get(
        "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?include_docs=true",
        { auth }
      );

      let estudiantes = response.data.rows.map(row => row.doc); // Extraer los datos de los documentos

      // Filtrar por carrera seleccionada desde el navbar
      if (carreraSeleccionadaNav) {
        estudiantes = estudiantes.filter(estudiante => estudiante.carrera === carreraSeleccionadaNav);
      }

      // Filtrar por trabajo seleccionado desde el navbar
      if (trabajoSeleccionadoNav) {
        estudiantes = estudiantes.filter(estudiante =>
          estudiante.trabajos.some(trabajo => trabajo.icono === trabajoSeleccionadoNav)
        );
      }

      setDataStd(estudiantes);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
    }
  };

  // Función para filtrar estudiantes según los filtros seleccionados
  const fetchFilterData = async () => {
    try {
      const auth = {
        username: "unichamba", // Cambia esto por tu usuario
        password: "S3pt13mbre#2024Work", // Cambia esto por tu contraseña
      };

      const response = await axios.get(
        "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?include_docs=true",
        { auth }
      );

      let estudiantesSeleccionados = response.data.rows.map(row => row.doc); // Extraer los datos de los documentos

      // Filtrar por carrera seleccionada
      if (carreraSeleccionada) {
        estudiantesSeleccionados = estudiantesSeleccionados.filter(estudiante => estudiante.carrera === carreraSeleccionada);
      }

      // Filtrar por trabajo seleccionado
      if (trabajoSeleccionado) {
        estudiantesSeleccionados = estudiantesSeleccionados.filter(estudiante =>
          estudiante.trabajos.some(trabajo => trabajo.nombre === trabajoSeleccionado)
        );
      }

      setDataStd(estudiantesSeleccionados);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
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
      <main className="flex flex-col md:flex-row h-auto mt-[70px] relative space-y-0 md:space-y-0 md:space-x-7">
        
          <button onClick={toggleMenu} className={`${menuAbierto ? 'hidden' : 'flex'} md:hidden text-white  bg-Dark-Blue focus:outline-none justify-center py-2 mx-4 mt-2 rounded-2xl`}>
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
       
        <section className="px-5 h-max w-full md:min-w-[225px] md:max-w-[250px] border-r-2 flex-col space-y-4">
          <div className={`lg:block md:block md:pl-2  ${menuAbierto ? 'block ' : 'hidden'}`}>
            <div className="flex justify-end px-2 pt-2 md:hidden">
              <button onClick={toggleMenu} className="text-black focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

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

        <div className="px-3 flex flex-col">
          <section className="my-4 mx-4">
            <NavLink to="/inicio" >
              <span className="material-symbols-outlined">
                arrow_back
              </span>
            </NavLink>
          </section>
          <section className={`grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 ${menuAbierto ? 'hidden' : 'grid'}`}>
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
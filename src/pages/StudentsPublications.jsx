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

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(6);
  const [pageRange, setPageRange] = useState({ start: 1, end: 5 });

  const fetchNavData = async () => {
    try {
      const auth = {
        username: "unichamba",
        password: "S3pt13mbre#2024Work",
      };

      const response = await axios.get(
        "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?include_docs=true",
        { auth }
      );

      let estudiantes = response.data.rows.map(row => ({ ...row.doc, id: row.id }));

      if (carreraSeleccionadaNav) {
        estudiantes = estudiantes.filter(estudiante => estudiante.carrera === carreraSeleccionadaNav);
      }

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

  const fetchFilterData = async () => {
    try {
      const auth = {
        username: "unichamba",
        password: "S3pt13mbre#2024Work",
      };

      const response = await axios.get(
        "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?include_docs=true",
        { auth }
      );

      let estudiantesSeleccionados = response.data.rows.map(row => ({ ...row.doc, id: row.id }));

      if (carreraSeleccionada) {
        estudiantesSeleccionados = estudiantesSeleccionados.filter(estudiante => estudiante.carrera === carreraSeleccionada);
      }

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

  // Calcular los estudiantes para la página actual
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = dataStd.slice(indexOfFirstStudent, indexOfLastStudent);

  // Cambiar de página
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (pageNumber > pageRange.end) {
      setPageRange({ start: Math.min(pageNumber, totalPages - 4), end: Math.min(pageNumber + 4, totalPages) });
    } else if (pageNumber < pageRange.start) {
      setPageRange({ start: Math.max(pageNumber - 4, 1), end: Math.max(pageNumber, 5) });
    }
  };

  const totalPages = Math.ceil(dataStd.length / studentsPerPage);

  const handleNextPageRange = () => {
    if (pageRange.end < totalPages) {
      setPageRange({ start: pageRange.start + 5, end: Math.min(pageRange.end + 5, totalPages) });
    }
  };

  const handlePrevPageRange = () => {
    if (pageRange.start > 1) {
      setPageRange({ start: Math.max(pageRange.start - 5, 1), end: Math.max(pageRange.start - 1, 5) });
    }
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
        <button onClick={toggleMenu} className={`${menuAbierto ? 'hidden' : 'flex'} md:hidden text-white bg-Dark-Blue focus:outline-none justify-center py-2 mx-4 mt-2 rounded-2xl`}>
          <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>

        <section className="px-5 h-max w-full md:min-w-[225px] md:max-w-[250px] border-r-2 flex-col space-y-4">
          <div className={`lg:block md:block md:pl-2 ${menuAbierto ? 'block' : 'hidden'}`}>
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
            <NavLink to="/inicio">
              <span className="material-symbols-outlined">arrow_back</span>
            </NavLink>
          </section>
          <section className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 ${menuAbierto ? 'hidden' : 'grid'}`}>
            {currentStudents.length > 0 ? (
              currentStudents.map(student => (
                <TarjetaPublicacion listStudent={student} key={student.id} />
              ))
            ) : (
              <p>No hay resultados para los filtros seleccionados.</p>
            )}
          </section>

          {/* Paginador */}
          <div className="md:absolute md:top-0 md:right-0 lg:absolute lg:top-0 lg:right-0 flex justify-center my-4">
            <button
              onClick={() => {
                if (currentPage > 1) {
                  paginate(currentPage - 1);
                }
              }}
              disabled={currentPage === 1}
              className="mx-0.5 p-2 bg-Dark-Blue text-white rounded"
            >
              {`<<`}
            </button>

            {Array.from({ length: Math.min(5, totalPages - pageRange.start + 1) }, (_, index) => {
              const pageNumber = pageRange.start + index;
              return (
                <button
                  key={pageNumber}
                  onClick={() => paginate(pageNumber)}
                  className={`mx-0.5 p-2 rounded ${currentPage === pageNumber ? 'bg-Dark-Blue text-white' : 'bg-green-500 text-white'}`}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => {
                if (currentPage < totalPages) {
                  paginate(currentPage + 1);
                }
              }}
              disabled={currentPage === totalPages}
              className="mx-0.5 p-2 bg-Dark-Blue text-white rounded"
            >
              {`>>`}
            </button>
          </div>


        </div>
      </main>
    </>
  );
};

export default StudentsPublications;

import React, { useEffect, useState,useMemo,useCallback } from "react";
import Navbar from "../components/Navbar";
import CarreraFiltro from "../components/CarreraFiltro";
import AreadeTrabajo from "../components/AreaTrabajo";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Modal = ({ message, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-lg">
        <h2 className="text-lg font-bold">Información</h2>
        <p>{message}</p>
        <button onClick={onClose} className="mt-4 p-2 bg-Dark-Blue text-white rounded">
          Cerrar
        </button>
      </div>
    </div>
  );
};

const StudentsPublications = () => {
  const [dataStd, setDataStd] = useState([]);
  const [carreraSeleccionadaNav, setCarreraSeleccionadaNav] = useState(null);
  const [trabajoSeleccionadoNav, setTrabajoSeleccionadoNav] = useState(null);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [studentsPerPage] = useState(6);
  const [pageRange, setPageRange] = useState({ start: 1, end: 5 });

  const fetchData = useCallback(async () => {
    try {
      const auth = {
        username: "unichamba",
        password: "S3pt13mbre#2024Work",
      };

      const response = await axios.get(
        "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_design/cuenta-reciente/_view/cuenta-reciente?descending=true",
        { auth, params: { include_docs: true } }
      );

      const estudiantes = response.data.rows.map(row => ({ ...row.doc, id: row.id }));
      setDataStd(estudiantes);
    } catch (error) {
      console.error("Error al obtener los estudiantes:", error);
    }
  }, []);
  const estudiantesFiltrados = useMemo(() => {
    let filteredData = dataStd;

    if (carreraSeleccionada || trabajoSeleccionado) {
      filteredData = dataStd.filter(estudiante => {
        const carreraMatches = carreraSeleccionada ? estudiante.carrera === carreraSeleccionada : true;
        const trabajoMatches = trabajoSeleccionado
          ? estudiante.trabajos.some(trabajo => trabajo.nombre === trabajoSeleccionado)
          : true;
        return carreraMatches && trabajoMatches;
      });

      // Mostrar modal si no hay registros
      if (filteredData.length === 0 && (carreraSeleccionada || trabajoSeleccionado)) {
        setModalMessage("No hay registros que coincidan con los filtros seleccionados.");
        setModalVisible(true);
      }
    }

    return filteredData;
  }, [dataStd, carreraSeleccionada, trabajoSeleccionado]);
  const currentStudents = useMemo(() => {
    const indexOfLastStudent = currentPage * studentsPerPage;
    const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
    return estudiantesFiltrados.slice(indexOfFirstStudent, indexOfLastStudent);
  }, [estudiantesFiltrados, currentPage, studentsPerPage]);

  
  const totalPages = Math.ceil(estudiantesFiltrados.length / studentsPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchData();
  }, [fetchData])

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  // Calcular los estudiantes para la página actual
  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;

  // Cambiar de página
 



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

  const handleCloseModal = () => {
    setModalVisible(false);
    setCarreraSeleccionada(null); // Reiniciar filtro de carrera
    setTrabajoSeleccionado(null); // Reiniciar filtro de trabajo
    
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

        <div className={`px-3 flex flex-col ${menuAbierto ? 'hidden' : 'flex'}`}>
          <section className="my-4 mx-4">
            <div className="flex justify-between items-center">
              {/* Botón de ir atrás, siempre visible */}
              <NavLink to="/inicio">
                <span className="material-symbols-outlined">arrow_back</span>
              </NavLink>

              {/* Botón de filtros, solo visible en vista móvil */}
              <button
                onClick={toggleMenu}
                className="md:hidden text-Dark-Blue focus:outline-none justify-center py-2 px-4 rounded-2xl"
              >
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </section>

          <section className={`grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 ${menuAbierto ? 'hidden' : 'grid'}`}>
            {currentStudents.length > 0 ? (
              currentStudents.map(student => (
                <TarjetaPublicacion listStudent={student} key={student.id} />
              ))
            ) : (
              <div className="flex justify-center items-center h-full">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
              </div>
            )}
          </section>

          {/* Paginador */}
          <div className="md:absolute md:top-0 md:right-0 lg:absolute lg:top-0 lg:right-0 flex justify-center my-4">
          <button
              onClick={() => currentPage > 1 && paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="mx-0.5 p-2 bg-Dark-Blue text-white rounded"
            >
              {`<<`}
            </button>
            {[...Array(totalPages).keys()].slice(0, 5).map(num => (
              <button
                key={num}
                onClick={() => paginate(num + 1)}
                className={`mx-0.5 p-2 rounded ${currentPage === num + 1 ? 'bg-green-500 text-white' : 'bg-Dark-Blue text-white'}`}
              >
                {num + 1}
              </button>
            ))}
            <button
              onClick={() => currentPage < totalPages && paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="mx-0.5 p-2 bg-Dark-Blue text-white rounded"
            >
              {`>>`}
            </button>
          </div>
        </div>
      </main>

      {/* Modal para no hay registros */}
      {modalVisible && (
        <Modal message={modalMessage} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default StudentsPublications;

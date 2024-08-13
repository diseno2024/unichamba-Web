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

  
  return (
    <>
      <header>
        <Navbar 
          setCarreraSeleccionadaNav={setCarreraSeleccionadaNav}
          setTrabajoSeleccionadoNav={setTrabajoSeleccionadoNav}
        />
      </header>

      <main className="w-[95%] mx-auto mt-28 flex">
        <section className="px-5 h-max w-[20%] border-r-2">
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
        </section>
        <div className=" ml-2 px-3">
          <NavLink to='/inicio'>
            <span class="material-symbols-outlined">arrow_back</span>
          </NavLink>
        </div>
        <section className="grid grid-cols-2 mx-auto gap-4">
          {dataStd.length > 0 ? (
            dataStd.map(student => (
              <TarjetaPublicacion listStudent={student} key={student.id} />
            ))
          ) : (
            <p>No hay resultados para los filtros seleccionados.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default StudentsPublications;

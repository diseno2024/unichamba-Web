import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import CarreraFiltro from "../components/CarreraFiltro";
import AreadeTrabajo from "../components/AreaTrabajo";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { NavLink } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../data/firebase";


// KENDALL 



const studentsPublications = () => {

  const [dataStd, setdataStd] = useState([])
  const [mostrarTarjetas, setMostrarTarjetas] = useState(true);

  /* Se agrego para las props de los componentes */
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null)
  const [trabajoSeleccionado, setTrabajoSeleccionado] = useState(null)

  const [carreraSeleccionadaNav, setCarreraSeleccionadaNav] = useState(null);
  const [trabajoSeleccionadoNav, setTrabajoSeleccionadoNav] = useState(null);

  const fetchData = async () => {
    console.log(trabajoSeleccionado, carreraSeleccionada)
    let seleccionados = null
    try {
      /* De momento solo funciona el filtro de carreras el de trabjos falta arreglarlo */
      const studentsSnapshot = collection(db, 'estudiantes');
      if ((carreraSeleccionada != null) && (trabajoSeleccionado != null)) {
        seleccionados = query(studentsSnapshot, where('carrera', '==', carreraSeleccionada), where('trabajos', 'array-contains', { nombre: trabajoSeleccionado }));
      } else if (carreraSeleccionada != null) {
        seleccionados = query(studentsSnapshot, where('carrera', '==', carreraSeleccionada));
      } else if (trabajoSeleccionado != null) {
        /* En el where lleva array-contains ya que los trabajos son un array, y la tercera parte del where es porque dentro del array hay maps*/
        seleccionados = query(studentsSnapshot, where('trabajos', 'array-contains', { nombre: trabajoSeleccionado }));
      } else {
        seleccionados = studentsSnapshot
      }

      if (carreraSeleccionadaNav) {
        seleccionados = query(seleccionados, where("carrera", "==", carreraSeleccionadaNav));
      }
      
      if (trabajoSeleccionadoNav!=null) {
        seleccionados = query(studentsSnapshot, where('trabajos', 'array-contains', { icono: trabajoSeleccionado }));
      }

      
      /* Cambie la manera de obtener los datos para poder obtener el id. También la anterior forma me daba problemas */
      await getDocs(seleccionados)
        .then((resp) => {
          setdataStd(resp.docs.map((doc) => {
            return { ...doc.data(), id: doc.id}
          }))
        })
      console.log(dataStd)
    } catch (error) {
      console.error("Error fetching documents: ", error);
    }


  }

  useEffect(() => {
    setdataStd([])
    fetchData();
    return () => {
      fetchData();
    }
  }, [carreraSeleccionada, trabajoSeleccionado, carreraSeleccionadaNav, trabajoSeleccionadoNav])

  return (
    <>
      <header>
        <Navbar  setCarreraSeleccionadaNav={setCarreraSeleccionadaNav}
          setTrabajoSeleccionadoNav={setTrabajoSeleccionadoNav}
/>
      </header>

      <main className=" w-[95%] mx-auto mt-28 flex">

        <section className="px-5 h-max w-[20%] border-r-2">

          <div className="">
            {/* Se agregaron los props */}
            <CarreraFiltro carreraSeleccionada={carreraSeleccionada} setCarreraSeleccionada={setCarreraSeleccionada} />
          </div>

          <div className="">
            <AreadeTrabajo trabajoSeleccionado={trabajoSeleccionado} setTrabajoSeleccionado={setTrabajoSeleccionado} />
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

export default studentsPublications;
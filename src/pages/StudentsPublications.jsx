import React, { useEffect, useState } from "react";

import Navbar from "../components/Navbar";
import CarreraFiltro from "../components/CarreraFiltro";
import AreadeTrabajo from "../components/AreaTrabajo";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { NavLink } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";


// KENDALL 



const studentsPublications = () => {

  const [dataStd, setdataStd] = useState([])
  const [mostrarTarjetas, setMostrarTarjetas] = useState(true);

  /* Se agrego para las props de los componentes */
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null)

  const fetchData = async () => {
    const studentsSnapshot = await getDocs(collection(db, 'estudiantes'));
    const estudiantes = studentsSnapshot.docs.map(doc => doc.data());
    // console.log(estudiantes)
    setdataStd(estudiantes);
  }

  useEffect(() => {
    
    fetchData();
  
    return () => {
      fetchData();
    }
  }, [])
  

  return (
    <>
      <header>
        <Navbar/>
      </header>

      <main className=" w-[95%] mx-auto mt-28 flex">

        <section className="px-5 h-max w-[20%] border-r-2">

          <div className="">
            {/* Se agregaron los props */}
            <CarreraFiltro carreraSeleccionada={carreraSeleccionada} setCarreraSeleccionada={setCarreraSeleccionada}/>
          </div>

          <div className="">
            <AreadeTrabajo />
          </div>

        </section>
        <div className=" ml-2 px-3">
          <NavLink to='/inicio'>
            <span class="material-symbols-outlined">arrow_back</span>
          </NavLink>
        </div>
        <section className="grid grid-cols-2 mx-auto gap-4">
  {mostrarTarjetas &&
    dataStd.map((student) => (
      <TarjetaPublicacion listStudent={student} key={student.id} />
    ))}
</section>

      </main>
    </>
  );
};

export default studentsPublications;
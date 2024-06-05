import React from "react";
import Navbar from "../components/Navbar";
import students from "../data/students";
import CarreraFiltro from "../components/CarreraFiltro";
import Municipio from "../components/Municipio";
import AreadeTrabajo from "../components/AreaTrabajo";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { NavLink } from "react-router-dom";


const studentsPublications = () => {



  return (
    <>
      <header>
        <Navbar/>
      </header>

      <main className=" w-[95%] mx-auto mt-28 flex">

        <section className="px-5 h-max w-[20%] border-r-2">

          <div className="">
            <CarreraFiltro />
          </div>
{/* 
          <div className="">
            <Municipio />
          </div> */}

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

        {students.map((student) => (
          <TarjetaPublicacion listStudent={student} key={student.id}/>
        ))}

        </section>

      </main>
    </>
  );
};

export default studentsPublications;
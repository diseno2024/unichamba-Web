import React from "react";
import Navbar from "../components/Navbar";
import students from "../data/students";
import CarreraFiltro from "../components/CarreraFiltro";
import Municipio from "../components/Municipio";
import AreadeTrabajo from "../components/AreaTrabajo";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { NavLink } from "react-router-dom";

const studentsPublications = () => {
  // Dividir la lista de elementos en dos partes
  const mitad = Math.ceil(students.length / 2);
  const primeraColumna = students.slice(0, mitad);
  const segundaColumna = students.slice(mitad);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="flex bg-Blanco-cremoso h-auto mt-[6px] pt-28 space-y-8">
        <div className="ml-2 mt-10 pl-4 py-2 mr-3 min-w-[300px]">
          <div className="border-r-2 border-black/20">
            <CarreraFiltro />
          </div>

          <div className="border-r-2 border-black/20">
            <Municipio />
          </div>

          <div className="border-r-2 border-black/20">
            <AreadeTrabajo />
          </div>
        </div>

        <section className="w-[60%]">

            {}
          <div className="flex space-x-5">
            {/* Primera columna */}
            <div className="flex-1 columna-con-margen">
              {primeraColumna.map((elemento, index) => (
                <NavLink to="/StudentProfile" >
                  <TarjetaPublicacion listStudent={elemento} key={index}/>
                </NavLink>
              ))}
            </div>

            <div className="flex-1 columna-con-margen">
              {segundaColumna.map((elemento, index) => (
                <NavLink to="/StudentProfile" >
                  <TarjetaPublicacion listStudent={elemento} key={index} />
                </NavLink>
              ))}
            </div>
          </div>

          {/* {students.map((student) => (
            <NavLink to="/studentProfile">
              <TarjetaPublicacion listStudent={student} key={student.id} />
            </NavLink>
          ))} */}
        </section>
      </main>
    </>
  );
};

export default studentsPublications;
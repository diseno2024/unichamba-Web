import Perfiles from "../components/PerfilEstudiante";
import Navbar from "../components/Navbar";
import { data } from "../data/ProfileStudentData";
const {nivelesEducacion, lugaresEducacion} = data[0];

// Este es la paginación de Elias  

const StudentProfile = () => {
  return (
    <>
    {/* HEADER */}
    <header>
      <Navbar />
    </header>

    {/* MAIN */}
    <main className=' grid grid-cols-[1fr_2fr] gap-x-4 pt-28 pb-5'>
      {/* PERFIL */}
      <Perfiles>
      </Perfiles>

      {/* ACTIVIDADES, ESTADISTICAS Y APTITUDES */}
      <div className=" bg-Gris-claro/50 mt-5 rounded-xl mr-3">
        {/* EMPLEOS FAVORITOS */}
        <h1 className=" ml-5 mt-5 text-2xl font-bold pb-3">Acerca de</h1>
        <div className=" bg-Azul-oscuro/40 w-[850px] mx-5 rounded-xl h-[150px] items-center flex justify-center flex-col overflow-x-hidden">
          <div className="">
            <p>Háblanos de ti</p>
          </div>
        </div>

        <h1 className=" ml-5 mt-5 text-2xl font-bold pb-3">Estudios</h1>
        <div className=" bg-Azul-oscuro/40 w-[850px] mx-5 rounded-xl h-[150px] flex-col overflow-x-hidden">
          <div className="">
            <ul className=" pt-3 pl-3 space-y-3">
              <li ><span className= " bg-Gris-claro/40 p-1 rounded-lg">{nivelesEducacion[0]} en {lugaresEducacion[0]}</span></li>
              <li ><span className= " bg-Gris-claro/40 p-1 rounded-lg">{nivelesEducacion[1]} en {lugaresEducacion[1]}</span></li>
              <li ><span className= " bg-Gris-claro/40 p-1 rounded-lg">{nivelesEducacion[2]} en {lugaresEducacion[2]}</span></li>
            </ul>
          </div>
        </div>

        <h1 className=" ml-5 mt-5 text-2xl font-bold pb-3">Experiencias en trabajos</h1>
        <div className=" bg-Azul-oscuro/40 w-[850px] mx-5 rounded-xl h-[150px] flex-col overflow-x-hidden">
          <div className="">
            <ul className=" pt-3 pl-3 space-y-3">
              <li><span className= " bg-Gris-claro/40 p-1 rounded-lg">Enfermera</span></li>
              <li><span className= " bg-Gris-claro/40 p-1 rounded-lg">Cuidado de niños</span></li>
              <li><span className= " bg-Gris-claro/40 p-1 rounded-lg">cuidado de mascotas</span></li>
              <li><span className= " bg-Gris-claro/40 p-1 rounded-lg">Educacion basica</span></li>
              <li><span className= " bg-Gris-claro/40 p-1 rounded-lg">Pintor</span></li>

            </ul>
          </div>
        </div>
        
        
      </div>
    </main>
    </>
  )
}

export default StudentProfile;
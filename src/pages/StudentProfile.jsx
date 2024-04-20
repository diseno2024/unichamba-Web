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
    <main className='flex items-center justify-between pt-28 pb-5 h-auto px-10'>
      {/* PERFIL */}
      <div >
        <Perfiles />
      </div>

      {/* ACTIVIDADES, ESTADISTICAS Y APTITUDES */}
      <div className=" bg-Gris-claro/50 rounded-xl w-[73%] h-[800px] space-y-3">
        {/* EMPLEOS FAVORITOS */}
        <h1 className="mt-5 text-2xl font-normal pb-3 px-10">Acerca de</h1>
        <div className=" bg-Azul-oscuro/20 w-[95%] mx-auto rounded-xl h-[150px] items-center flex justify-center flex-col overflow-x-hidden">
            <p className="font-normal text-Azul-Fuerte/70 tracking-wide">Háblanos de ti</p>
        </div>

        <h1 className="mt-5 text-2xl font-normal px-10 pb-3">Estudios</h1>
        <div className=" bg-Azul-oscuro/20 w-[95%] mx-auto rounded-xl h-[150px] flex-col overflow-x-hidden">
            <ul className="list-disc w-max py-4 px-10 font-normal text-Azul-Medianoche">
              <li >{nivelesEducacion[0]} en {lugaresEducacion[0]}</li>
              <li >{nivelesEducacion[1]} en {lugaresEducacion[1]}</li>
              <li >{nivelesEducacion[2]} en {lugaresEducacion[2]}</li>
            </ul>
        </div>

        <h1 className="mt-5 text-2xl font-normal px-10 pb-3">Experiencias en trabajos</h1>
        <div className=" bg-Azul-oscuro/20 w-[95%] mx-auto rounded-xl h-[150px] flex-col overflow-x-hidden">
            <ul className="flex py-7 px-5 gap-4">
              <li><span className= " bg-Azul-Neblina  text-white p-3 rounded-lg font-normal">Enfermera</span></li>
              <li><span className= " bg-Azul-Neblina text-white p-3 rounded-lg font-normal">Cuidado de niños</span></li>
              <li><span className= " bg-Azul-Neblina text-white p-3 rounded-lg font-normal">Educacion basica</span></li>
              <li><span className= " bg-Azul-Neblina text-white p-3 rounded-lg font-normal">cuidado de mascotas</span></li>
              <li><span className= " bg-Azul-Neblina text-white p-3 rounded-lg font-normal">Pintor</span></li>

            </ul>
        </div>
        
        
      </div>
    </main>
    </>
  )
}

export default StudentProfile;
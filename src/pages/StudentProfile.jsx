import Perfiles from "../components/PerfilEstudiante";
import Navbar from "../components/Navbar";
import { data } from "../data/ProfileStudentData";
const {postulaciones, perfilVisitado, descargaCV} = data[0];



// Este es la paginación de Elias  

const StudentProfile = () => {
  return (
    <>
    {/* HEADER */}
    <header>
      <Navbar />
    </header>

    {/* MAIN */}
    <main className=' grid grid-cols-[1fr_2fr] gap-x-4'>
      {/* PERFIL */}
      <Perfiles>
      </Perfiles>

      {/* ACTIVIDADES, ESTADISTICAS Y APTITUDES */}
      <div className=" bg-Gris-claro/50 mt-5 rounded-xl mr-3">
        {/* EMPLEOS FAVORITOS */}
        <h1 className=" ml-5 mt-5 text-2xl font-bold pb-3">Empleos favoritos</h1>
        <div className=" bg-Azul-oscuro/40 w-[850px] mx-5 rounded-xl h-[300px] items-center flex justify-center flex-col">
          <div className=" opacity-20">
            <box-icon name='heart'></box-icon>
          </div>
          <div className="">
            <p>Guarda empleos para postularte mas tarde</p>
          </div>
        </div>

        {/* MI ACTIVIDAD Y APTITUDES*/}
        <div className="grid grid-cols-2 mt-12">
          {/* MI ACTIVIDAD */}
          <div>
            <h2 className=" ml-5 text-2xl font-bold">Mi actividad</h2>
            <div className=" bg-Azul-oscuro/40 rounded-xl mx-5 p-5 h-[150px]">
            {/* <span className=' ml-5 font-bold border-2 border-black'>{postulaciones}</span><span className=' mx-auto'>Postulaciones esta semana</span>
              <h1 className=' '><span className=' ml-5 font-bold'>{perfilVisitado}</span> <span className=' mx-auto'>Visualizacion de tu perfil</span></h1>
              <h1 className=' '><span className=' ml-5 font-bold'>{descargaCV}</span> <span className=' mx-auto'>Descargas de tu CV</span></h1> */}

              <ul className="flex items-center flex-col justify-center gap-2">
                <li className=" w-full flex justify-start"><span className=" ml-8 font-bold">{postulaciones}</span><span className=" mx-auto">Postulaciones esta semana</span></li>
                <li className=" w-full flex justify-start"><span className=" ml-8 font-bold">{perfilVisitado}</span><span className=" mx-auto">Visualizaciones del perfil</span></li>
                <li className=" w-full flex justify-start"><span className=" ml-8 font-bold">{descargaCV}</span><span className=" mx-auto">Descargas de tu CV</span></li>
              </ul>
            </div>
          </div>

          {/* APTITUDES */}
          <div>
            <h2 className=" ml-5 text-2xl font-bold">Aptitudes</h2>
            <div className=" bg-Azul-oscuro/40 rounded-xl mx-5 p-5 h-[150px] overflow-x-hidden">
              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda corrupti magni vitae, numquam vel recusandae doloribus dolor sed distinctio cupiditate reiciendis, quo quas laudantium voluptate velit, mollitia officiis hic! Minima!</p>
            </div>
          </div>
        </div>
      </div>
    </main>
    </>
  )
}

export default StudentProfile;
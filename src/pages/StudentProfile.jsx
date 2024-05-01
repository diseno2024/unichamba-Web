import Perfiles from "../components/PerfilEstudiante";
import Navbar from "../components/Navbar";
import { data } from "../data/ProfileStudentData";
const {nivelesEducacion, lugaresEducacion, nombre, ciudad, municipio, contacto, email, EducacionActual} = data[0];

// Este es la paginación de Elias  

const StudentProfile = () => {
  return (
    <>
    {/* HEADER */}
    <header>
      <Navbar/>
    </header>


    {/* MAIN */}
    <main className=" mb-10 mt-24">
      {/* FOTO DE PERFIL Y PORTADA */}

      <div className=" mt-2 mx-5 bg-portada-perfil bg-cover h-[250px]">
        <div className=" w-[200px] pt-[150px] ml-9 ">
        <img src="/foto-perfil.jpg" alt="" className=" rounded-full border-8"/>
        </div>
      </div>

      {/* INFORMACION */}
      
      <div className=" grid grid-cols-custom gap-1">
        <div className=" mt-28 ml-2">
          <h2 className=" text-3xl font-normal flex justify-center">{nombre}</h2>
          <h1 className=" flex justify-center text-2xl text-Blue font-bold">{municipio}, {ciudad}</h1>

          <div className=" mt-5">
          <span className=" ml-5 font-normal">Informacion personal</span>
          <ul className=" mt-5 ml-4">
            <li><span class="material-symbols-outlined">call</span> <span className=" ml-2 font-normal">Telefono fijo</span></li>
            <p className=" ml-9">{contacto}</p>

            <li><span class="material-symbols-outlined">mail</span> <span className=" ml-2 font-normal">Email</span></li>
            <p className=" ml-9">{email}</p>

            <li><span class="material-symbols-outlined">apartment</span> <span className=" ml-2 font-normal">Educacion atual</span></li>
            <p className=" ml-9">{EducacionActual}</p>
          </ul>
          </div>
        </div>


        <div className=" mt-28">
          <h3 className=" ml-5 text-2xl font-normal">Acerca de</h3>
          <div className=" w-[100%] ml-5 font-light">
            <p>Con una trayectoria marcada por la pasión por la innovación y el compromiso con el crecimiento personal y profesional, me presento como un individuo dedicado a desafiar los límites y explorar nuevos horizontes</p>
          </div>
          <div className="grid grid-cols-2 mt-10">
            <div className=" ml-5">
              <h3 className=" text-2xl font-normal">Experiencias de trabajo</h3>
              <ul className=" font-light">
                <li className=" mt-10">Enfermeria</li>
                <li className=" mt-1">Cuidado de niños</li>
                <li className=" mt-1">Cuidado de mascotas</li>
                <li className=" mt-1">Pintor</li>
                <li className=" my-1">Educacion basica</li>
              </ul>
            </div>
            <div className=" ml-5">
              <h3 className=" text-2xl font-normal">Estudios</h3>
                <ul className=" font-light">
                  <li className=" mt-10">Noveno grado</li>
                  <li className=" mt-1">Bachillerato</li>
                  <li className=" mt-1">Diplomado en salud</li>
                  <li className=" mt-1">Universidad</li>
                </ul>
            </div>
          </div>
        </div>

        <div className=" mr-2 mt-3 ml-4">
          <span class="material-symbols-outlined text-Blue text-5xl">
              child_friendly
          </span>
          <span class="material-symbols-outlined text-Blue text-5xl">
              fluid
          </span>
          <span class="material-symbols-outlined text-Blue text-5xl">
              pets
          </span>
          <span class="material-symbols-outlined text-Blue text-5xl">
              book_2
          </span>
          <span class="material-symbols-outlined text-Blue text-5xl">
              self_improvement
          </span>
        </div>
      </div>
    </main>
    </>
  )
}

export default StudentProfile;
import Perfiles from "../components/PerfilEstudiante";
import Navbar from "../components/Navbar";
import { data } from "../data/ProfileStudentData";
const {nivelesEducacion, lugaresEducacion, nombre, ciudad, municipio, contacto, email, EducacionActual} = data[0];

// Este es la paginación de Elias  

const StudentProfile = () => {
  return (
    <>
    {/* HEADER */}
    <header></header>


    {/* MAIN */}
    <main className=" mb-10">
      {/* FOTO DE PERFIL Y PORTADA */}

      <div className=" mt-2 mx-5 bg-portada-perfil bg-cover h-[250px]">
        <div className=" w-[200px] pt-[150px] ml-6 ">
        <img src="/foto-perfil.jpg" alt="" className=" rounded-full border-8"/>
        </div>
      </div>

      {/* INFORMACION */}
      
      <div className=" grid grid-cols-3">
        <div className=" mt-28">
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


        <div className=" mt-28 border-2 border-black">
          <h3 className=" ml-20 text-2xl font-bold">Acerca de</h3>
          <div className=" w-[100%]">
            <p>Con una trayectoria marcada por la pasión por la innovación y el compromiso con el crecimiento personal y profesional, me presento como un individuo dedicado a desafiar los límites y explorar nuevos horizontes</p>
          </div>
        </div>
        <div className="">3</div>
      </div>
    </main>
    </>
  )
}

export default StudentProfile;
import Perfiles from "../components/PerfilEstudiante";
import Navbar from "../components/Navbar";
import { data } from "../data/ProfileStudentData";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, doc, getDocs} from 'firebase/firestore';
import { db } from '../data/firebase';
import { UserAuth } from "../context/AuthContext";
import TrabajosUserAdmin from "../components/TrabajosUserAdmin";

const {nivelesEducacion, lugaresEducacion, nombre, ciudad, municipio, contacto, email, EducacionActual} = data[0];

// Este es la paginación de Elias  

const StudentProfile = () => {
  const [estudiante, setEstudiante] = useState([])
  const {user} = UserAuth();
  let student = []
  
  const fetchData = async () => {
    const studentsSnapshot = await getDocs(collection(db, 'estudiantes'));
    const estudiantes = studentsSnapshot.docs.map(doc => doc.data());
    student = estudiantes;
    student.map(perfil => {
      if (perfil.email === user.email) {
        setEstudiante(perfil)
      }
    })
    }
    const {trabajos} = estudiante
    console.log(trabajos)



  const validarCV = () => {
    let archivo = document.getElementById('archivo');
    let archivoRuta = archivo.value;
    let extPermitidas = /(.pdf)$/i;

    if (!extPermitidas.exec(archivoRuta)) {
      alert('Debes seleccionar un PDF ')
      archivo.value = '';
      return false
    }
  }

  useEffect(() => {
    fetchData()

    return () => {
      fetchData();
    }
  }, [])
  

  return (
    <>
    {/* HEADER */}
    <header>
      <Navbar/>
    </header>


    {/* MAIN */}
    <main className=" mb-10 mt-24">

      {/* FOTO DE PERFIL Y PORTADA */}
      <div className="realtive">

      <div className=" mt-2 mx-5 bg-portada-perfil bg-cover h-[250px]">
        <NavLink
            to="/"
            className="h-[50px] w-[80px] px-5 border-[1px]  border-transparent rounded-lg placeholder:text-white focus:outline-none mr-3 flex  text-white"
          >
            <button>
              <span class="material-symbols-outlined">
              arrow_back
              </span>
            </button>
          </NavLink>
      </div>

      <div className=" w-[200px]  h-[200px] ml-9 rounded-full overflow-hidden flex items-center absolute top-60 left-5 border-4">
        <img src={estudiante.imageUrl} alt="" className=" "/>
      </div>

      <div className="absolute right-6 pt-5">
        {
          trabajos && trabajos.map(trabajo => (
            <span class="material-symbols-outlined text-Dark-Blue text-5xl">
              {trabajo.icono}
            </span>
          ))
        }

        </div>
      </div>

      {/* INFORMACION */}
      <div className="flex justify-between px-5 w-[97%] mx-auto relative mt-[85px]"> 

        <div className="w-[20%] py-5">

            <h2 className="ml-5 text-3xl font-normal">{estudiante.nombre}</h2>
            <h1 className="ml-[26px] text-2xl font-normal">{estudiante.apellido}</h1>

          <div className=" mt-5 ">
          <span className=" ml-5 font-normal">Informacion personal</span>
          <ul className=" mt-5 ml-4">
            <li className="flex items-center">
              <span class="material-symbols-outlined">call</span>
              <span className=" ml-2 font-normal">Telefono fijo</span>
            </li>
            <p className=" ml-9 mb-3 font-light">{estudiante.telefono}</p>

            <li className="flex items-center">
              <span class="material-symbols-outlined">mail</span>
              <span className=" ml-2 font-normal">Email</span>
            </li>
              <p className=" ml-9 mb-3 font-light">{estudiante.email}</p>

            <li>
              <span class="material-symbols-outlined">apartment</span>
              <span className=" ml-2 font-normal">Educacion actual</span>
            </li>
              <p className=" ml-9 font-light">{estudiante.carrera}</p>
          </ul>
          </div>
        </div>


        <div className="w-[80%]">
          <h3 className=" ml-5 text-2xl font-normal">Acerca de</h3>
          <div className=" w-[100%] ml-5 font-light text-lg">
            <p>{estudiante.acercaDe}</p>
          </div>
          <div className="grid grid-cols-2 mt-10">
            <div className=" ml-5">
              <h3 className=" text-2xl font-normal">Experiencias en trabajos</h3>
              <ul className=" font-light space-y-1 pt-2 text-lg">
              {
                  trabajos && trabajos.map(trabajo => (
                  <li key={trabajo.id}>{trabajo.nombre}</li>
                ))
              }
              </ul>
            </div>
            <div className=" ml-5">
              <h3 className=" text-2xl font-normal">Curriculum</h3>
              <label className="font-light"> Suba aqui su Curriculum </label>
              <input type="file" id="archivo" className="px-1" onChange={validarCV}/>
            </div>
          </div>
        </div>

      </div>
    </main>
    </>
  )
}

export default StudentProfile;
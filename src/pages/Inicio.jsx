// Aqui trabajara kendall
import React, { useEffect, useState } from 'react';
import students from '../data/students'
import Ofertas from '../data/Ofertas';
import OfertaLaboral from '../components/OfertaLaboral';
import TarjetaPublicacion from '../components/TarjetaPublicacion';
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../data/firebase';
import { useNavigate } from 'react-router-dom';



const Inicio = () => {

  const {googleSingIn, user} = UserAuth();
  const result = /@ues\.edu\.sv$/.test(user.email);
  const navigate = useNavigate();
  let student = []




  useEffect(() => {
    const fetchData = async () => {
      const studentsSnapshot = await getDocs(collection(db, 'estudiantes')); // 'carreras' es el nombre de tu colección en Firestore
      const studentsData = studentsSnapshot.docs.map(doc => doc.data().email); // Suponiendo que tienes un campo 'nombre' en tus documentos de carrera
      student = studentsData;
      console.log(student);
      console.log(user.email)

      if(Object.keys(user).length !== 0 ){
        if(result){
          for(let i = 0; i<student.length; i++){
            console.log('for')
            if(student[i] !== user.email){
              console.log('validacion')
              navigate('/createAccountStd')
            }
          }
        }  
      }
  };

  fetchData();
  }, [user])
  
  
  //const result = /@ues\.edu\.sv$/.test(user.email);
  //const navigate = useNavigate(); si hay match con la coleccion

  const handleGoogleSingIn = async() => {
    try {
    await googleSingIn ()
    } catch (error) {
    console.log(error)
    }

  //   useEffect(() => {
  //     if(result){
  //         console.log('se inicio sesion estudiante')
  //         navigate("/createAccountStd")
  //     }
  // }, [user]) creo que esto no se usara
}

  return (
    <>  
      <header className='h-[405px] bg-Dark-Blue space-y-12 rounded-b-3xl relative'>
        <nav className='h-[105px] flex items-center justify-between px-8'>
          <div>
            <img src="/LOGO.svg" alt="" />
          </div>
          {/* publicar oferta y auth con google  */}
          <div className='flex gap-5'>
              <buttons className='text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] px-5 rounded-[8px]'> 
                Publicar Oferta 
                <span className="material-symbols-outlined">work</span>
                </buttons>

                {Object.keys(user).length === 0 ?
                  <button className='relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]' onClick={handleGoogleSingIn}>
                  Iniciar sesion con Google
                  <img src="/google 2.svg" alt="google-icon" className='bg-white py-[13px] px-[13px] rounded-lg' />
                  </button>  
              :
                  <button className='relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]'>
                    Cerrar Sesion
                  </button>
              }
          </div>
        </nav>
        <h1 className='text-white font-medium text-4xl w-[35%] relative left-[100px] text-center'>Te ayudamos a encontrar tu primer empleo</h1>
        
        {/* buscador */}
        <div className='flex px-10'>
          {/* inputs */}
          <div className='bg-Space-cadet h-[55px] rounded-[10px] w-[950px] flex items-center justify-between px-5 relative'>
                <input type="search" placeholder='Cargo o Puesto' className='bg-inherit placeholder:text-white placeholder:font-medium w-[400px]'/>
                <span className='h-[86%] border-[1px] border-white/50 ml-2'></span>
                <input type="search" placeholder='Municipio' className='bg-inherit placeholder:text-white placeholder:font-medium h-full w-[400px] pl-[15px]'/>
                <span className="material-symbols-outlined text-white w-[40px] h-[40px] bg-Malachite text-3xl flex items-center justify-center rounded-lg absolute right-2">search</span>
          </div>
        </div>

        <img src="/minerva_sola_white.png" alt="minerva" className='w-[180px] h-[230px] absolute top-24 right-8' />
      </header>

      <main className='h-auto justify-center pt-10 w-[95%] mx-auto grid grid-cols-2'>

        {/* perfiles de estudiantes  */}

        <section className='px-5 w-full'>
        {students.map((student) => (
          <TarjetaPublicacion listStudent={student} key={student.id}/>
        ))}

        </section>

        {/* ofertas laborales recientes */}

        <section className='px-5 w-full border-l-2'>

          {Ofertas.map((oferta) => (
            <OfertaLaboral listStudent={oferta} key={oferta.id}/>
          ))}


        </section>
        
      </main>
    </>
  )
}

export default Inicio;
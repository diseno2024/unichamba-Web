// Aqui trabajara kendall
import React, { useEffect, useState } from 'react';
import students from '../data/students'
import Ofertas from '../data/Ofertas';
import OfertaLaboral from '../components/OfertaLaboral';
import TarjetaPublicacion from '../components/TarjetaPublicacion';
import { UserAuth } from '../context/AuthContext';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../data/firebase';
import { NavLink, useNavigate } from 'react-router-dom';
//import Swal from "sweetalert2";



const Inicio = () => { 

  const {googleSingIn, user, googleSingOut} = UserAuth();
  //const result = /\..+@.*ues\.edu/gm.test(user.email); // expresion que valida si hay un punto y luego un @
  //const cuentaExterna = /@g(oogle)?mail\.com/gm.test(user.email); // expresion que valida si el dominio del correo es gmail
  //const estudiante = /@ues\.edu\.sv$/.test(user.email);
  const cuentaEmpleado = /\..+@.*ues\.edu/gm.test(user.email);
  const cuentaEstudiante = /^[a-zA-Z]{2}[0-9]{5}@.*ues\.edu/gm.test(user.email);
  const cuentaExterna = /@g(oogle)?mail\.com/gm.test(user.email);
  const navigate = useNavigate();
  //const cuentaIngeniero = 'ernesto.calderon@ues.edu.sv';
  let student = [];
  let administradores = [];
  let URLphoto = user.photoURL;
  const [permiso, setpermiso] = useState(false);
const [login, setLogin] = useState(false)

  const handleGoogleSingIn = async() => {
    try {
    await googleSingIn ()
    } catch (error) {
    console.log(error)
    }
}

const handleGoogleSingOut = async() => {
  try {
  await googleSingOut ();
  setLogin(false);
  } catch (error) {
  console.log(error)
  }
}


  const fetchData = async () => {
    const studentsSnapshot = await getDocs(collection(db, 'estudiantes'));
    const studentsData = studentsSnapshot.docs.map(doc => doc.data().email);
    student = studentsData; // emails de los estudiantes ya registrados 
    
    // administradores 
    const adminSnapshot = await getDocs(collection(db, 'administradores'));
    const admins = adminSnapshot.docs.map( doc => doc.data().correo)
    administradores = admins;
    if(Object.keys(user).length !== 0){
      setLogin(true);

      // if(user.email !== cuentaIngeniero){
      //     if(!cuentaExterna){
      //       if(administradores.includes(user.email)){
      //         setpermiso(true);
      //         navigate('/userAdmin')
      //       }else{
      //         if(!result){  
      //           // no es empleado de la use
      //             if(!administradores.includes(user.email)){
      //               // no es administrador 
      //               if(!student.includes(user.email)){
      //                 // no tiene cuenta registrada 
      //                       navigate('/createAccountStd')
      //               }
      //             } 
      //           }
      //       } 
      //     }
      // } else{
      //   setpermiso(true);
      //   navigate('/userAdmin')
      // }

      //validamos de primero si esta accediendo un administrador 
      if(administradores.includes(user.email)){
        setpermiso(true) // le damos permiso para vea el panel
      }else{
        if(!cuentaExterna){
          if(!student.includes(user.email)){
            // que vaya a crear cuenta 
            navigate('/createAccountStd')
          }
        }
      }
        
    }
};

  useEffect(() => {

  fetchData();

  return () => {
    fetchData();
  }
  
  }, [user])




  return (
    <>  
      <header className='h-[405px] bg-Dark-Blue space-y-12 rounded-b-3xl relative'>
        <nav className='h-[105px] flex items-center justify-between px-8'>
          <div>
            <img src="/LOGO.svg" alt="" />
          </div>
          {/* publicar oferta y auth con google  */}
          <div className='flex gap-5 items-center'>
            <NavLink to='/createOffer'>
                <button className='text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] px-5 rounded-[8px]'> 
                Publicar Oferta 
                <span className="material-symbols-outlined">work</span>
                </button>
            </NavLink>

                { !login ?
                  
                  <button className='relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]' onClick={handleGoogleSingIn}>
                  Iniciar sesion con Google
                  <img src="/google 2.svg" alt="google-icon" className='bg-white py-[13px] px-[13px] rounded-lg' />
                  </button>
                  : cuentaExterna ? // cuenta externa o cuenta empleado
                  // : result || cuentaExterna ?
                  <button className='relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]' onClick={handleGoogleSingOut}>
                    Cerrar Sesión
                  </button>
                  
                  :permiso ?
                    <div className='flex items-center gap-4'>
                      <button className='relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]' onClick={handleGoogleSingOut}>
                        Cerrar Sesión
                      </button>

                      <NavLink to='/userAdmin' className= 'flex items-center'>
                        <h1 className='text-white font-normal px-2 text-xl'>Admin</h1>6
                        <div className='h-[55px] w-[55px] rounded-full'>
                        {/* <span className="material-symbols-outlined text-white" style={{fontSize: '35px'}}>person</span> */}
                        <img src={URLphoto} alt="imagen-estudiante"  className='w-full h-full rounded-full'/> 
                        </div>
                      </NavLink>  
                      
                    </div>
                    
                      :
                    <div className='flex items-center gap-4'>
                        <button className='relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]' onClick={handleGoogleSingOut}>
                          Cerrar Sesión
                        </button>

                        <NavLink to='/studentProfile' className= 'flex items-center'>
                          {/* <h1 className='text-white font-normal px-2'></h1>6 */}
                          <div className='h-[55px] w-[55px] rounded-full'>
                          {/* <span className="material-symbols-outlined text-white" style={{fontSize: '35px'}}>person</span> */}
                          <img src={URLphoto} alt="imagen-estudiante"  className='w-full h-full rounded-full'/> 
                          </div>
                        </NavLink>  
                        
                      </div>
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

        <section className='px-5 w-full flex flex-col items-end'>
        {students.map((student) => (
          <TarjetaPublicacion listStudent={student} key={student.id}/>
        ))}
        <NavLink to='/studentsPublications' className='mt-14 h-14 w-52 bg-Malachite font-normal text-white rounded-lg flex justify-center items-center text-xl'>Ver más</NavLink>
        </section>

        {/* ofertas laborales recientes */}

        <section className='px-5 w-full border-l-2 flex flex-col items-end py-6'>

          {Ofertas.map((oferta) => (
            <OfertaLaboral listStudent={oferta} key={oferta.id}/>
          ))}
          <NavLink to='/OfferExploreStudent' className='mt-12 h-14 w-52 bg-Malachite font-normal text-white rounded-lg flex justify-center items-center text-xl'>Ver más</NavLink>

        </section>
        
      </main>
    </>
  )
}

export default Inicio;
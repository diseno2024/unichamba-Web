import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import { NavLink, useNavigate } from "react-router-dom";

// lado de los estudiantes 
import { Slice } from "../components/Slice";
import { cardsEstudiantes } from '../data/dataSlices'

// lado de las ofertas de empelo 
import { cardsOfertas } from '../data/dataSliceOferta'
import { SliceOferta } from "../components/SliceOferta";


const Inicio = () => {

  const { googleSingIn, user, googleSingOut } = UserAuth();
  const result = /\..+@.*ues\.edu/gm.test(user.email); // expresion que valida si hay un punto y luego un @
  const cuentaExterna = /@g(oogle)?mail\.com/gm.test(user.email); // expresion que valida si el dominio del correo es gmail
  const emailIng = "ernesto.calderon@ues.edu.sv";
  const cuentaUes = /^[a-zA-Z0-9]{7}@ues\.edu/gm.test(user.email);
  const navigate = useNavigate();
  let student = [];
  let administradores = [];
  let URLphoto = user.photoURL;
  const [permiso, setpermiso] = useState(false);
  const [permisoIng, setpermisoIng] = useState(false);
  const [login, setLogin] = useState(false);
  const [dataStd, setdataStd] = useState([]);
  const [nombres, setnombres] = useState([]);
  

  //  inicio de sesion
  const handleGoogleSingIn = async () => {
    try {
      await googleSingIn();
    } catch (error) {
      console.log(error);
    }
  };

  //  cierre de sesion
  const handleGoogleSingOut = async () => {
    setLogin(false);
    try {
      await googleSingOut();
      // setLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    const studentsSnapshot = await getDocs(collection(db, "estudiantes"));
    const studentsData = studentsSnapshot.docs.map((doc) => doc.data().email);
    const estudiantes = studentsSnapshot.docs.map((doc) => ({...doc.data(), id: doc.id}));
    setdataStd(estudiantes);
    // spread de la data
    student = studentsData; // emails de los estudiantes ya registrados

    estudiantes.filter( perfil => {
      if(perfil.email === user.email){
        setnombres(perfil)
      }
    })

    // administradores
    const adminSnapshot = await getDocs(collection(db, "administradores"));
    const admins = adminSnapshot.docs.map((doc) => doc.data().correo);
    administradores = admins;
    if (Object.keys(user).length !== 0) {
      setLogin(true);

      if (!cuentaExterna) {
        if (administradores.includes(user.email)) {
          setpermiso(true);
          if (administradores.includes(emailIng)) {
            setpermisoIng(true);
          }
        } else {
          if (!result) {
            // no es empleado de la use
            if (!administradores.includes(user.email)) {
              // no es administrador
              if (!student.includes(user.email)) {
                // no tiene cuenta registrada
                navigate("/createAccountStd");
              }
            }
          }
        }
      }
      //}
    }
  };

  useEffect(() => {
    fetchData();

    return () => {
      fetchData();
    };
  }, [user]);

  // carrusel 

  const [currentIndex, setCurrentIndex] = useState(0);// cambio por id de la tarjeta 
  const [isFading, setIsFading] = useState(false); // estado para manejar la transicion 


  const goToNext = () => {
    setIsFading(true); // Inicia la transición

    // para estudiantes
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsEstudiantes.length);
      setIsFading(false);
    }, 500); // duracion de la transicion de 0.5 seg

    // para ofertas 
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % cardsOfertas.length);
      setIsFading(false);
    }, 500); // duracion de la transicion de 0.5 seg

  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      goToNext();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
    <header className="h-[405px] bg-Dark-Blue rounded-b-2xl relative">
      <nav className="w-full flex items-center justify-between px-3 py-5 md:px-5">

        <figure className="phone:w-40 md:w-64">
          <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
        </figure>

        {/* menu de hamburgesa para movil  */}
        <input type="checkbox" id="menu" className="peer hidden"/>
        <label htmlFor="menu" className="bg-open-menu text-transparent bg-no-repeat w-7 h-7 bg-center bg-cover cursor-pointer peer-checked:bg-close-menu transition-all z-50 phone:block lg:hidden">activa</label>

        {/* menu hamburgesa en movil */}

        <div className="z-40 bg-gradient-to-b from-Dark-Blue  to-[#19376D] fixed inset-0 translate-x-full peer-checked:translate-x-0 transition-transform lg:hidden">

        {/* logica */}
        {
              !login

              ?
              //no logeado
              <div className=" mt-20 flex flex-col h-screen items-center py-5">
                <button
                className="text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]"
                onClick={handleGoogleSingIn}
              >
                Iniciar sesion con Google
                <img
                  src="/google 2.svg"
                  alt="google-icon"
                  className="bg-white py-[13px] px-[13px] rounded-lg"
                />
              </button>
              <figure className="absolute bottom-5">
                    <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
                  </figure>
              </div>
             

              : login && cuentaUes ?
              // logueado y cuenta estudiante
              <div className="flex flex-col items-center gap-4 w-[90%] mx-auto py-5 mt-20">


                <NavLink to="/studentProfile" className="flex flex-col items-center space-y-5 w-full">

                  <div className="h-[150px] w-[150px] rounded-full ">
                    <img
                      src={nombres.thumbUrl}
                      alt="imagen-estudiante"
                      className="w-full h-full rounded-full"
                      style={{objectFit:"cover"}}
                    />
                  </div>
                  <h1 className="text-3xl font-normal text-white mr-3">
                    {nombres.nombre}
                  </h1>
  
                </NavLink>
                
                <button
                  className="text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px] mt-5"
                  onClick={handleGoogleSingOut}
                >
                  Cerrar Sesión
                </button>

                <figure className="absolute bottom-5">
                    <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
                </figure>

              </div>

              : login && permiso ?
              // logueado y cuenta administrador 
              <div className="w-[90%] mx-auto mt-14 h-screen flex flex-col items-center space-y-10 pt-20">

                <NavLink to="/userAdmin" className="space-y-5">
                  <div className="h-[55px] w-[55px] rounded-full">
                    <img
                      src={URLphoto}
                      alt="imagen-admin"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                  <h1 className="text-2xl font-normal text-white mr-3">
                    Admin
                  </h1>
                </NavLink>

                <button
                  className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]"
                  onClick={handleGoogleSingOut}
                >
                  Cerrar Sesión
                </button>

                <figure className="absolute bottom-5">
                    <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
                </figure>

              </div>

              : login && result && !permisoIng ?
              // logueado con cuenta empleado
              <di className="w-[90%] mx-auto flex flex-col items-center space-y-5 mt-10 pt-20 h-screen">
                <NavLink to='/createOffer' className='bg-Malachite text-white h-[55px] px-10 flex items-center rounded-[8px] space-x-2 font-semibold'>
                  <h2>Publicar oferta</h2>
                  <span className="material-symbols-outlined">work</span>
                </NavLink>

                <button
                    className="bg-Malachite text-white h-[55px] px-[60px] flex items-center rounded-[8px] font-semibold"
                    onClick={handleGoogleSingOut}
                >
                  Cerrar Sesión
                </button>

                <figure className="absolute bottom-5">
                  <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
                </figure>
              </di>
              : cuentaExterna ?

              <div className="w-[90%] mx-auto flex justify-center h-screen items-center">
                <button
                    className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]"
                    onClick={handleGoogleSingOut}
                  >
                    Cerrar Sesión
                </button> 

                <figure className="absolute bottom-5">
                    <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
                </figure>
              </div>


              :

              <div className="w-[90%] mx-auto mt-20 flex flex-col h-screen items-center py-5">
                <button
                className="text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]"
                onClick={handleGoogleSingIn}
              >
                Iniciar sesion con Google
                <img
                  src="/google 2.svg"
                  alt="google-icon"
                  className="bg-white py-[13px] px-[13px] rounded-lg"
                />
              </button>
              <figure className="absolute bottom-5">
                    <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
                  </figure>
              </div>
            }

        </div>

        {/* desktop */}
        <div className="flex gap-5 items-center phone:hidden lg:block">

            {
              !login  
                
              ?

              <button
                className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]"
                onClick={handleGoogleSingIn}
              >
                Iniciar sesion con Google
                <img
                  src="/google 2.svg"
                  alt="google-icon"
                  className="bg-white py-[13px] px-[13px] rounded-lg"
                />
              </button>

              : login && cuentaUes ?

              <div className="flex items-center gap-4">
                <button
                  className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]"
                  onClick={handleGoogleSingOut}
                >
                  Cerrar Sesión
                </button>

                <NavLink to="/studentProfile" className="flex items-center">
                  <h1 className="text-2xl font-normal text-white mr-3">
                    {nombres.nombre}
                  </h1>
                  <div className="h-[55px] w-[55px] rounded-full">
                    <img
                      src={nombres.thumbUrl}
                      alt="imagen-estudiante"
                      className="w-full h-full rounded-full"
                      style={{objectFit:"cover"}}
                    /></div>
                </NavLink>
              </div>

              : login && permiso ?

              <div className="flex items-center gap-4">
                <button
                  className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]"
                  onClick={handleGoogleSingOut}
                >
                  Cerrar Sesión
                </button>

                <NavLink to="/userAdmin" className="flex items-center">
                  <h1 className="text-2xl font-normal text-white mr-3">
                    Admin
                  </h1>
                  <div className="h-[55px] w-[55px] rounded-full">
                    <img
                      src={URLphoto}
                      alt="imagen-estudiante"
                      className="w-full h-full rounded-full"
                    />
                  </div>
                </NavLink>
              </div>

              : login && result && !permisoIng ? 
              
              <div className="flex space-x-3">
                <NavLink to='/createOffer' className='bg-Malachite text-white h-[55px] px-10 flex items-center rounded-[8px] space-x-2 font-semibold'>
                  <h2>Publicar oferta</h2>
                  <span className="material-symbols-outlined">work</span>
                </NavLink>

                <div className="flex items-center gap-4">
                  <button
                    className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]"
                    onClick={handleGoogleSingOut}
                  >
                    Cerrar Sesión
                  </button>
                </div>
              </div>

              : cuentaExterna ?

              <button
                    className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between px-4 rounded-[8px]"
                    onClick={handleGoogleSingOut}
                  >
                    Cerrar Sesión
              </button>

              

              :

              <button
                className="relative text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] justify-between pl-3 pr-[2px] rounded-[8px]"
                onClick={handleGoogleSingIn}
              >
                Iniciar sesion con Google
                <img
                  src="/google 2.svg"
                  alt="google-icon"
                  className="bg-white py-[13px] px-[13px] rounded-lg"
                />
              </button>
            }
          </div>


        
      </nav>
      <h1 className="text-white font-medium text-4xl md:w-[60%] md:left-[40px] relative text-center md:top-20 phone:top-10 phone:px-4">
          Te ayudamos a encontrar tu primer empleo
      </h1>
      <img
          src="/minerva_sola_white.png"
          alt="minerva"
          className="phone:w-[80px] phone:h-[120px] md:w-[140px] md:h-[190px] absolute md:top-32 md:right-10 lg:right-20 phone:bottom-5 phone:right-8"
        />
    </header> 
    <main className="grid md:grid-cols-2 grid-cols-1 my-5 mx-auto md:gap-8 relative items-center justify-center w-[95%]">

        <NavLink to="/studentsPublications">

        <h3 className="text-center text-3xl font-semibold my-3">Estudiantes</h3>

          <section className="overflow-hidden">

            <div className="flex whitespace-nowrap h-[355px] rounded-md">
                <Slice card={cardsEstudiantes[currentIndex]} fading={isFading}/>
            </div>

          </section>

        </NavLink>

        <NavLink to="/OfferExploreStudent">

        <h3 className="text-center text-3xl font-semibold    my-3">Ofertas laborales</h3>

          <section className="overflow-hidden">
            <div className="flex whitespace-nowrap h-[355px] rounded-md">
              <SliceOferta card={cardsOfertas[currentIndex]} fading={isFading} />
            </div>

          </section>
        </NavLink>
        
    </main>

    <div className="justify-between w-[95%] mx-auto mt-5 font-semibold text-white my-5 phone:hidden lg:flex">

      <NavLink to="/studentsPublications" className="pl-4">
        <button className="bg-Malachite px-10 py-3 rounded-md">Ver Estudiantes</button>
      </NavLink>

      <NavLink to="/OfferExploreStudent" className="">
        <button className="bg-Malachite px-10 py-3 rounded-md">Ver Ofertas</button>
      </NavLink>

    </div>

    <footer className="w-full h-[425px] bg-Dark-Blue space-y-5 py-5 ">
        <div className="w-[95%] mx-auto h-max flex flex-col items-center text-white font-normal text-xl space-y-5">
          <h2>Descarga nuestra app en tu celular!</h2>
          <img
            src="/google-play.cf5ae74d.svg"
            alt="logo-google-play"
            className="w-[150px] cursor-pointer"
          />
          <h2 className="text-white font-normal text-xl">
            copyright© 2024 Unichamba
          </h2>
          <div className="w-full flex justify-center">
            <a href="https://website-unichamba.netlify.app/policy"
            >
              Términos y Condiciones
            </a>
            <span className="px-3"> - </span>
            <a
              className="cursor-pointer"
            >
              Política de Privacidad
            </a>
          </div>
          <h3 className="text-white font-normal text-xl">
            Universidad Nacional de El Salvador
          </h3>
        </div>

        <div className="w-[95%] h-max mx-auto flex items-center justify-center ">
          <img
            src="/minerva_sola_white.png"
            alt=""
            className="w-[100px] h-[130px]"
          />
        </div>
      </footer> 

    </>
  );
};

export default Inicio;

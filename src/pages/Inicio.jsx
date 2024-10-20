import React, { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Carrusel } from "../components/Carrusel";
import { cardsEstudiantes } from '../data/dataSlices'
import { cardsOfertas } from '../data/dataSliceOferta'
import { useFetch } from "../hooks/useFetch";


const Inicio = () => {

  const { googleSingIn, user, googleSingOut } = UserAuth();
  const result = /\..+@.*ues\.edu/gm.test(user.email); // expresion que valida si hay un punto y luego un @
  const cuentaExterna = /@g(oogle)?mail\.com/gm.test(user.email); // expresion que valida si el dominio del correo es gmail
  const emailIng = "ernesto.calderon@ues.edu.sv";
  const cuentaUes = /^[a-zA-Z0-9]{7}@ues\.edu/gm.test(user.email);
  const navigate = useNavigate();
  let studentEmail = [];
  let adminisEmail = [];
  let URLphoto = user.photoURL;
  const [permiso, setpermiso] = useState(false);
  const [permisoIng, setpermisoIng] = useState(false);
  const [login, setLogin] = useState(false);
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
      setnombres([]);
      // setLogin(false);
    } catch (error) {
      console.log(error);
    }
  };

  const {estudiantes} = useFetch("unichamba-estudiantes");
  const {admins} = useFetch("unichamba-administradores");

  studentEmail = estudiantes.map( estudiante => {
    return estudiante.doc.email;
  })

  adminisEmail = admins.map( (admin) => {
    return admin.doc.email;
  })

  useEffect(() => {
    if (Object.keys(user).length !== 0) {
      setLogin(true);
      if(!cuentaExterna){ // no gmail
        if(!result){ // no cuenta empleado 
          if( studentEmail.includes(user.email) ){ // si se encuentra una cuenta 
            estudiantes.filter( estudiante => {
              if(estudiante.doc.email === user.email){
                setnombres(estudiante.doc);
              }
            })
          }else if(adminisEmail.includes(user.email)){ // si no tiene cuenta posiblemente sea un administrador
            setpermiso(true);
            if(adminisEmail.includes(emailIng)){
              setpermisoIng(true);
            }
          }else{ // no tiene una cuenta  
            navigate("/createAccountStd");
          }
        }
      }
    }
  }, [user]);

  return (
    <>
    <header className="h-[370px] bg-Dark-Blue rounded-b-2xl relative">
      <nav className="w-full flex items-center justify-between px-3 py-5 md:px-5">

        <figure className="phone:w-40 md:w-64">
          <img src="/LOGO.svg" alt="logo" className="w-full h-full"/>
        </figure>

        {/* menu de hamburgesa para movil  */}
        <input type="checkbox" id="menu" className="peer hidden"/>
        <label htmlFor="menu" className="bg-open-menu text-transparent bg-no-repeat w-8 h-7 bg-center bg-cover cursor-pointer peer-checked:bg-close-menu transition-all z-50 phone:block lg:hidden">activa</label>

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
                      src={nombres.imageUrl}
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
                      src={nombres.imageUrl}
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
      <h1 className="text-white font-medium w-[90%] mx-auto md:mx-0 text-3xl md:text-4xl md:w-[60%] md:left-[40px] relative text-center md:top-20 phone:top-10 phone:px-4">
          Te ayudamos a encontrar tu primer empleo
      </h1>
      <img
          src="/minerva_sola_white.png"
          alt="minerva"
          className="phone:w-[80px] phone:h-[120px] md:w-[140px] md:h-[190px] absolute md:top-32 md:right-10 lg:right-20 phone:bottom-8 phone:right-8"
        />
    </header> 
    <main className="grid xl:grid-cols-2 my-5 mx-auto md:gap-8 relative items-center justify-center w-[95%] pb-5">

        <NavLink to="/studentsPublications">

        <h3 className="text-center text-3xl font-semibold my-3">Estudiantes</h3>

          <section className="overflow-hidden"> 

          <Carrusel data={cardsEstudiantes}/> 

          </section>

        </NavLink>

        <NavLink to="/OfferExploreStudent">

        <h3 className="text-center text-3xl font-semibold    my-3">Ofertas laborales</h3>

          <section className="overflow-hidden">
            <Carrusel data={cardsOfertas}/> 
          </section>

        </NavLink>
        
    </main>

    <div className="justify-between w-[95%] mx-auto mt-5 font-semibold text-white my-5 phone:hidden xl:flex">

      <NavLink to="/studentsPublications" className="pl-4">
        <button className="bg-Malachite px-10 py-3 rounded-md">Ver Estudiantes</button>
      </NavLink>

      <NavLink to="/OfferExploreStudent" className="">
        <button className="bg-Malachite px-10 py-3 rounded-md">Ver Ofertas</button>
      </NavLink>

    </div>

    <footer className="w-full h-max bg-Dark-Blue space-y-5 py-7 ">
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
          <div className="w-full flex justify-center text-center">
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

import React, { useEffect, useState } from "react";
import OfertaLaboral from "../components/OfertaLaboral";
import TarjetaPublicacion from "../components/TarjetaPublicacion";
import { UserAuth } from "../context/AuthContext";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../data/firebase";
import { NavLink, useNavigate } from "react-router-dom";

//import Swal from "sweetalert2";

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

  return (
    <>
      <header className="h-[405px] bg-Dark-Blue space-y-12 rounded-b-3xl relative">
        <nav className="h-[105px] flex items-center justify-between px-8">
          <div>
            <img src="/LOGO.svg" alt="" />
          </div>
          {/* publicar oferta y auth con google  */}
          <div className="flex gap-5 items-center">

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
        <h1 className="text-white font-medium text-4xl w-[45%] relative left-[150px] text-center top-16">
          Te ayudamos a encontrar tu primer empleo
        </h1>

        <img
          src="/minerva_sola_white.png"
          alt="minerva"
          className="w-[180px] h-[230px] absolute top-24 right-8"
        />
      </header>

      <main className="h-auto pt-10 w-[95%] mx-auto flex">
        {/* perfiles de estudiantes  */}

        <section className="px-5 w-full flex flex-col pb-8">
          {dataStd.map((student) => (
            <TarjetaPublicacion listStudent={student} key={student.email} />
          ))}
          <NavLink
            to="/studentsPublications"
            className="mt-14 h-14 w-52 bg-Malachite font-normal text-white rounded-lg flex justify-center items-center text-xl"
          >
            Ver más
          </NavLink>
        </section>

        {/* ofertas laborales recientes */}
        <span className=" border-[1px] border-black/30 w-[1px] h-auto"></span>

        <section className="px-5 w-full flex flex-col pb-8">
          <OfertaLaboral carrerasSeleccionadas={[]} />
          <div className="flex justify-end">
            {/* <OfertaLaboral carreraSeleccionada={null}/>Ahora se necesita el prop carreraSeleccionada */}
            <NavLink
              to="/OfferExploreStudent"
              className="mt-12 h-14 w-52 bg-Malachite font-normal text-white rounded-lg flex justify-center items-center text-xl"
            >
              Ver más
            </NavLink>
          </div>
        </section>
      </main>

      <footer className="w-full h-[425px] bg-Dark-Blue space-y-5 py-3 ">
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
            <p className="cursor-pointer">Términos y Condiciones</p>
            <span className="px-3"> - </span>
            <a
              className="cursor-pointer"
              href="https://website-unichamba.netlify.app/policy"
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

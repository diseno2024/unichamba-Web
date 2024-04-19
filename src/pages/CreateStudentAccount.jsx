import React from "react";
import NavGeneral from "../components/NavGeneral";
import CarreraFiltro from '../components/CarreraFiltro'
import AreaTrabajo from '../components/AreaTrabajo'


const CreateStudentAccount = () => {

  const onSubmit = () => {
    window.location.href = '/inicio'
}

  return (
    <>
      <header className="bg-Blanco-cremoso">
        <NavGeneral></NavGeneral>

        <br />
        <br />
        <br />
      </header>
      <main className="bg-Blanco-cremoso h-screen">
        <div className="bg-Blanco-cremoso pl-5">
          <div
            className="flex justify-between items-center"
            style={{ color: "#424769" }}
          >
            <p className="font-bold font-sans text-2xl ml-4 ">
              Crea tu cuenta y encuentra el empleo que estas buscando
            </p>
          </div>
          <form>
            <div className="flex ml-10">
              <div>
                <br />
                <br></br>
                <label htmlFor="nombreInput" className="mt-7 font-normal">
                  Nombre(s)*
                </label>
                <br></br>

                <input
                  type="text"
                  id="nombreInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="nombre"
                  required
                  pattern="^[a-zA-Z]+\s[a-zA-Z]+$"
                  title="Por favor introduce entre 5 y 30 dígitos."
                />
                <br></br>
                <br></br>
                <label htmlFor="telefonoInput" className=" font-normal">Telefono celular *</label>
                <br></br>

                <input
                  type="text"
                  id="telefonoInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="telefono"
                  required
                  pattern="[0-9]{8}"
                  title="Por favor, introduce exactamente 8 números."
                />
                <br />
                <br></br>
                <label htmlFor="carreraInput" className=" font-normal">Carrera</label>
                <br />
                <br />

                <div className='relative'>
                  <CarreraFiltro />
                </div>

                <br></br>
                <br />
                <label htmlFor="trabajoInput" className=" font-normal">Trabajos</label>
                <br></br>
                <br />
                <div className='relative'>
                  <AreaTrabajo />
                </div>

                <br></br>
                <br />

                <br></br>
              </div>

              <div className="ml-9">
                <br />
                <br></br>
                <label htmlFor="apellidoInput" className=" font-normal">Apellido(s)*</label>

                <br></br>
                <input
                  type="text"
                  id="apellidoInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="apellido"
                  required
                  pattern="^[a-zA-Z]+\s[a-zA-Z]+$"
                  title="Por favor introduce entre 5 y 30 dígitos."
                />
                <br></br>
                <br></br>
                <label htmlFor="whatsappInput" className=" font-normal">WhatsApp *</label>
                <br></br>

                <input
                  type="number"
                  id="whatsappInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="email"
                  required
                />
                <br></br>
                <br></br>

                <label htmlFor="fechaInput"className=" font-normal">Fecha de Nacimiento</label>
                <br></br>

                <input
                  type="date"
                  id="fechaInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="repetirContraseña"
                  required
                />
              </div>
              <div className="pl-[80px]">
                <img src="./public/Computer login-rafiki 1.png" alt="" />
              </div>
            </div>

            <div className="flex ml-10 bg-Blanco-cremoso ">
              <div>
                {" "}
                <label htmlFor="aptitudInput " className=" font-normal">Acerca de</label>
                <br />
                <br></br>
                <textarea
                  placeholder="Puedes hablar acerca de tus conocimientos o sobre tus aptitudes                                         0-500"
                  name=""
                  id=""
                  cols="79"
                  rows="4"
                  className="border border-black rounded-lg resize-none p-3 bg-Blanco-cremoso "
                ></textarea>
              </div>
              <div className="justify-end ml-auto">
                <br />
                
                <div className="flex justify-end mr-40">
                  <h6 className="text-sm text-gray-500 mt-3 font-normal">
                    Campos obligatorios *
                  </h6>
                </div>
                
                <div className="flex justify-end mr-16">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="mt-3 checked:bg-Blanco-cremoso"
                    required
                  />
                  <h6 className="text-sm text-gray-500 mt-3 ml-3 font-normal">
                    Acepto los terminos y condiciones de unichamba
                  </h6>
                </div>
                <br />
                <button className="bg-Azul-Crepúsculo text-white px-4 py-4 rounded-lg w-80 mr-11" onClick={onSubmit}>
                  Crear cuenta estudiante
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateStudentAccount;

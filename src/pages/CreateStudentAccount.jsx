import React, { useState } from "react";
import NavGeneral from "../components/NavGeneral";
import { Component, Fragment } from "react";
import OrdenarCarreras from "../components/ordenCarreras";
import { db } from "../data/firebase";
import {
  collection,
  getFirestore,
  addDoc,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import Select from "react-select";
import makeAnimated from "react-select/animated";

const options = [
  { value: "uno", label: "Encuestador Campo" },
  { value: "dos", label: "Trabajador de limpieza por horas" },
  { value: "tres", label: "Promotor de productos en supermercados o tiendas" },
  { value: "cuatro", label: "Traductor independiente" },
  { value: "cinco", label: "Vendedor ambulante de productos diversos" },
  { value: "seis", label: "Trabajador de eventos (montaje y desmontaje)" },
  { value: "siete", label: "Trabajo en agricultura temporal (cosecha)" },
  { value: "ocho", label: "Servicio de lavado de autos a domicilio" },
  { value: "nueve", label: "Trabajador de entrega de paquetes" },
  { value: "diez", label: "Cuidar Enfermos" },
  { value: "once", label: "Pasear perros" },
  { value: "doce", label: "Electricista" },
  { value: "trece", label: "Supervisor" },
  { value: "catorce", label: "Pintor" },
  { value: "quince", label: "Albañil" },
];

const animatedComponents = makeAnimated();

const CreateStudentAccount = () => {
  const initialStateValues = {
    nombre: "",
    telefono: "",
    carrera: "",
    trabajos: [],
    apellido: "",
    whatsapp: "",
    fechaNacimiento: "",
    acercaDe: "",
  };
  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    addOrEditLink(values);
  };

  const handleTrabajosChange = (selectedOptions) => {
    const trabajos = selectedOptions.map((option) => option.label);
    setValues({ ...values, trabajos: trabajos });
  };

  const addOrEditLink = async (linkObject) => {
    try {
      await addDoc(collection(db, "estudiantes"), {
        ...values,
      });
    } catch (error) {
      console.log(error);
    }
    setValues({ ...initialStateValues });
    alert("nueva tarea agregada");
  };

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
          <form onSubmit={handleSubmit}>
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
                  pattern="^[a-zA-Z]+\s[a-zA-Z]+$"
                  title="Por favor introduce entre 5 y 30 dígitos."
                  onChange={handleInputChange}
                />
                <br></br>
                <br></br>
                <label htmlFor="telefonoInput" className=" font-normal">
                  Telefono celular *
                </label>
                <br></br>

                <input
                  type="text"
                  id="telefonoInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="telefono"
                  pattern="[0-9]{8}"
                  title="Por favor, introduce exactamente 8 números."
                  onChange={handleInputChange}
                />
                <br />
                <br></br>
                <label htmlFor="carreraInput" className=" font-normal">
                  Carrera
                </label>
                <br />
                <OrdenarCarreras></OrdenarCarreras>

                <br></br>
                <br />
                <label htmlFor="trabajoInput" className=" font-normal">
                  Trabajos
                </label>
                <br></br>

                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  onChange={handleTrabajosChange}
                  isMulti
                  options={options}
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                />

                <br></br>
                <br />

                <br></br>
              </div>

              <div className="ml-9">
                <br />
                <br></br>
                <label htmlFor="apellidoInput" className=" font-normal">
                  Apellido(s)*
                </label>

                <br></br>
                <input
                  type="text"
                  id="apellidoInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="apellido"
                  pattern="^[a-zA-Z]+\s[a-zA-Z]+$"
                  title="Por favor introduce entre 5 y 30 dígitos."
                  onChange={handleInputChange}
                />
                <br></br>
                <br></br>
                <label htmlFor="whatsappInput" className=" font-normal">
                  WhatsApp *
                </label>
                <br></br>

                <input
                  type="number"
                  id="whatsappInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="whatsapp"
                  onChange={handleInputChange}
                />
                <br></br>
                <br></br>

                <label htmlFor="fechaInput" className=" font-normal">
                  Fecha de Nacimiento
                </label>
                <br></br>

                <input
                  type="date"
                  id="fechaInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="fechaNacimiento"
                  onChange={handleInputChange}
                />
              </div>
              <div className="pl-[80px]">
                <img src="./public/Computer login-rafiki 1.png" alt="" />
              </div>
            </div>

            <div className="flex ml-10 bg-Blanco-cremoso ">
              <div>
                {" "}
                <label htmlFor="aptitudInput " className=" font-normal">
                  Acerca de
                </label>
                <br />
                <br></br>
                <textarea
                  placeholder="Puedes hablar acerca de tus conocimientos o sobre tus aptitudes                                         0-500"
                  name="acercaDe"
                  id=""
                  onChange={handleInputChange}
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
                  />
                  <h6 className="text-sm text-gray-500 mt-3 ml-3 font-normal">
                    Acepto los terminos y condiciones de unichamba
                  </h6>
                </div>
                <br />
                <button className="bg-Dark-Blue text-white px-4 py-4 rounded-lg w-80 mr-11 font-normal">
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
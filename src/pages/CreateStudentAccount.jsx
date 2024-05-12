import React, { useState } from "react";
import NavGeneral from "../components/NavGeneral";
import OrdenarCarreras from "../components/ordenCarreras";
import { db } from "../data/firebase";
import { collection, addDoc } from "firebase/firestore";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import { UserAuth } from "../context/AuthContext";
const options = [
  { value: "uno", label: "Panaderia" },
  { value: "dos", label: "Musico" },
  { value: "tres", label: "Asistente contable" },
  { value: "cuatro", label: "Atencion al cliente" },
  { value: "cinco", label: "Cajero" },
  { value: "seis", label: "Secretaria" },
  { value: "siete", label: "Mesero" },
  { value: "ocho", label: "Recepcionista" },
  { value: "nueve", label: "Vendedor de farmacia" },
  { value: "diez", label: "Comerciante" },
  { value: "once", label: "Albañileria" },
  { value: "doce", label: "Cortar cafe" },
  { value: "trece", label: "Pasteleria" },
  { value: "catorce", label: "Cosmetologia" },
  { value: "quince", label: "Sublimacion de tazas" },
  { value: "dieciseis", label: "limpieza" },
  { value: "diecisiete", label: "Carpintero" },
  { value: "dieciocho", label: "Primeros Auxilios" },
  { value: "diecinueve", label: "Agricultura" },
  { value: "veinte", label: "Mantenimiento electrico" },
  { value: "veinteuno", label: "Manicura" },
  { value: "veintedos", label: "Gestion Administrativa" },
  { value: "veintetres", label: "Pintor de casas" },
  { value: "veintecuatro", label: "Manejo de inventario" },
  { value: "veintecinco", label: "Florista" },
  { value: "veinteseis", label: "Emprendimiento" },
  { value: "veintesiete", label: "Mantenimiento de computadoras" },
  { value: "veinteocho", label: "Cocina" },
  { value: "veintenueve", label: "Bisuteria" },
];

const animatedComponents = makeAnimated();

const CreateStudentAccount = () => {
  const { user } = UserAuth();
  const correoElectronico = user.email;
  const fechaRegistro = new Date().toISOString().split("T")[0];

  const initialStateValues = {
    nombre: "",
    telefono: "",
    carrera: "",
    trabajos: [],
    apellido: "",
    whatsapp: "",
    fechaNacimiento: "",
    acercaDe: "",
    email: correoElectronico,
    fecRegistro: fechaRegistro,
  };

  const isValidDate = (dateString) => {
    // Convertir la cadena de fecha a objeto Date
    const selectedDate = new Date(dateString);
    // Obtener la fecha actual
    const today = new Date();
    // Calcular la diferencia de tiempo entre las fechas
    const diffTime = Math.abs(today - selectedDate);
    // Calcular la diferencia de años
    const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365));
    // La persona debe tener al menos 18 años
    return diffYears >= 18;
  };
  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "fechaNacimiento") {
      if (!isValidDate(value)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Necesitas ser mayor de edad para crear una cuenta, por favor ingresa una fecha correcta",
        });
        return;
      }
    }
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values); // values
    addOrEditLink(values);
  };

  const handleTrabajosChange = (selectedOptions) => {
    const trabajos = selectedOptions.map((option) => option.label);
    setValues({ ...values, trabajos: trabajos });
  };

  const handleCarreraChange = (carrera) => {
    setValues({ ...values, carrera: carrera });
  };

  const addOrEditLink = async (linkObject) => {
    try {
      await addDoc(collection(db, "estudiantes"), {
        ...values,
      });
      Swal.fire({
        icon: "success",
        title: "Registro con éxito",
        text: "¡Estudiante registrado con éxito!",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "/";
        }
      });
      setValues(initialStateValues);

      // Redirigir a otra página después de mostrar la alerta
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <header>
        <NavGeneral></NavGeneral>
      </header>
      <main className=" h-screen my-10">
        <div className="bg-Blanco-cremoso pl-5 pb-10">
          <div
            className="flex justify-between items-center"
            style={{ color: "#424769" }}
          >
            <p className="font-bold font-sans text-2xl ml-4 ">
              Crea tu cuenta y encuentra el empleo que estas buscando
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex ml-10 relative">
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
                  className="rounded-lg border border-black p-3 w-80 mt-4 font-normal"
                  name="nombre"
                  
                  pattern="^[A-Za-záéíóúÁÉÍÓÚ]+\s[A-Za-záéíóúÁÉÍÓÚ]+$"
                  title="Por favor introduce tus nombres adecuadamente"
                  onChange={handleInputChange}
                  required
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
                  className="rounded-lg border border-black p-3 w-80 mt-4 font-normal"
                  name="telefono"
                  pattern="[0-9]{8}"
                  title="Por favor, introduce exactamente 8 números."
                  onChange={handleInputChange}
                  required
                />
                <br />
                <br></br>
                <label htmlFor="carreraInput" className=" font-normal">
                  Carrera
                </label>
                <br />
                <OrdenarCarreras
                  onSelect={handleCarreraChange}
                ></OrdenarCarreras>
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
                  className="rounded-lg border border-black p-3 w-80 mt-4 font-normal"
                  name="apellido"
                  pattern="^[A-Za-záéíóúÁÉÍÓÚ]+\s[A-Za-záéíóúÁÉÍÓÚ]+$"
                  title="Por favor introduce entre 5 y 30 dígitos."
                  onChange={handleInputChange}
                  required
                />
                <br></br>
                <br></br>
                <label htmlFor="whatsappInput" className=" font-normal">
                  WhatsApp *
                </label>
                <br></br>

                <input
                  type="text"
                  id="whatsappInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 font-normal"
                  name="whatsapp"
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{8}"
                  title="Por favor, introduce exactamente 8 números."
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
                  className="rounded-lg border border-black p-3 w-80 mt-4 font-light focus:"
                  name="fechaNacimiento"
                  onChange={handleInputChange}
                  required
                  value={values.fechaNacimiento}
                />
              </div>

              {/* imagen svg */}
              <div className="pl-[150px] absolute right-20 top-16">
                <img
                  src="./public/Computer login-rafiki 1.png"
                  alt=""
                  width="400px"
                  height="500px"
                />
              </div>
            </div>
            <div>
              <br />
              <div className="ml-10">
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
                  required
                  className="rounded-lg border border-black p-3 w-670 mt-4 font-light "
                />
              </div>
              <br />
            </div>
            <div className="flex ml-10 bg-Blanco-cremoso justify-between pr-10">
              <div>
                {" "}
                <label htmlFor="aptitudInput " className=" font-normal">
                  Acerca de
                </label>
                <br />
                <br></br>
                <textarea
                  placeholder="Puedes hablar acerca de tus conocimientos o sobre tus aptitudes"
                  name="acercaDe"
                  id=""
                  onChange={handleInputChange}
                  cols="79"
                  required
                  rows="4"
                  maxLength={500}
                  className="border border-black rounded-lg resize-none p-3 font-light"
                ></textarea>
              </div>
              <br />

              {/* btn crear cuenta */}
              <div className="mt-5 px-5">
                <div className="flex my-5">
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

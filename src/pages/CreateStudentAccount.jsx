import React, { useState, useEffect } from "react";
import NavGeneral from "../components/NavGeneral";
import OrdenarCarreras from "../components/ordenCarreras";
import { db, storage } from "../data/firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import { UserAuth } from "../context/AuthContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Resizer from 'react-image-file-resizer';


const animatedComponents = makeAnimated();

const CreateStudentAccount = () => {
  const { user } = UserAuth();
  const correoElectronico = user.email;
  const fechaRegistro = new Date().toISOString().split("T")[0];
  const [loading, setLoading] = useState(false);

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
    imageUrl: "",
    hojadevida:"",
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
  const [imageFiles, setImageFiles] = useState([]); // Estado para manejar el archivo de imagen
  const [trabajosOptions, setTrabajosOptions] = useState([]);
  const [pdf, setPdf] = useState(null);

  useEffect(() => {
    // Función para obtener los trabajos de Firestore
    const fetchTrabajos = async () => {
      try {
        const trabajosCollection = collection(db, "trabajos");
        const trabajosSnapshot = await getDocs(trabajosCollection);
        const trabajosList = trabajosSnapshot.docs.map(doc => ({
          value: doc.id,
          label: doc.data().nombre,
          icon: doc.data().icono
        }));
        trabajosList.sort((a, b) => a.label.localeCompare(b.label));
        setTrabajosOptions(trabajosList);
      } catch (error) {
        console.error("Error obteniendo trabajos: ", error);
      }
    };

    fetchTrabajos();
  }, []);

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar la extensión del archivo utilizando una expresión regular
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.test(file.name)) {
        Swal.fire({
          icon: "error",
          title: "Formato no válido",
          text: "Por favor, sube una imagen en formato png, jpg o jpeg.",
        });
        e.target.value = null; // Limpiar el campo de archivo
      } else {
        setImageFiles([file]);
      }
    }
  };

  const handlePDFChange = (e) => {
    const archivo = e.target.files[0]; // obtener el archivo seleccionado
    const extPermitidas = /(.pdf)$/i; // expresión regular para validar la extensión .pdf
  
    if (!extPermitidas.exec(archivo.name)) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Asegúrate de subir el archivo en formato .pdf"
      });
      e.target.value = ''; // resetear el valor del input
      return false;
    } else {
      setPdf(archivo); // almacenar el archivo PDF
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values); // values
    addOrEditLink(values);
  };

  const handleTrabajosChange = (selectedOptions) => {
    const trabajos = selectedOptions.map(option => ({
      nombre: option.label,
      icono: option.icon // include icon in selected job
    }));
    setValues({ ...values, trabajos: trabajos });
  };

  const handleCarreraChange = (carrera) => {
    setValues({ ...values, carrera: carrera });
  };

 
    const [isChecked, setIsChecked] = useState(false);
  
    const handleCheckboxChange = (e) => {
      const checked = e.target.checked;
      setIsChecked(checked);
      if (checked) {
        MostrarAyuda();
      }
    } 
  
  const MostrarAyuda = () => {
    Swal.fire({
      icon: "info",
      title: "Terminos y condiciones",
      text: "Aceptar nuestros términos y condiciones implica que usted acepta todas las normas y políticas que rigen el uso de nuestro servicio. Esto incluye cómo recopilamos y utilizamos sus datos personales, las reglas sobre el contenido que puede publicar, y sus responsabilidades al utilizar nuestra plataforma. Aceptar estos términos es necesario para garantizar una experiencia segura y justa para todos los usuarios.",
    });
  };
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        130,
        130,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
    const addOrEditLink = async (linkObject) => {
      setLoading(true);
      try {
        // Crear el documento del estudiante en Firestore
        const docRef = await addDoc(collection(db, "estudiantes"), {
          ...linkObject,
          imageUrl: "",  // Inicialmente vacío
          thumbUrl: "",  // Inicialmente vacío
          hojadevida: ""     // Inicialmente vacío
        });
        const docId = docRef.id;
    
        // Función para subir imágenes
        const uploadImage = async (file) => {
          const imageRef = ref(storage, `imagenesPerfil/${docId}/${file.name}`);
          await uploadBytes(imageRef, file);
          const fileUrl = await getDownloadURL(imageRef);
    
          const resizedImage = await resizeFile(file);
          const thumbRef = ref(storage, `imagenesPerfil/${docId}/thumb_${file.name}`);
          await uploadBytes(thumbRef, resizedImage);
          const resizedImageUrl = await getDownloadURL(thumbRef);
    
          return { imageUrl: fileUrl, thumbUrl: resizedImageUrl };
        };
    
        // Subir las imágenes
        const results = await Promise.all(imageFiles.map(file => uploadImage(file)));
        const imageUrls = results.map(result => result.imageUrl).join(", ");
        const thumbUrls = results.map(result => result.thumbUrl).join(", ");
    
        // Subir el PDF
        const pdfRef = ref(storage, `cvPerfil/${docId}/${pdf.name}`);
        await uploadBytes(pdfRef, pdf);
        const pdfUrl = await getDownloadURL(pdfRef);
    
        // Actualizar el documento del estudiante con las URLs de las imágenes y del PDF
        await updateDoc(doc(db, "estudiantes", docId), {
          imageUrl: imageUrls,
          thumbUrl: thumbUrls,
          hojadevida: pdfUrl,
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
        setImageFiles([]);
        setPdf(null); // Restablecer el estado del PDF
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
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
                <br />
                <br />
                <label htmlFor="imagenInput" className=" font-normal">
                  Subir Imagen
                </label>
                <br></br>

                <input
                  type="file"
                  id="imagenInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 font-normal"
                  name="imagen"
                  onChange={handleImageChange}
                  title="Las fotos deben subirse en formato png, jpg, jpeg"
                  required
                />
                 <h6 className="text-sm text-gray-500 mt-2 ml-1 font-normal">
                    La imagen debe estar en formato .png .jpg .jpeg
                  </h6>
                
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
                <br /><br />
                
                
                <label htmlFor="imagenCV" className=" font-normal">
                  Subir Curriculum
                </label>
                <br></br>

                <input
                  type="file"
                  id="imagenCV"
                  className="rounded-lg border border-black p-3 w-80 mt-4 font-normal"
                  name="curriculum"
                  onChange={handlePDFChange}
                  title="El archivom debe estar en formato PDF"
                 required
              
                />
                 <h6 className="text-sm text-gray-500 mt-2 ml-1 font-normal">
                    El archivo debe estar en formato .pdf
                  </h6>
               
              </div>

              {/* imagen svg */}
              <div className="pl-[150px] absolute right-20 top-16">
                <img
                  src="/Computer login-rafiki 1.png"
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
                  options={trabajosOptions}
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
                    onChange={handleCheckboxChange}
                    name=""
                    id=""
                    className="mt-3 checked:bg-Blanco-cremoso"
                    required
                  />
                  <h6 className="text-sm text-gray-500 mt-3 ml-3 font-normal">
                    <a href="https://website-unichamba.netlify.app/policy">Acepto los terminos y condiciones de unichamba</a>
                    
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
      {loading && (
  <div className="fixed top-0 left-0 w-full h-full bg-indigo-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="spinner">
      
    <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg class="w-16 h-16 animate-spin text-gray-900/50" viewBox="0 0 64 64" fill="none"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" class="text-gray-900">
          </path>
        </svg>
    </div>  

    </div>
  </div>
  
)}
    </>
  );
};

export default CreateStudentAccount;

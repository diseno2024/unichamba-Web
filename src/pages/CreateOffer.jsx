import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import NavGeneral from '../components/NavGeneral';
import Swal from 'sweetalert2';
import { UserAuth } from "../context/AuthContext";
import Resizer from 'react-image-file-resizer';
import axios from "axios";

const CreateOffer = () => {
  const [carrera, setCarreras] = useState([]);
  const [selectedCarreras, setSelectedCarreras] = useState([]);
  const [quienPublica, setQuienPublica] = useState('');
  const [description, setDescription] = useState('');
  const [imagendata, setImagendata] = useState(null);
  const [imagenRedimensionadadata, setImagenRedimensionadadata] = useState(null); // Segunda imagen redimensionada
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del spinner

  const cargarCarreras = async () => {
    try {
      const response = await axios.get('https://couchdbbackend.esaapp.com/unichamba-carreras/_all_docs?include_docs=true', {
        auth: { username: 'unichamba', password: 'S3pt13mbre#2024Work' },
      });
      const carrerasData = response.data.rows.map(row => ({ id: row.id, nombre: row.doc.carrera }));
      const carrerasOrdenadas = carrerasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setCarreras(carrerasOrdenadas);
    } catch (error) {
      Swal.fire("Error", "Hubo un error al cargar las carreras", "error");
    }
  };

  useEffect(() => {
    cargarCarreras();
    setQuienPublica(user.email  || '');
  }, [user]);

  const handleSelectChangeCarreras = (selectedOptions) => {
    const allCarrerasOptionSelected = selectedOptions.some(option => option.label === "Aplican todas las carreras");
    if (allCarrerasOptionSelected) {
      setSelectedCarreras([{ value: 'all', label: 'Aplican todas las carreras' }]);
      Swal.fire("Selección única", "No puedes seleccionar otras carreras si eliges 'Aplican todas las carreras'.", "warning");
    } else if (selectedOptions.length <= 3) {
      setSelectedCarreras(selectedOptions);
    } else {
      Swal.fire("Límite alcanzado", "Solo puedes seleccionar hasta 3 carreras.", "warning");
    }
  };

  // Método para redimensionar una imagen
  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200, // Ancho
        200, // Alto
        'JPEG', // Formato
        100, // Calidad
        0, // Rotación
        (uri) => {
          resolve(uri); // Retorna la imagen redimensionada
        },
        'base64' // Tipo de salida
      );
    });

  // Función para convertir cualquier imagen a formato JPEG
  const convertImageToJpg = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = async () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const jpegDataUrl = canvas.toDataURL("image/jpeg");
          resolve(jpegDataUrl);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.test(file.name)) {
        Swal.fire({
          icon: "error",
          title: "Formato no válido",
          text: "Por favor, sube una imagen en formato png, jpg o jpeg.",
        });
        e.target.value = null; // Limpiar el campo de archivo
      } else {
        // Convertir la imagen a JPEG
        const jpegImage = await convertImageToJpg(file);
        setImagendata(jpegImage); // Guardar la imagen en JPEG

        // Redimensionar la imagen y guardarla
        const resizedImage = await resizeFile(file);
        setImagenRedimensionadadata(resizedImage); // Guardar la imagen redimensionada
      }
    } else {
      // Si no hay archivo, usar la imagen por defecto
      const defaultImageUrl = "./CrearOfertaimg.png";
      const response = await fetch(defaultImageUrl);
      const blob = await response.blob();
      const defaultFile = new File([blob], "CrearOfertaimg.png", { type: blob.type });
    
      // Redimensionar la imagen por defecto
      const resizedDefaultImage = await resizeFile(defaultFile);
      setImagendata(await convertToBase64(defaultFile)); // Convertir a Base64
      setImagenRedimensionadadata(resizedDefaultImage); // Guardar la imagen redimensionada
    }
  };

  /* para validar que el correo tenga ese formato */
  const validateEmail = (email) => {
    // Expresión regular para validar el formato nombre.apellido@ues.edu.sv
    const regex = /^[a-zA-Z]+\.[a-zA-Z]+@ues\.edu\.sv$/;
    return regex.test(email);
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validar el correo antes de continuar y si esta mal llevarlo a inicio
    // Validar el correo antes de continuar
if (!validateEmail(quienPublica)) {
  // Mostrar mensaje de error por 4 segundos
  Swal.fire({
      icon: "error",
      title: "Error",
      text: "El correo debe tener el formato nombre.apellidos@ues.edu.sv",
      timer: 3000,
      showConfirmButton: false
  }).then(() => {
      // Redirige al inicio después de que se cierre el mensaje
      window.location.href = "/inicio"; 
  });
  return;
}

//validamos la descripcion
    if (description.length < 50 || description.length > 500) {
      Swal.fire("Error", "La descripción debe tener entre 50 y 500 caracteres.", "error");
      return;
    }
    
    // Si el campo del select está vacío, llenamos con "Aplican todas las carreras"
    const carrerasFinales = selectedCarreras.length === 0 
      ? [{ value: 'all', label: 'Aplican todas las carreras' }] 
      : selectedCarreras;

    const fechaRegistro = new Date().toISOString().split("T")[0]; // Registramos la fecha del registro del anuncio
    setLoading(true);
    const data = {
      quienPublica,
      description,
      carrera: carrerasFinales.map(carrera => carrera.label),
      fecRegistro: fechaRegistro,
    };

    try {
      // **1. Guardamos los datos del anuncio en CouchDB (unichamba-anuncios):**
      const response = await axios.post('https://couchdbbackend.esaapp.com/unichamba-anuncios', data, {
        auth: { username: 'unichamba', password: 'S3pt13mbre#2024Work' },
        headers: { 'Content-Type': 'application/json' },
      });

      const docId = response.data.id; // Obtenemos el ID del documento creado
      const rev = response.data.rev; // Obtenemos la revisión del documento

      let base64Data; // Para almacenar la imagen original
      let base64Resized; // Para almacenar la imagen redimensionada

      if (imagendata) {
        // Si hay una imagen seleccionada
        base64Data = imagendata.split(",")[1]; // Obtenemos solo la parte de datos Base64 de la imagen original
        base64Resized = imagenRedimensionadadata.split(",")[1]; // Obtenemos solo la parte de datos Base64 de la imagen redimensionada
      } else {
        // Cargar la imagen por defecto
        const defaultImageUrl = "./CrearOfertaimg.png";
        const response = await fetch(defaultImageUrl);
        const blob = await response.blob();
        const file = new File([blob], "CrearOfertaimg.png", { type: blob.type });

        // Convierte la imagen por defecto a Base64
        const reader = new FileReader();
        base64Data = await new Promise((resolve) => {
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(file);
        });
        base64Resized = base64Data; // Usar la misma imagen por defecto para la redimensionada
      }

      const imageAttachments = {
        _attachments: {
          "imagen.jpg": {
            content_type: "image/jpeg", // Cambiamos esto si el tipo de imagen es diferente
            data: base64Data, // Imagen original
          },
          "imagenSmall.jpg": {
            content_type: "image/jpeg", // Imagen redimensionada
            data: base64Resized,
          },
        }
      };

        // Guardamos ambas imágenes en el mismo documento
        await axios.put(
          `https://couchdbbackend.esaapp.com/unichamba-anuncios-storage/${docId}`, 
          imageAttachments,
           {
            auth: { 
              username: 'unichamba', 
              password: 'S3pt13mbre#2024Work' 
            },
            
        });

        // **3. Actualizamos el documento en unichamba-anuncios con la URL de las imágenes**
        const imagen = `https://couchdbbackend.esaapp.com/unichamba-anuncios-storage/${docId}/imagen.jpg`;
        const imagenSmall = `https://couchdbbackend.esaapp.com/unichamba-anuncios-storage/${docId}/imagenSmall.jpg`;

        // Recuperamos el documento original para obtener el _rev actualizado
        const anuncioResponse = await axios.get(`https://couchdbbackend.esaapp.com/unichamba-anuncios/${docId}`, {
            auth: { username: 'unichamba', password: 'S3pt13mbre#2024Work' },
        });

        const updatedData = {
            ...anuncioResponse.data,
            imagen, // Guardamos la URL de la imagen original
            imagenSmall, // Guardamos la URL de la imagen redimensionada
        };

        // **4. Actualizamos el documento en unichamba-anuncios con las URLs de ambas imágenes**
        await axios.put(`https://couchdbbackend.esaapp.com/unichamba-anuncios/${docId}`, updatedData, {
            auth: { username: 'unichamba', password: 'S3pt13mbre#2024Work' },
            headers: { 'Content-Type': 'application/json' },
        });



        //mensaje de exito o error

        Swal.fire({
            title: "Éxito",
            text: "La oferta ha sido creada. ¿Deseas ir a la página de inicio o quedarte en la página de creación de la oferta?",
            icon: "success",
            showCancelButton: true,
            confirmButtonText: "Ir a inicio",
            cancelButtonText: "Quedarme",
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/inicio';
            } else {
                setQuienPublica(user.email);
                setDescription('');
                setSelectedCarreras([]);
                setImagendata(null);
                window.location.href = '/createOffer';
            }
        });
    } catch (error) {
        console.error("Error al crear la oferta:", error);
        Swal.fire("Error", "Hubo un error al crear la oferta", "error");
    } finally {
        setLoading(false); // Desactivamos spinner de carga después de completar la carga
    }
      
    
    };
 
    const MostrarAyuda = () => {
      Swal.fire({
        title: '¿Necesitas ayuda?',
        html: `
          <div class="text-left">
            <p><strong className="text-purple-400">Campo de quien publica:</strong> Se llena automáticamente.</p>
            <p><strong className="text-purple-400">Campo de carreras:</strong> Si no se selecciona una, se da por entendido que es para todas las carreras.</p>
            <p><strong className="text-purple-400">Campo de imagen:</strong> Es opcional.</p>
            <p><strong className="text-purple-400">Descripcion:</strong> Es obligatorio.</p>
          </div>
        `,
        icon: 'question',
        confirmButtonText: 'Entendido',
        customClass: {
          popup: 'bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white p-4 rounded-lg shadow-lg',
          title: 'text-2xl font-bold mb-2',
          htmlContainer: 'text-lg leading-relaxed'
        }
      });
    };
  const animatedComponents = makeAnimated();

  return (
    <>
      <div className="bg-Blanco-cremoso h-[800px]">
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <NavGeneral />
        </header>
        <div className="bg-Tarjet px-8 w-auto pt-24">
  <div className="flex flex-col lg:flex-row rounded-xl border border-gray-500 shadow-lg">
    <div className="w-full lg:w-1/3">
      <section className="h-full">
        <img
          src="./imagenOferta.png"
          alt="/ofertaimagen.png"
          className="w-full h-full object-cover rounded-xl"
        />
      </section>
    </div>
    <main className="w-[100%] mx-auto pl-4">
      <section className="w-[95%] mx-auto">
        <form onSubmit={handleSubmit} className="space-y-2">
          <p className="pt-5 pl-2 font-roboto font-bold text-lg">Crea una oferta <br />
          <span className=" text-xs   lg:pl-96 lg:ml-72 ">Para ayuda, haz clic aquí</span>
           <span className="material-symbols-outlined cursor-pointer" 
            onClick={MostrarAyuda}>help</span>
       
            </p>
            
          <div className="flex flex-col lg:flex-row p-2">
            <div className="w-full lg:w-2/4 ">
              <label className="block text-sm font-medium">Quien publica*</label>
              <input
                id="quienPublica"
                name="quienPublica"
                type="text"
                className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mx-auto bg-Blanco-cremoso font-light rounded-lg border border-black p-2 w-full sm:w-72 md:w-670 lg:w-96 mt-1"
                required
                title="Por favor introduce solo letras."
                value={quienPublica}
                onChange={(e) => setQuienPublica(e.target.value)}
                disabled
              />
            </div>
          </div>
                  <div className="flex flex-col lg:flex-row p-2">
                    <div className="w-full lg:w-2/4 md:w-1/2">
                      <label className="block text-sm font-medium">Carrera (opcional)</label>
                      <Select
                        className="mr-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mx-auto bg-Blanco-cremoso font-light rounded-lg border border-black p-1 w-full sm:w-72 md:w-670 lg:w-96 mt-1"
                        components={animatedComponents}
                        isMulti
                        options={carrera.map(({ nombre, id }) => ({ value: id, label: nombre }))}
                        onChange={handleSelectChangeCarreras}
                        value={selectedCarreras}
                      />
                    </div>
                    <div className="w-full lg:w-2/4 flex items-center">
                      <div className="w-full lg:w-2/4 ">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">Selecciona Imagen (opcional)</label>
                        <input
                        className="mr-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mx-auto bg-Blanco-cremoso font-light rounded-lg border border-black p-1 w-full sm:w-72 md:w-670 lg:w-96 mt-1"
                        id="imagen"
                          name="imagen"
                          type="file"
                          accept=".jpg,.jpeg,.png" 
                          onChange={handleImageChange}
                          
                        />
                      </div>
                  
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row p-2">
                    <div className="w-full lg:w-4/4">
                      <label className="block text-sm font-medium">Descripción</label>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row p-1">
                    <textarea
                      id="description"
                      name="description"
                      rows="12"
                      className="lg:h-auto w-full h-auto border-2 border-Dark-purple bg-Blanco-cremoso p-2.5 text-sm text-gray-900 rounded-lg font-normal"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      maxLength={500}
                      minLength={50}
                      placeholder="Puedes colocar la descripcion acerca de el empleo"
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button type="submit" className="mb-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white w-64 bg-Dark-purple hover:bg-Dark-Blue hover:text-white font-medium rounded-lg text-sm py-2.5">Crear Oferta</button>
                  </div>
                </form>
              </section>
            </main>
          </div>
        </div>
        <div className="bg-Tarjet h-auto lg:h-20 w-full lg:w-auto"></div>
      </div>

      {/*Spiner para cuando se este creando el anuncio y guarde todos los datos salga un icono animado de carga*/}
      {loading && (
  <div className="fixed top-0 left-0 w-full h-full bg-indigo-900 bg-opacity-50 flex justify-center items-center z-50">
    <div className="spinner">
      
    <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
        <svg className="w-16 h-16 animate-spin text-gray-900/50" viewBox="0 0 64 64" fill="none"
          xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"></path>
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" className="text-gray-900">
          </path>
        </svg>
    </div>  

    </div>
  </div>
)}

      
    </>
  );
}

export default CreateOffer;

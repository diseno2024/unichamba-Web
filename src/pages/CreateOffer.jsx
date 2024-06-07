import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import NavGeneral from '../components/NavGeneral';
import { db, storage } from '../data/firebase';
import { collection, addDoc, getDocs, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Swal from 'sweetalert2';
import { UserAuth } from "../context/AuthContext";
import Resizer from 'react-image-file-resizer';

const CreateOffer = () => {
  const [carrera, setCarreras] = useState([]);
  const [selectedCarreras, setSelectedCarreras] = useState([]);
  const [quienPublica, setQuienPublica] = useState('');
  const [description, setDescription] = useState('');
  const [imagen, setImagen] = useState(null);
  const { user } = UserAuth();
  const [loading, setLoading] = useState(false); // Estado para controlar la visibilidad del spinner

  const cargarCarreras = async () => {
    try {
      const carrerasSnapshot = await getDocs(collection(db, 'carreras'));
      const carrerasData = carrerasSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().carrera }));
      const carrerasOrdenadas = carrerasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setCarreras(carrerasOrdenadas);
    } catch (error) {
      Swal.fire("Error", "Hubo un error al cargar las carreras", "error");
    }
  };

  useEffect(() => {
    cargarCarreras();
    setQuienPublica(user.email);
  }, [user]);

  const handleSelectChangeCarreras = (selectedOptions) => {
    setSelectedCarreras(selectedOptions);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImagen(file);
    }
  };

  const resizeFile = (file) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        200,
        200,
        'JPEG',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file'
      );
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activar spinner de carga al inicio del envío del formulario
    const data = {
      quienPublica,
      description,
      carrera: selectedCarreras.map(carrera => carrera.label),
      imagen: "",
      imagenSmall:""
    };

    try {
      const docRef = await addDoc(collection(db, 'anuncios'), data);
      const docId = docRef.id;

      if (imagen) {
        // Subir la imagen original
        const imageRef = ref(storage, `anuncios/${docId}/${imagen.name}`);
        await uploadBytes(imageRef, imagen);
        const imageUrl = await getDownloadURL(imageRef);

        // Redimensionamos y subimos la imagen pequeña
        const resizedImage = await resizeFile(imagen);
        const smallImageRef = ref(storage, `anuncios/${docId}/small_${imagen.name}`);
        await uploadBytes(smallImageRef, resizedImage);
        const smallImageUrl = await getDownloadURL(smallImageRef);

        // Actualizamos el documento con las URLs de las imágenes
        await updateDoc(doc(db, 'anuncios', docId), { imagen: imageUrl, imagenSmall: smallImageUrl });
      }

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
          setImagen(null);
          window.location.href = '/createOffer';
        }
      });
    } catch (error) {
      console.error("Error al crear la oferta:", error);
      Swal.fire("Error", "Hubo un error al crear la oferta", "error");
    } finally {
      setLoading(false); // Desactivar spinner de carga después de completar la carga
    }
  };

 

  const animatedComponents = makeAnimated();

  return (
    <>
      <div className="bg-Blanco-cremoso h-[800px]">
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <NavGeneral />
        </header>
        <div className="bg-Tarjet px-8 h-auto w-auto pt-24">
          <div className="flex flex-col lg:flex-row rounded-xl border border-gray-500 shadow-lg h-auto">
            <div className="w-full lg:w-1/3 h-auto">
              <section className="h-full">
                <img
                  src="./imagenOferta.png"
                  alt="./public/ofertaimagen.png"
                  className="w-full h-full object-cover rounded-xl"
                />
              </section>
            </div>
            <main className="w-[100%] mx-auto pl-4 h-[615px]">
              <section className="w-[95%] mx-auto">
                <form onSubmit={handleSubmit} className="h-[615px] space-y-2">
                  <p className="pt-5 pl-6 font-roboto font-bold text-lg">Crea una oferta</p>
                  <div className="flex flex-col lg:flex-row p-2">
                    <div className="w-full lg:w-2/4">
                      <label className="block text-sm font-medium">Quien publica*</label>
                      <input
                        id="quienPublica"
                        name="quienPublica"
                        type="text"
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mx-auto bg-Blanco-cremoso font-light rounded-lg border border-black p-2 w-96 mt-1 border-1 border-Dark-purple"
                        required
                        title="Por favor introduce solo letras."
                        value={quienPublica}
                        onChange={(e) => setQuienPublica(e.target.value)}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row p-2">
                    <div className="w-full lg:w-2/4">
                      <label className="block text-sm font-medium">Carrera (opcional)</label>
                      <Select
                        className="mr-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 mx-auto bg-Blanco-cremoso font-light rounded-lg border border-black p-1 w-100% mt-1 border-1 border-Dark-purple"
                        components={animatedComponents}
                        isMulti
                        options={carrera.map(({ nombre, id }) => ({ value: id, label: nombre }))}
                        onChange={handleSelectChangeCarreras}
                        value={selectedCarreras}
                        required
                      />
                    </div>
                    <div className="w-full lg:w-2/4 flex items-center">
                      <div className="w-3/4">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="file_input">Selecciona Imagen (opcional)</label>
                        <input
                          className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-sm border border-Dark-purple rounded-lg text-Azul-Crepúsculo font-light dark:placeholder-gray-400 p-1.5 w-full mt-0 px-3"
                          id="imagen"
                          name="imagen"
                          type="file"
                          onChange={handleImageChange}
                          required
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
                      placeholder="Escriba una breve descripción sobre el empleo"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="flex justify-end pt-1">
                    <button type="submit" className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white w-64 bg-Dark-purple hover:bg-Dark-Blue hover:text-white font-medium rounded-lg text-sm py-2.5">Crear Oferta</button>
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
}

export default CreateOffer;

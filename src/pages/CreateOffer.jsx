import React, { useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import NavGeneral from '../components/NavGeneral';
import { db } from '../data/firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';

const CreateOffer = () => {
  const [carrera, setCarreras] = useState([]);
  const [selectedCarreras, setSelectedCarreras] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [quienPublica, setQuienPublica] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Datos para enviar a Firebase
    const data = {
      quienPublica,
      description,
      carrera: selectedCarreras.map(carrera => carrera.label), // Solo guarda los nombres de las carreras
      imagen: "",
    };
  
    try {
      await addDoc(collection(db, 'anuncios'), data);
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
          // Limpia los campos si el usuario elige quedarse
          setQuienPublica('');
          setDescription('');
          setSelectedCarreras([]);
        }
      });
    } catch (error) {
      console.error("Error al crear la oferta:", error);
      Swal.fire("Error", "Hubo un error al crear la oferta", "error");
    }
  };
  
  

  const cargarCarreras = async () => {
    try {
      const carrerasSnapshot = await getDocs(collection(db, 'carreras'));
      const carrerasData = carrerasSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().carrera }));
      // Ordenar carreras alfabéticamente
      const carrerasOrdenadas = carrerasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
      setCarreras(carrerasOrdenadas);
    } catch (error) {
      Swal.fire("Error", "Hubo un error al cargar las carreras", "error");
    }
  };

      useEffect(() => {
        cargarCarreras();
      }, []);

      const handleSelectChangeCarreras = (selectedOptions) => {
        setSelectedCarreras(selectedOptions);
      };

      const animatedComponents = makeAnimated();

  return (
    <>
      <div className="bg-Blanco-cremoso h-[800px]">
        {/*Menu Navegador*/}
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <NavGeneral />
        </header>
        {/*Contenedor principal div con padding para darle espacio alrededor de la tarjeta*/}
        {/*Color pastel*/}
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

            {/*Div que contiene el formulario*/}
            <main className="w-[100%] mx-auto pl-4 h-[615px]">
              <section className="w-[95%] mx-auto">
                <form onSubmit={handleSubmit} className="h-[615px] space-y-2">
                  <p className="pt-5 pl-6 font-roboto font-bold text-lg">Crea una oferta</p>
                  {/*fila 1 Titulo y ubicacion*/}
                  <div className="flex flex-col lg:flex-row p-2">
                    <div className="w-full lg:w-2/4">
                      <label className="block text-sm font-medium">Quien publica*</label>
                      <input
                        id="quienPublica"
                        name="quienPublica"
                        type="text"
                        className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ... mx-auto bg-Blanco-cremoso font-light rounded-lg border border-black p-2 w-96 mt-1 border-1 border-Dark-purple"
                        required
                      
                        title="Por favor introduce solo letras."
                        value={quienPublica}
                        onChange={(e) => setQuienPublica(e.target.value)}
                      />
                    </div>
                    {/*Segunda columna*/}
                    <div className="w-full lg:w-2/4">
                    </div>
                  </div>

                  {/*fila 2 Carrera* y imagen*/}
                  <div className="flex flex-col lg:flex-row p-2">
                    <div className="w-full lg:w-2/4">
                      <label className="block text-sm font-medium">Carrera (opcional)</label>
                      <Select
                        className="mr-20 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ... mx-auto bg-Blanco-cremoso font-light rounded-lg border border-black p-1 w-100% mt-1 border-1 border-Dark-purple"
                        components={animatedComponents}
                        isMulti
                        options={carrera.map(({ nombre, id }) => ({ value: id, label: nombre }))}
                        onChange={handleSelectChangeCarreras}
                        value={selectedCarreras}
                      />
                    </div>

                    <div className="w-full lg:w-2/4">
                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        htmlFor="file_input">Selecciona Imagen(opcional)</label>
                      <input className="
                      transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ...
                              text-sm border border-Dark-purple 
                              rounded-lg text-Azul-Crepúsculo font-light 
                              border-Dark-purple
                              dark:placeholder-gray-400 p-1.5 w-96 mt-0 
                              px-3 
                              "
                        id="file_input"
                        type="file"
                      />
                    </div>
                  </div>

                  {/*fila 4 Descripcion*/}
                  <div className="flex flex-col lg:flex-row p-2">
                    <div className="w-full lg:w-4/4">
                      <label className="block text-sm font-medium">Descripción</label>
                    </div>
                  </div>

                  {/*fila 5 caja Descripcion*/}
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

                  {/*fila 6 boton*/}
                  <div className="flex justify-end pt-1">
                    <button type="submit"
                      className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ... text-white w-64 bg-Dark-purple hover:bg-Dark-Blue hover:text-white font-medium rounded-lg text-sm py-2.5">Crear Oferta</button>
                  </div>
                </form>
              </section>
            </main>
          </div>
        </div>

        <div className="bg-Tarjet h-auto lg:h-20 w-full lg:w-auto"></div>
      </div>
    </>
  );
}

export default CreateOffer;

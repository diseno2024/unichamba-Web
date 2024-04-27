import React, { useState } from "react";
import NavGeneral from '../components/NavGeneral'




const CreateOffer = () => {
  const initialStateValues = {
    nombrePuesto: "",
  }

  const [values, setValues] = useState(initialStateValues)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value })

  }

  const handleSubmit = (e) => {
    e.preventDefault(); // Envío del formulario
    window.location.href = '/inicio'; // Redirigir a la página de inicio
  }

  const onSubmit = () => {
    window.location.href = '/inicio'
  }

  return (
    <>
      <div className="bg-Blanco-cremoso h-[800px]">
        {/*Menu Navegador*/}
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <NavGeneral />
        </header>
        {/*Contenedor principal div con padding para darle espacio alrededor de la tarjeta*/}
        {/*Color pastel*/}
        <div className="bg-Tarjet px-8  h-auto w-auto pt-24">
          <div className="flex flex-col lg:flex-row rounded-xl border border-gray-500 shadow-lg h-auto">

            <div className="w-full lg:w-1/3 h-auto">
              <section className="h-full">
                <img
                  src="./imagenOferta.png"
                  alt="./public/ofertaimagen.png"
                  className="w-full h-full object-cover rounded-xl "
                />
              </section>
            </div>


            {/*Div que contiene el formulario*/}
            <main className="w-[100%] mx-auto pl-4 h-[615px]">
              <section className="w-[95%] mx-auto">
                <form onSubmit={handleSubmit} className="h-[615px] space-y-2">

                  <p className="pt-5 pl-6 font-roboto font-bold text-lg">Crea una oferta</p>
                  {/*fila 1 Titulo*/}
                  <div className="flex flex-col lg:flex-row p-2" >
                    <div className="w-full lg:w-4/4 ">
                      <label className="block text-sm font-medium">Titulo</label>
                      <input
                        id="Titulo"
                        name="Titulo"
                        type="text"
                        className="mx-aut bg-Blanco-cremoso font-light rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950"
                        required
                        pattern="[A-Za-z]+"
                        title="Por favor introduce solo letras." />
                    </div>
                  </div>

                  {/*fila 2 Carrera* y imagen*/}
                  <div className="flex flex-col lg:flex-row p-2 ">
                    <div className="w-full lg:w-2/4 ">
                      <label className="block text-sm font-medium ">Carrera*</label>
                      <input id="Carrera"
                        type="text"
                        className=" bg-Blanco-cremoso font-light rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950"
                        required
                      />

                    </div>
                    <div className="w-full lg:w-2/4">

                      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black"
                        for="file_input">Escoje una imagen para la oferta</label>
                      <input className="
                              text-sm border border-gray-300 
                              rounded-lg text-Azul-Crepúsculo font-light 
                              dark:border-gray-600
                              dark:placeholder-gray-400 p-1.5 w-96 mt-0 
                              px-3 
                              "
                        id="file_input"
                        type="file"
                        required />


                    </div>
                  </div>


                  {/*fila 4 Descripcion*/}
                  <div className="flex flex-col lg:flex-row p-2" >
                    <div className="w-full lg:w-4/4 ">
                      <label className="block text-sm font-medium ">Descripcion</label>
                    </div>
                  </div>

                  {/*fila 5 caja Descripcion*/}
                  <div className="flex flex-col lg:flex-row p-1 " >
                    <textarea id="descripcion" rows="12" className="lg:h-auto w-full h-auto border-2 border-zinc-950 bg-Blanco-cremoso p-2.5 text-sm text-gray-900 rounded-lg font-normal "
                      placeholder="Escriba una breve descripcion sobre el empleo"
                      required></textarea>
                  </div>



                  {/*fila 6 boton*/}
                  <div className="flex justify-end pt-1" >
                    <button type="submit"
                      className="transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 ... text-white w-64 bg-Dark-purple hover:bg-Dark-Blue hover:text-white font-medium rounded-lg text-sm  py-2.5 ">Crear Oferta</button>
                  </div>

                </form>

              </section>

            </main>
          </div>
        </div>

        <div className="bg-Tarjet h-auto lg:h-20 w-full lg:w-auto"></div>

      </div>
    </>
  )
}


export default CreateOffer

import React, {useState} from "react";
import NavGeneral from '../components/NavGeneral'




const CreateOffer = () => {
   const initialStateValues={
    nombrePuesto:"",
  }
  
  const [values, setValues]=useState(initialStateValues)
  const handleInputChange = (e) => {
    const {name, value} = e.target;
    setValues({...values, [name]:value})
   
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
        {/*Menu Navegador*/}
        <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
          <NavGeneral/>
</header>
        
        {/*Contenedor principal div con padding para darle espacio alrededor de la tarjeta*/}
        {/*Color pastel*/}
        <div className="bg-Tarjet px-8 pt-4 h-auto w-auto mt-24">
        <div className="flex flex-col lg:flex-row rounded-xl border border-gray-500 shadow-lg h-auto">
     
        <div className="w-full lg:w-1/3 h-auto w-auto">
            <section className="h-full"> 
                <img
                    src="./imagenOferta.png"
                    alt="./public/ofertaimagen.png"
                    className="w-full h-full object-cover rounded-xl"
                />
            </section>
        </div>
  

       {/*Div que contiene el formulario*/}
      <div className="w-full lg:w-3/4 ">
        <p className="pt-5 pl-6 font-roboto font-bold text-lg">Crea una oferta</p>
        <main className="w-[100%] mx-auto  rounded shadow pl-4 ">
        <section className="">  

        <form onSubmit={handleSubmit}>
          
                          {/*fila 1 Titulo*/}
                          <div className="flex flex-col lg:flex-row p-2" >
                            <div className="w-full lg:w-4/4 ">
                              <label className="block text-sm font-medium font-black">Titulo</label>
                              <input 
                              id="Titulo"
                              name="Titulo"
                              type="text" 
                              className="mx-auto bg-gray-200 rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950" 
                              required
                              pattern="[A-Za-z]+"
                              title="Por favor introduce solo letras."/>
                            </div>
                          </div>

                        {/*fila 2 Carrera* y imagen*/}
                        <div className="flex flex-col lg:flex-row p-2 ">
                          <div className="w-full lg:w-2/4 ">
                            <label className="block text-sm font-medium  font-black">Carrera*</label>
                            <input id="Carrera" 
                            type="text" 
                            className=" bg-gray-200 rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950" 
                            required
                            />
                        
                          </div>
                          <div className="w-full lg:w-2/4 ">
                        
                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" 
                            for="file_input">Escoje una imagen para la oferta</label>
                            <input className="
                              text-sm border border-gray-300 
                              rounded-lg bg-white text-Azul-Crepúsculo 
                              dark:border-gray-600
                              dark:placeholder-gray-400 p-1.5 w-96 mt-0 
                              hover:bg-Azul-Crepúsculo hover:text-white hover:border-navy
                              " 
                              id="file_input" 
                              type="file"
                              required/>


                          </div>
                        </div>


                                      {/*fila 4 Descripcion*/}
                                      <div className="flex flex-col lg:flex-row p-2" >
                                      <div className="w-full lg:w-4/4 ">
                                      <label className="block text-sm font-medium font-black">Descripcion</label>
                                      </div>
                                      </div>

                                      {/*fila 5 caja Descripcion*/}
                                      <div className="flex flex-col lg:flex-row p-1 " >
                                      <textarea id="descripcion" rows="12" className="lg:h-auto w-full h-auto border-2 border-zinc-950 bg-gray-200 w-[94%] p-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black "
                                       placeholder="Escriba una breve descripcion sobre el empleo"
                                        required></textarea>
                                      </div>
                  
  

                    {/*fila 6 boton*/}
                    <div className="flex flex-col lg:flex-row  lg:justify-end pr-14" >
                            <div className="lg:w-4/4 ">
                            <button type="submit"
                             className="text-white border-2 w-64 bg-Azul-Crepúsculo border border-black hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm  py-2.5 ">Crear Oferta</button>
                            </div>
                          </div>
                
        </form>

        </section> 
      
       </main>
     </div>
     </div>
</div>

<div className="bg-Tarjet h-auto lg:h-20 w-full lg:w-auto"></div>
  



        </>
  )
}


export default CreateOffer

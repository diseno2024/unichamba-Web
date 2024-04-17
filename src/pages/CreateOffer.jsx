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

  const handleSubmit=(e)=>{
    e.preventDefault();
console.log(values)
    addOrEditLink(values);
  }

 

  return (
        <>
        {/*Menu Navegador*/}
<header>
          <NavGeneral/>
</header>
        
        {/*Contenedor principal div con padding para darle espacio alrededor de la tarjeta*/}
        {/*Color pastel*/}
<div className="bg-Tarjet px-8 pt-4 h-auto w-auto">
    <div className="flex flex-col lg:flex-row rounded-xl border-2 border-slate-950">
      {/*Div que contiene la imagen*/}
      <div className="w-full lg:w-1/3 ">
          <section>
           <img
            src="./imagenOferta.png"
            alt="./public/ofertaimagen.png"
            className="w-full h-auto max-w-full lg:max-w-100% object-cover rounded-xl"
            />
          </section>
      </div>

       {/*Div que contiene el formulario*/}
      <div className="w-full lg:w-3/4 ">
        <p className="pt-5 pl-6 font-roboto font-bold text-lg">Crea una oferta</p>
        <main className="w-[100%] mx-auto  rounded shadow pl-4 ">
        <section className="">  

        <form onSubmit={handleSubmit}>
          
                          {/*fila 1*/}
                          <div className="flex flex-col lg:flex-row p-2" >
                            <div className="w-full lg:w-4/4 ">
                              <label className="block text-sm font-medium font-black">Nombre del Cargo o Trabajo *</label>
                              <input 
                              id="nombrePuesto"
                              name="nombrePuesto"
                              type="text" 
                              className="mx-auto bg-gray-200 rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950" 
                       
                              required
                              pattern="[A-Za-z]+"
                              title="Por favor introduce solo letras."/>
                            </div>
                          </div>

                        {/*fila 2 DIRECCION Y EXPERIENCIA*/}
                        <div className="flex flex-col lg:flex-row p-2 ">
                          <div className="w-full lg:w-2/4 ">
                            <label className="block text-sm font-medium  font-black">Dirección *</label>
                            <input id="direccion" type="text" className=" bg-gray-200 rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950" required/>
                        
                          </div>
                          <div className="w-full lg:w-2/4 ">
                            <label className="block text-sm font-medium  font-black">Carrera*</label>
                            <input id="carrera" type="text" className=" bg-gray-200 rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950" required/>

                          </div>
                        </div>



                          {/*fila 3 MODALIDAD Y CARGA */}
                          <div className="flex flex-col lg:flex-row p-2">
                            <div className="w-full lg:w-2/4 ">
                              <label className="block text-sm font-medium font-black">Nombre de la Persona Encargada o Empresa</label>
                              <input id="EmpresaoEncargado" type="text" className=" bg-gray-200 rounded-lg border border-black p-2 w-96 mt-1 border-1 border-zinc-950" required/>

                            </div>
                            <div className="w-full lg:w-2/4 ">
                              <label className="block text-sm font-medium  font-black">Requisitos</label>      
                              <div
                              id="open-modal-btn"
                              className="p-2 mt-1 w-96 px-4 bg-gray-300 text-white rounded hover:bg-Azul-Crepúsculo w-40 border-2 border-zinc-950 "
                           
                              >
                              <center><box-icon type='solid' name='file-plus' size='18px' color='Lapislazuli'></box-icon></center>
                              </div>   
                            </div>
                          </div>



                          {/*fila 4 Descripcion*/}
                          <div className="flex flex-col lg:flex-row p-2" >
                            <div className="w-full lg:w-4/4 ">
                              <label className="block text-sm font-medium font-black">Descripcion</label>
                            
                            </div>
                          </div>
                        


                    {/*fila 5 Descripcion*/}

                    <div className="flex flex-col lg:flex-row p-1 " >
                  <textarea id="descripcion" rows="8" className="lg:h-auto w-full h-auto border-2 border-zinc-950 bg-gray-200 w-[98%] p-2.5 text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black " placeholder="Descripción del Empleo" required></textarea>
                  </div>
                  
                  

                    {/*fila 6*/}
                    <div className="flex flex-col lg:flex-row  lg:justify-end pr-4" >
                            <div className="lg:w-3/3 ">
                            <button type="submit" className="text-white border-2 w-64 bg-Azul-Crepúsculo border border-black hover:bg-blue-800 hover:text-white font-medium rounded-lg text-sm  py-2.5 ">Crear Oferta</button>
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

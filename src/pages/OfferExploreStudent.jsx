import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import OfertaLaboral from '../components/OfertaLaboral';
import CarreraFiltro from '../components/CarreraFiltro'
import { NavLink } from 'react-router-dom'


const OfferExploreStudent = () => {
  /* La const esta aquí en lugar de CarreraFiltro para más comodidad */
  const [carreraSeleccionada, setCarreraSeleccionada] = useState(null)
  // console.log(names)
  return (
    <>
      <header>
        <Navbar/>
      </header>

      <main className='flex h-auto mt-[90px]  space-y-8 relative'>
        <div className='ml-2 mt-10 pl-4 py-2 mr-3 min-w-[300px]' >
          <div>
            <NavLink to="/inicio">
              <span class="material-symbols-outlined ">
                arrow_back
              </span>
            </NavLink>
          </div>

          <div className='mt-5 border-r-2 border-black/20 '>
            {/* Aquí se le manda el carreraSeleccionada y setCarreraSeleccionada para poder modificar y usar la const */}
            <CarreraFiltro carreraSeleccionada={carreraSeleccionada} setCarreraSeleccionada={setCarreraSeleccionada}/>
          </div>

        </div>

        <section className=' grid grid-cols-2 gap-3 mr-3'>
          {/* Aquí solo se manda la carreraSelecionada para mostrar ofertas de esa carrera */}
          <OfertaLaboral carreraSeleccionada={carreraSeleccionada}/>
        </section>

      </main>
    </>
  )
}

export default OfferExploreStudent

 
/*<section className='w-[90%] mx-auto '>
                
                {ofertas.map( (oferta) => ( 
                        <NavLink to="/detailsOffer"><OfertaLaboral listStudent={oferta} key={oferta.id}/></NavLink>
                            
                ))}
                </section>*/



                /*
                 <section className=' w-[95%] h-[100px] bg-Filters border-[1px] border-Azul-oscuro/50 mx-auto rounded-[10px] flex items-center px-5 justify-between'>

                    <div className='w-[700px] flex justify-between'>
                        <div className='relative'>
                            <CarreraFiltro />
                        </div>

                        <div className='relative'>
                            <Municipio />
                        </div>
                    </div>

                   

                </section>
*/







// const ComponentePaginacion = ({ elementosFiltrados }) => {
//   // Dividir la lista de elementos en dos partes
//   const mitad = Math.ceil(elementosFiltrados.length / 2);
//   const primeraColumna = elementosFiltrados.slice(0, mitad);
//   const segundaColumna = elementosFiltrados.slice(mitad);

//   return (
//     <div style={{ display: 'flex' }}>
//       {/* Primera columna */}
//       <div style={{ flex: 1 }}>
//         {primeraColumna.map((elemento, index) => (
//           <div key={index}>{/* Renderizar el componente de la card aquí */}</div>
//         ))}
//       </div>

//       {/* Segunda columna */}
//       <div style={{ flex: 1 }}>
//         {segundaColumna.map((elemento, index) => (
//           <div key={index}>{/* Renderizar el componente de la card aquí */}</div>
//         ))}
//       </div>
//     </div>
//   );
// };



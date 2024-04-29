import React from 'react'
import Navbar from '../components/Navbar'
import ofertas from '../data/Ofertas';
import OfertaLaboral from '../components/OfertaLaboral';
import CarreraFiltro from '../components/CarreraFiltro'
import Municipio from '../components/Municipio'
import { NavLink } from 'react-router-dom'


const OfferExploreStudent = () => {

  // Dividir la lista de elementos en dos partes
  const mitad = Math.ceil(ofertas.length / 2);
  const primeraColumna = ofertas.slice(0, mitad);
  const segundaColumna = ofertas.slice(mitad);

  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className='flex h-auto mt-[100px] pt-50 space-y-8 '>
        <div className='ml-5 mt-10 pl-4 py-2 mr-5 min-w-[300px]' >

          <div className='border-r-2 border-black/40'>
            <CarreraFiltro />

          </div>

          <div className='border-r-2 border-black/40'>
            <Municipio />
          </div>

        </div>


        <section className=' w-[60%]  '>
          {/* {ofertas.map( (oferta) => ( 
                  <OfertaLaboral listStudent={oferta} key={oferta.id}/>
                            
                ))} */}

          <div className='flex space-x-5'>
            {/* Primera columna */}
            <div className='flex-1 '>
              {primeraColumna.map((elemento, index) => (
                <OfertaLaboral listStudent={elemento} key={index} />
              ))}
            </div>

            {/* Segunda columna */}
            <div className='flex-1'>
              {segundaColumna.map((elemento, index) => (
                <OfertaLaboral listStudent={elemento} key={index} />
              ))}
            </div>
          </div>




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



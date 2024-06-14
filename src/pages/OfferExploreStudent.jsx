import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import OfertaLaboral from '../components/OfertaLaboral';
import CarrerasFiltro from '../components/CarrerasFiltroOES'
import { NavLink } from 'react-router-dom'


const OfferExploreStudent = () => {
  /* La const esta aquí en lugar de CarreraFiltro para más comodidad */
  /* Se inicia con 3 nulls para facilitar el ingresar datos en CarrerasFiltroOES */
  const [carrerasSeleccionadas, setCarrerasSeleccionadas] = useState([null,null,null])

  // console.log(names)
  return (
    <>
      <header>
        <Navbar/>
      </header>

      <main className='flex h-auto mt-[90px]  space-y-8 relative'>
        <div className='ml-2 mt-10 pl-4 py-2 mr-3 min-w-[300px]' >
          
          <div className=' border-r-2 border-black/20 '>
            {/* Aquí se le manda el carreraSeleccionada y setCarreraSeleccionada para poder modificar y usar la const */}
            <CarrerasFiltro 
              carrerasSeleccionadas={carrerasSeleccionadas} setCarrerasSeleccionadas={setCarrerasSeleccionadas}
            /> 
          </div>

        </div>
        
        <div>


          <div className='mt-4 mb-4'>
            <NavLink to="/inicio">
              <span class="material-symbols-outlined ">
                arrow_back
              </span>
            </NavLink>
          </div>
          <NavLink to='/DetailsOffer'>
            <section className=' grid grid-cols-2 gap-3 mr-3'>
              {/* Aquí solo se manda la carreraSelecionada para mostrar ofertas de esa carrera */}
              <OfertaLaboral carrerasSeleccionadas={carrerasSeleccionadas}/>
            </section>
          </NavLink>
        </div>

      </main>
    </>
  )
}

export default OfferExploreStudent




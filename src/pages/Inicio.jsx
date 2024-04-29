// Aqui trabajara kendall
import React from 'react';
import { NavLink } from 'react-router-dom';
import moduleName from '../data/Ofertas'
import Ofertas from '../data/Ofertas';
import OfertaLaboral from '../components/OfertaLaboral';

const Inicio = () => {
  return (
    <>
      <header className='h-[405px] bg-Dark-Blue space-y-12 rounded-b-3xl relative'>
        <nav className='h-[105px] flex items-center justify-between px-8'>
          <div>
            <img src="/LOGO.svg" alt="" />
          </div>
          {/* publicar oferta y auth con google  */}
          <div className='flex gap-5'>
            <NavLink to="/login">
              <buttons className='text-white font-semibold flex items-center gap-4 bg-Malachite h-[55px] px-5 rounded-[8px]'> 
                Publicar Oferta 
                <span class="material-symbols-outlined">work</span>
                </buttons>
            </NavLink>
            <img src="/iniciar-sesion.svg" alt="" />
          </div>
        </nav>
        <h1 className='text-white font-medium text-4xl w-[35%] relative left-[100px] text-center'>Te ayudamos a encontrar tu primer empleo</h1>
        
        {/* buscador */}
        <div className='flex px-10'>
          {/* inputs */}
          <div className='bg-Space-cadet h-[55px] rounded-[10px] w-[950px] flex items-center justify-between px-5 relative'>
                <input type="search" placeholder='Cargo o Puesto' className='bg-inherit placeholder:text-white placeholder:font-medium w-[400px]'/>
                <span className='h-[86%] border-[1px] border-white/50 ml-2'></span>
                <input type="search" placeholder='Municipio' className='bg-inherit placeholder:text-white placeholder:font-medium h-full w-[400px] pl-[15px]'/>
                <span class="material-symbols-outlined text-white w-[40px] h-[40px] bg-Malachite text-3xl flex items-center justify-center rounded-lg absolute right-2">search</span>
          </div>
        </div>

        <img src="/minerva_sola_white.png" alt="minerva" className='w-[180px] h-[230px] absolute top-24 right-8' />
      </header>

      <main className='h-auto justify-center pt-10 border border-black w-[95%] mx-auto grid grid-cols-2'>

        {/* perfiles de estudiantes  */}

        <section className='border border-red-500 px-5'>
          
        </section>

        {/* ofertas laborales recientes */}

        <section className='px-5'>

          {Ofertas.map((oferta) => (
            <OfertaLaboral listStudent={oferta} key={oferta.id}/>
          ))}

        </section>
        
      </main>
    </>
  )
}

export default Inicio;
// Aqui trabajara kendall
import React from 'react';
import background from '../../public/wave.svg'
import students from '../data/students'
import ofertas from '../data/Ofertas'
import TarjetaPublicacion from '../components/TarjetaPublicacion'
import { NavLink } from 'react-router-dom';
import OfertaLaboral from '../components/OfertaLaboral';

const Inicio = () => {
  return (
    <>
      <header className='bg-imagen-fondo bg-cover bg-center h-[600px] flex flex-col justify-between'>
        <nav className='h-[105px] flex items-center justify-between px-6'>
          <div>
            <img src="/LOGO.svg" alt="" />
          </div>
          <div className='flex gap-5'>
            <NavLink to="/login">
              <buttons className='text-white font-semibold flex items-center gap-4 border-[2px] border-white h-[55px] px-5 rounded-[8px]'> 
                Publicar Oferta 
                <box-icon name='briefcase' color="white"></box-icon>
                </buttons>
            </NavLink>
            <NavLink to="/createAccountStd">
              <buttons className='bg-white h-[55px] w-[180px] text-Azul-Fuerte font-semibold flex items-center justify-center rounded-[8px]'>Crear Cuenta</buttons>
            </NavLink>
          </div>
        </nav>
        {/* buscador  y button */}
        <div className='flex flex-col'>
          {/* inputs */}
          <div className='border-[1px] border-white h-[50px] rounded-[15px] w-[950px] flex items-center justify-between px-5 mx-auto'>
                <input type="search" placeholder='Cargo o Puesto' className='bg-inherit placeholder:text-white placeholder:font-normal w-[400px]'/>
                <box-icon name='search' color="white"></box-icon>
                <span className='h-[90%] border-[1px] border-white/50 ml-2'></span>
                <input type="search" placeholder='Municipio' className='bg-inherit placeholder:text-white placeholder:font-normal h-full w-[400px] pl-[15px]'/>
                <box-icon name='current-location' color="white"></box-icon>
          </div>
          {/* buttons */}
          <NavLink to="/studentsPublications" className="mx-auto">
          <button className='border-[2px] border-white text-white font-semibold w-[280px] mx-auto mt-8 h-[50px] rounded-[5px]'>Buscar Trabajo</button>
          </NavLink>
        </div>

      <div className='h-[230px] w-full' style={{ backgroundImage: `url(${background})`, backgroundSize: 'cover',backgroundRepeat: 'no-repeat', backgroundPosition: 'center'}}></div>
      </header>
      <main className='h-[650px] bg-Blanco-cremoso flex justify-center gap-10 pt-10'>
        {/* estudiantes */}
        <section className='flex flex-col items-end'>
          <div className='w-[700px] h-[450px] bg-Gris-claro py-4 px-4 rounded-[10px] overflow-hidden'>
              <h1 className='font-normal pb-3'>Estudiantes</h1>
              <div className='h-[450px] overflow-scroll overflow-x-hidden rounded-[10px] pb-12'>
              { students.map( (student) => (
                  <TarjetaPublicacion listStudent={student} key={student.id}/>
                  ))}
              </div>
            </div>
            <NavLink to='/studentsPublications' className='bg-Azul-oscuro text-white mt-5 mx-10 w-[180px] h-[50px] font-normal rounded-[8px] flex items-center justify-center'>
            ver más
            </NavLink>
        </section>


          {/* Anuncios lalborales */}
          <section className='flex flex-col items-end'>
            <div className='w-[700px] h-[450px] bg-Gris-claro py-4 px-4 rounded-[10px] overflow-hidden'>
              <h1 className='font-normal pb-3'>Ofertas Laborales</h1>
              <div className='h-[450px] overflow-scroll overflow-x-hidden rounded-[10px] pb-12 px-[10px]'>
              { ofertas.map( (oferta) => (
                  <OfertaLaboral listStudent={oferta} key={oferta.id}/>
                  ))}
              </div>
            </div>
            <NavLink to='/OfferExploreStudent' className='bg-Azul-oscuro text-white mt-5 mx-10 w-[180px] h-[50px] font-normal rounded-[8px] flex items-center justify-center'>
            ver más
            </NavLink>
          </section>

      </main>
    </>
  )
}

export default Inicio;
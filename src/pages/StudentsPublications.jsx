import React from 'react'
import Navbar from '../components/Navbar'
import CarreraFiltro from '../components/CarreraFiltro'
import AreaTrabajo from '../components/AreaTrabajo'
import Municipio from '../components/Municipio'
import students from '../data/students'
import TarjetaPublicacion from '../components/TarjetaPublicacion'

const OfferExploreStudent = () => {
return (
    <>
        <header>
            <Navbar />
        </header>
        <main className='bg-Blanco-cremoso h-auto mt-[6px] pt-28 space-y-8'>
            {/* <section className='w-[95%] h-[100px] bg-Filters border-[1px] border-Azul-oscuro/50 mx-auto rounded-[10px] flex items-center px-5 justify-between'>

            <div className='w-[700px] flex justify-between'>
                <div className='relative'>
                    <CarreraFiltro />
                </div>
                <div className='relative'>
                    <AreaTrabajo />
                </div>
                <div className='relative'>
                    <Municipio />
                </div>
            </div>

            <div className='w-auto flex gap-5 items-center '>
                <p className='font-normal'>Ordenar por</p>
                <div>
                    <button className='py-[10px] px-5 rounded-[5px] border-[1px] bg-Azul-Fuerte text-white font-normal'>Relevantes</button>
                    <button className='py-[10px] px-5 active:border-[1px] border-Azul-Fuerte rounded-[5px] font-normal'>Recientes</button>
                </div>
            </div>

            </section> */}

            <section className='w-[90%] mx-auto'>
                {students.map( (student) => (
                        <TarjetaPublicacion listStudent={student} key={student.id}/>
                ))}

            </section>
        </main>
    </>
)
}

export default OfferExploreStudent

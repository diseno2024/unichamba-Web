import React from 'react'
import dataPage from '../data/OfferData'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom'

const [uno, dos, tres] = dataPage

const DetailsOffer = () => {

    return (
        <>
            <header>
                <Navbar />
            </header>
            
            <div className=' bg-Blanco-cremoso w-full h-full pb-10'>
                <main className='pt-28 w-[90%] mx-auto'>

                    <div>
                        <NavLink to="/OfferExploreStudent">
                            <box-icon name='arrow-back'></box-icon>
                        </NavLink>
                    </div>
                    <div className='w-full mx-auto my-12  pb-3 rounded-[10px] shadow border-[1px] border-black '>
                        <img className='h-[200px] w-[100%] rounded-t-[10px]' src="./public/instalacion-electrica.jpg" alt="imagen-trabajo" />
                        <div className='my-4 ml-5 font-normal text-black'>
                            <h1 className='font-normal text-4xl mb-0'>{uno.puesto}</h1>
                            <p className='my-3 ml-2'>{uno.municipio}</p>
                            <p className='ml-2 my-2 font-semibold text-gray-600'>Descripcion del Empleo:</p>
                            <p className='mx-2 my-2'>{uno.descripcion}</p>
                            <p className='ml-2 my-2 mt-5 font-semibold text-gray-600'> Carrera(s) Afin(es):</p>
                            <p className='mx-2 my-2'>
                                {uno.carreras}
                            </p>
                        </div>
                    </div>

                </main>

            </div>

        </>
    )
}

export default DetailsOffer

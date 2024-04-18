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
            <div>
                <NavLink to="/studentPublications">
                    <box-icon name='arrow-back'></box-icon>
                </NavLink>
            </div>
            <div className='w-[95%] mx-auto my-12  pb-3 rounded shadow border-2 border-black'>
                <img className='h-[200px] w-[100%]' src="./public/instalacion-electrica.jpg" alt="" />
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

        </>
    )
}

export default DetailsOffer

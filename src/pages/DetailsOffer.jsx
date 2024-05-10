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
            <div className='bg-black relative '>
                <img className='w-full h-[450px] opacity-30' src="./public/portadadetalle.png" alt="" /> {/**imagen de fondo */}
                <NavLink to="/OfferExploreStudent">
                <img className='absolute top-20 z-50 px-7 pt-7 w-[100px]  h-[70px]' src='./public/arrow-back-blanco.png' alt="" />
                </NavLink> {/**flecha */}
                <div className='absolute top-[160px] z-50 w-[100%] h-[200px] px-[100px] py-6 text-white'>
                    <p className='font-[350] my-7 text-4xl'>Detalles del Trabajo:</p>
                    <p className='font-[400] my-7 text-6xl'>Auxiliar Contable</p>
                </div>
            </div>      
            <main className='flex '>
                <div className='ml-20 mt-5 min-w-[400px] max-w-[900px]'>
                    <div className='flex items-center'>
                        <span> <img src="./public/icono-capsule.svg" alt="" /> </span>
                        <span className='text-2xl mx-2 font-[420]'> Descripcion del empleo</span>
                    </div>
                    <p className='mx-[29px] my-4 font-[300]'>Estamos en busca de un profesional dedicado para asistir en labores contables clave. Esta persona será responsable de mantener la salud financiera de nuestra empresa, asegurando una gestión precisa y diligente de los registros contable.</p>

                    <div className='flex items-center'>
                        <span><img src="./public/icono-capsule.svg" alt="" /> </span>
                        <span className='text-2xl mx-2 font-[420]'>Carreras Afines</span>
                    </div>
                    <p className='mx-[29px] my-4  font-[300]'>
                       Lic. Ciencias de la Adminsitracion
                    </p>

                    <div className='flex items-center'>
                        <span> <img src="./public/icono-location.svg" alt="" /> </span>
                        <span className='mx-2 my-4  font-[420]'>Metapán-Santa Ana</span>
                    </div>
                </div>
                <div className='my-5 mx-5'>
                    {/**Espacio para imagen img */}
                    <img className='min-w-[200px] max-w-[375px]' src="./public/imagenpredeterminadaempleo.svg" alt="" />
                    <NavLink to="/OfferExploreStudent">
                    <div className='flex justify-center my-4'>
                        <button className='bg-Malachite py-2 font-[400] px-20 rounded-[10px] text-white'> Ver más Trabajos</button>
                    </div>
                    </NavLink>
                    {/**Espacio para el boton */}
                </div>
            </main>
        </>
    )
}

export default DetailsOffer

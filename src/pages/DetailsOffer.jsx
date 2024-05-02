import React from 'react'
import dataPage from '../data/OfferData'
import Navbar from '../components/Navbar'
import { NavLink } from 'react-router-dom'
import NavGeneral from '../components/NavGeneral'


const [uno, dos, tres] = dataPage

const DetailsOffer = () => {

    return (
        <>
            {/* <header>
            <Navbar/>
        </header> */}
            <header>
                <Navbar />
            </header>
            {/* <div className='pt-[150px] bg-black'>
                <div className='bg-portadadeDetalle  w-full h-[300px]  bg-cover'>

                    <img className='px-7 pt-7 w-[100px] h-[70px]' src='./public/arrow-back-blanco.png' alt="" />

                    <div className='w-[100%] h-[200px] px-[100px] py-6 text-white'>
                        <p className='font-[350] my-7 text-4xl'>Detalles del Trabajo:</p>
                        <p className='font-[400] my-7 text-6xl'>Auxiliar Contable</p>
                    </div>


                </div>
            </div> */}

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
            {/* <div className="grid grid-cols-12">
                <div className="col-span-6 bg-blue-200">Elemento 1 (6 columnas)</div>
                <div className="col-span-3 bg-green-200">Elemento 2 (3 columnas)</div>
                <div className="col-span-3 bg-yellow-200">Elemento 3 (3 columnas)</div>
            </div> */}

            {/* <header>
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

            </div> */}

        </>
    )
}

export default DetailsOffer

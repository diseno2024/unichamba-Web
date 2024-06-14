import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../data/firebase';
import Navbar from '../components/Navbar';
import { NavLink, useParams } from 'react-router-dom';

const DetailsOffer = () => {
    const { idOferta } = useParams(); // Obtenemos el parámetro de la ruta
    const [oferta, setOferta] = useState(null); // Estado para almacenar los datos de la oferta

    const fetchDetalleOferta = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "anuncios"));
            const OfertaData = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }));
            const ofertaFiltrada = OfertaData.find(oferta => oferta.id === idOferta);
            setOferta(ofertaFiltrada);
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    useEffect(() => {
        fetchDetalleOferta();
        // return () => {
        //     fetchDetalleOferta();
        // }
    }, [idOferta]);

    if (!oferta) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header>
                {/* <Navbar /> */}
                <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
                    <NavLink to="/inicio">
                        <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
                    </NavLink>
                </nav>
            </header>

            <main className='relative'>

                <section className='mt-[100px] px-20'>
                    <NavLink to="/OfferExploreStudent">
                        <img className='px-42 w-[30px] pt-5' src='/public/bx-arrow-back.svg' alt="" />
                    </NavLink> 
                    <p className='font-[550] my-7 text-4xl text-blue-900'>Detalles del Trabajo:</p>
                </section>

                <section className='flex'>

                    <div className='ml-20 mt-5 min-w-[400px] max-w-[700px]'>
                        <div className='flex items-center'>
                            <span><img src="/quienpublica.svg" alt="" /></span>
                            <span className='text-2xl mx-2 font-[420]'>Publicado por: </span> 
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>
                            {oferta.quienPublica}
                        </p>
                        <div className='flex items-center'>
                            <span><img src="/icono-capsule.svg" alt="" /></span>
                            <span className='text-2xl mx-2 font-[420]'>Descripcion del empleo</span>
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>{oferta.description}</p>

                        <div className='flex items-center'>
                            <span><img src="/carrera.svg" alt="" /></span>
                            <span className='text-2xl mx-2 font-[420]'>Carreras Afines</span>
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>
                            {oferta.carrera ? oferta.carrera.join(', ') : 'No especificado'}
                        </p>

                        <div className='px-5 pt-10'>
                            <NavLink to="/OfferExploreStudent">
                                <button className='text-white text-xl font-semibold flex items-center bg-Malachite h-[55px] w-[200px] justify-center rounded-[8px]'>Ver más Trabajos</button>
                            </NavLink>
                        </div>
                    </div>

                </section>

                <div className='absolute top-16 right-20'>
                    <img className='w-[500px] h-[550px]' src={oferta.imagen || "/imagenpredeterminadaempleo.svg"} alt="Imagen de la oferta" /> 
                </div>


            </main>
            {/* <div>
                <NavLink to="/OfferExploreStudent">
                    <img className='px-7 w-[90px] mt-10 pt-20' src='/public/bx-arrow-back.svg' alt="" />
                </NavLink> 
                <div className=' px-[100px] py-6 text-blue-900'>
                    <p className='font-[550] my-7 text-4xl'>Detalles del Trabajo:</p>
                </div>
            </div>      
            <main className='flex'>
                <div className='ml-20 mt-5 min-w-[400px] max-w-[700px]'>
                    <div className='flex items-center'>
                        <span><img src="/public/quienpublica.svg" alt="" /></span>
                        <span className='text-2xl mx-2 font-[420]'>Publicado por: </span> 
                    </div>
                    <p className='mx-[29px] my-4 font-[300]'>
                        {oferta.quienPublica}
                    </p>
                    <div className='flex items-center'>
                        <span><img src="/icono-capsule.svg" alt="" /></span>
                        <span className='text-2xl mx-2 font-[420]'>Descripcion del empleo</span>
                    </div>
                    <p className='mx-[29px] my-4 font-[300]'>{oferta.description}</p>

                    <div className='flex items-center'>
                        <span><img src="/carrera.svg" alt="" /></span>
                        <span className='text-2xl mx-2 font-[420]'>Carreras Afines</span>
                    </div>
                    <p className='mx-[29px] my-4 font-[300]'>
                        {oferta.carrera ? oferta.carrera.join(', ') : 'No especificado'}
                    </p>

                    

                </div>
                <div className='mx-5 border border-black'>
                    <img className='min-w-[450px] max-w-[550px]' src={oferta.imagen || "/imagenpredeterminadaempleo.svg"} alt="Imagen de la oferta" /> 
                    <NavLink to="/OfferExploreStudent">
                        <div className='flex justify-center my-4'>
                            <button className='bg-Malachite py-2 font-[400] px-20 rounded-[10px] text-white'>Ver más Trabajos</button>
                        </div>
                    </NavLink>
                </div>
            </main> */}
        </>
    );
}

export default DetailsOffer;

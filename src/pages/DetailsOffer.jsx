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

                <section className='mt-[110px] px-20'>
                    <NavLink to="/OfferExploreStudent">
                    <span class="material-symbols-outlined">arrow_back</span>
                    </NavLink> 
                    <p className='font-[550] my-7 text-4xl text-blue-900'>Detalles del Trabajo:</p>
                </section>

                <section className='flex'>

                    <div className='ml-20 mt-5 min-w-[400px] max-w-[700px]'>
                        <div className='flex items-center'>
                        <span class="material-symbols-outlined">person</span>
                            <span className='text-2xl mx-2 font-[420]'>Publicado por: </span> 
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>
                            {oferta.quienPublica}
                        </p>
                        <div className='flex items-center'>
                        <span class="material-symbols-outlined">pill</span>

                            <span className='text-2xl mx-2 font-[420]'>Descripcion del empleo</span>
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>{oferta.description}</p>

                        <div className='flex items-center'>
                        <span class="material-symbols-outlined">school</span>
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
        </>
    );
}

export default DetailsOffer;

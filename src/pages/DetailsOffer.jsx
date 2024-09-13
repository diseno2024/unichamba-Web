import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../data/firebase';
import Navbar from '../components/Navbar';
import { NavLink, useParams } from 'react-router-dom';

const DetailsOffer = () => {
    const { idOferta } = useParams();
    const [oferta, setOferta] = useState(null);

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
    }, [idOferta]);

    if (!oferta) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <header>
                {/* <Navbar /> */}
                <nav className="h-[90px] flex items-center justify-between px-4 md:px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
                    <NavLink to="/inicio">
                        <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" className="h-10" />
                    </NavLink>
                </nav>
            </header>

            <main className='relative'>
                <section className='mt-[110px] px-4 md:px-20'>

                    <NavLink to="/OfferExploreStudent">
                        <span className="material-symbols-outlined">arrow_back</span>
                    </NavLink>
                    <p className='font-[550] my-7 text-2xl md:text-4xl text-blue-900'>Detalles del Trabajo:</p>
                </section>

                <section className='grid md:grid-cols-2 gap-4'>
                    <div className='my-5 md:mt-0 flex justify-center'>
                        <img
                            className='w-[300px] h-[350px] md:w-[450px] md:h-[400px] object-contain'
                            src={oferta.imagen || "/imagenpredeterminadaempleo.svg"}
                            alt="Imagen de la oferta"
                        />
                    </div>
                    <div className='ml-4 md:ml-20 mt-5 min-w-[300px] max-w-full'>
                        <div className='flex items-center'>
                            <span className="material-symbols-outlined">person</span>
                            <span className='text-xl md:text-2xl mx-2 font-[420]'>Publicado por:</span>
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>
                            {oferta.quienPublica}
                        </p>
                        <div className='flex items-center'>
                            <span className="material-symbols-outlined">pill</span>
                            <span className='text-xl md:text-2xl mx-2 font-[420]'>Descripción del empleo</span>
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>{oferta.description}</p>

                        <div className='flex items-center'>
                            <span className="material-symbols-outlined">school</span>
                            <span className='text-xl md:text-2xl mx-2 font-[420]'>Carreras Afines</span>
                        </div>
                        <p className='mx-[29px] my-4 font-light text-lg'>
                            {oferta.carrera ? oferta.carrera.join(', ') : 'No especificado'}
                        </p>

                        <div className='px-5 py-10'>
                            <NavLink to="/OfferExploreStudent">
                                <button className='text-white text-lg md:text-xl font-semibold flex items-center bg-Malachite h-[45px] md:h-[55px] w-[180px] md:w-[200px] justify-center rounded-[8px]'>
                                    Ver más Trabajos
                                </button>
                            </NavLink>
                        </div>
                    </div>


                </section>
            </main>
        </>
    );
}

export default DetailsOffer;

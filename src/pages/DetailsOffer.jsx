import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore";
import { db } from '../data/firebase';
import Navbar from '../components/Navbar';
import { NavLink, useParams } from 'react-router-dom';
import axios from 'axios';

const DetailsOffer = () => {
    const { idOferta } = useParams();// Obtengo el parametro de la pagina, en este caso el ID del anuncio
    const [oferta, setOferta] = useState(null);

    const fetchDetalleOferta = async () => {
        try {
            const auth = { //Credenciales para acceder ala DB
                username: "unichamba", // Cambia esto por tu usuario
                password: "S3pt13mbre#2024Work", // Cambia esto por tu contraseña
              };

              const response = await axios.get(
                `https://couchdbbackend.esaapp.com/unichamba-anuncios/${idOferta}`,
                { auth }
              );
            
            const fetchedOffer= response.data;
            console.log(fetchedOffer)
            setOferta(fetchedOffer)

            // console.log(idOferta);
            // console.log(ofertaFiltrada);
        } catch (error) {
            console.error("Error fetching document:", error);
        }
    };

    useEffect(() => {
        fetchDetalleOferta();
    }, [idOferta]);

    if (!oferta) {
        return ( //Spinner de carga mientras trae la data o no la encuentre
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-blue-900"></div>
            </div>
        );
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
                    <div className='my-2 md:my-1 flex justify-center'>
                        <img
                            className='w-[300px] h-[375px] md:w-[475px] md:h-[550px] object-contain'
                            src={oferta.imagen || "/imagenpredeterminadaempleo.svg"}
                            alt="Imagen de la oferta"
                        />
                    </div>
                    <div className='mx-4 md:mx-2 my-2 min-w-[300px] max-w-full'>
                        <div className='flex items-center'>
                            <span className="material-symbols-outlined">person</span>
                            <span className='text-xl md:text-2xl mx-2 font-[420]'>Publicado por:</span>
                        </div>
                        <p className='mx-[40px] my-4 font-light text-lg'>
                            {oferta.quienPublica}
                        </p>
                        <div className='flex items-center'>
                            <span className="material-symbols-outlined">pill</span>
                            <span className='text-xl md:text-2xl mx-2 font-[420]'>Descripción del empleo</span>
                        </div>
                        <p className='mx-[40px] my-4 font-light text-lg'>{oferta.description}</p>

                        <div className='flex items-center'>
                            <span className="material-symbols-outlined">school</span>
                            <span className='text-xl md:text-2xl mx-2 font-[420]'>Carreras Afines</span>
                        </div>
                        <p className='mx-[40px] my-4 font-light text-lg'>
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

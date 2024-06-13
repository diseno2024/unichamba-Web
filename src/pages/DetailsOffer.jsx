// import React from 'react'
// import dataPage from '../data/OfferData'
// import Navbar from '../components/Navbar'
// import { NavLink, useParams } from 'react-router-dom'



// const [uno, dos, tres] = dataPage

// const DetailsOffer = () => {
//     const { idOferta } = useParams(); // Obtenemos el parámetro de la ruta

//     // Aquí podrías usar idOferta para cargar datos específicos de la oferta
//     console.log('ID de la oferta:', idOferta);
//     return (
//         <>
//             <header>
//                 <Navbar />
//             </header>
//             <div className='bg-black relative '>
//                 <img className='w-full h-[450px] opacity-30' src="./public/portadadetalle.png" alt="" /> {/**imagen de fondo */}
//                 <NavLink to="/OfferExploreStudent">
//                 <img className='absolute top-20 z-50 px-7 pt-7 w-[100px]  h-[70px]' src='./public/arrow-back-blanco.png' alt="" />
//                 </NavLink> {/**flecha */}
//                 <div className='absolute top-[160px] z-50 w-[100%] h-[200px] px-[100px] py-6 text-white'>
//                     <p className='font-[350] my-7 text-4xl'>Detalles del Trabajo:</p>
//                     <p className='font-[400] my-7 text-6xl'>Auxiliar Contable</p>
//                 </div>
//             </div>      
//             <main className='flex '>
//                 <div className='ml-20 mt-5 min-w-[400px] max-w-[900px]'>
//                     <div className='flex items-center'>
//                         <span> <img src="./public/icono-capsule.svg" alt="" /> </span>
//                         <span className='text-2xl mx-2 font-[420]'> Descripcion del empleo</span>
//                     </div>
//                     <p className='mx-[29px] my-4 font-[300]'>Estamos en busca de un profesional dedicado para asistir en labores contables clave. Esta persona será responsable de mantener la salud financiera de nuestra empresa, asegurando una gestión precisa y diligente de los registros contable.</p>

//                     <div className='flex items-center'>
//                         <span><img src="./public/icono-capsule.svg" alt="" /> </span>
//                         <span className='text-2xl mx-2 font-[420]'>Carreras Afines</span>
//                     </div>
//                     <p className='mx-[29px] my-4  font-[300]'>
//                        Lic. Ciencias de la Adminsitracion
//                     </p>

//                     <div className='flex items-center'>
//                         <span> <img src="./public/icono-location.svg" alt="" /> </span>
//                         <span className='mx-2 my-4  font-[420]'>Metapán-Santa Ana</span>
//                     </div>
//                 </div>
//                 <div className='my-5 mx-5'>
//                     {/**Espacio para imagen img */}
//                     <img className='min-w-[200px] max-w-[375px]' src="./public/imagenpredeterminadaempleo.svg" alt="" />
//                     <NavLink to="/OfferExploreStudent">
//                     <div className='flex justify-center my-4'>
//                         <button className='bg-Malachite py-2 font-[400] px-20 rounded-[10px] text-white'> Ver más Trabajos</button>
//                     </div>
//                     </NavLink>
//                     {/**Espacio para el boton */}
//                 </div>
//             </main>
//         </>
//     )
// }

// export default DetailsOffer
// import React from 'react'
// import dataPage from '../data/OfferData'
// import Navbar from '../components/Navbar'
// import { NavLink, useParams } from 'react-router-dom'



// const [uno, dos, tres] = dataPage

// const DetailsOffer = () => {
//     const { idOferta } = useParams(); // Obtenemos el parámetro de la ruta

//     // Aquí podrías usar idOferta para cargar datos específicos de la oferta
//     console.log('ID de la oferta:', idOferta);

//     const fetchDetalleOferta =()=>{
//         const querySnapshot = collection(db, "anuncios");
//         const OfertaData = querySnapshot.docs.map(doc => doc.data());
    
//     }

    
//     return (
//         <>
//             <header>
//                 <Navbar />
//             </header>
//             <div className='bg-black relative '>
//                 <img className='w-full h-[450px] opacity-30' src="./public/portadadetalle.png" alt="" /> {/**imagen de fondo */}
//                 <NavLink to="/OfferExploreStudent">
//                 <img className='absolute top-20 z-50 px-7 pt-7 w-[100px]  h-[70px]' src='./public/arrow-back-blanco.png' alt="" />
//                 </NavLink> {/**flecha */}
//                 <div className='absolute top-[160px] z-50 w-[100%] h-[200px] px-[100px] py-6 text-white'>
//                     <p className='font-[350] my-7 text-4xl'>Detalles del Trabajo:</p>
//                     <p className='font-[400] my-7 text-6xl'>Auxiliar Contable</p>
//                 </div>
//             </div>      
//             <main className='flex '>
//                 <div className='ml-20 mt-5 min-w-[400px] max-w-[900px]'>
//                     <div className='flex items-center'>
//                         <span> <img src="./public/icono-capsule.svg" alt="" /> </span>
//                         <span className='text-2xl mx-2 font-[420]'> Descripcion del empleo</span>
//                     </div>
//                     <p className='mx-[29px] my-4 font-[300]'>Estamos en busca de un profesional dedicado para asistir en labores contables clave. Esta persona será responsable de mantener la salud financiera de nuestra empresa, asegurando una gestión precisa y diligente de los registros contable.</p>

//                     <div className='flex items-center'>
//                         <span><img src="./public/icono-capsule.svg" alt="" /> </span>
//                         <span className='text-2xl mx-2 font-[420]'>Carreras Afines</span>
//                     </div>
//                     <p className='mx-[29px] my-4  font-[300]'>
//                        Lic. Ciencias de la Adminsitracion
//                     </p>

//                     <div className='flex items-center'>
//                         <span> <img src="./public/icono-location.svg" alt="" /> </span>
//                         <span className='mx-2 my-4  font-[420]'>Metapán-Santa Ana</span>
//                     </div>
//                 </div>
//                 <div className='my-5 mx-5'>
//                     {/**Espacio para imagen img */}
//                     <img className='min-w-[200px] max-w-[375px]' src="./public/imagenpredeterminadaempleo.svg" alt="" />
//                     <NavLink to="/OfferExploreStudent">
//                     <div className='flex justify-center my-4'>
//                         <button className='bg-Malachite py-2 font-[400] px-20 rounded-[10px] text-white'> Ver más Trabajos</button>
//                     </div>
//                     </NavLink>
//                     {/**Espacio para el boton */}
//                 </div>
//             </main>
//         </>
//     )
// }

// export default DetailsOffer
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
            // console.log('Oferta Filtrada:', ofertaFiltrada); // Añadir el console.log aquí
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
                <Navbar />
            </header>
            <div className='bg-black relative '>
                <img className='w-full h-[350px] opacity-30' src="/public/portadadetalle.png" alt="" /> {/** Imagen de fondo */}
                <NavLink to="/OfferExploreStudent">
                    <img className='absolute top-20 z-50 px-7 pt-7 w-[100px] h-[70px]' src='/public/arrow-back-blanco.png' alt="" />
                </NavLink> {/** Flecha */}
                <div className='absolute top-[160px] z-50 w-[100%] h-[200px] px-[100px] py-6 text-white'>
                    <p className='font-[350] my-7 text-4xl'>Detalles del Trabajo:</p>
                    {/* <p className='font-[400] my-7 text-6xl'>{oferta.titulo}</p> * Cambia "Auxiliar Contable" a {oferta.titulo} */}
                </div>
            </div>      
            <main className='flex'>
                <div className='ml-20 mt-5 min-w-[400px] max-w-[700px]'>
                    <div className='flex items-center'>
                        <span><img src="/public/icono-capsule.svg" alt="" /></span>
                        <span className='text-2xl mx-2 font-[420]'>Descripcion del empleo</span>
                    </div>
                    <p className='mx-[29px] my-4 font-[300]'>{oferta.description}</p> {/** Cambia la descripción estática a {oferta.descripcion} */}

                    <div className='flex items-center'>
                        <span><img src="/public/icono-capsule.svg" alt="" /></span>
                        <span className='text-2xl mx-2 font-[420]'>Carreras Afines</span>
                    </div>
                    <p className='mx-[29px] my-4 font-[300]'>
                        {oferta.carrera ? oferta.carrera.join(', ') : 'No especificado'} {/** Asegúrate de que "carreras" sea un array en tu documento */}
                    </p>

                    <div className='flex items-center'>
                        <span><img src="/public/quienpublica.svg" alt="" /></span>
                        <span className='text-2xl mx-2 my-4 font-[420]'>Publicado por: </span> {/** Cambia "Metapán-Santa Ana" a {oferta.ubicacion} */}
                    </div>
                    <p className='mx-[29px] my-4 font-[300]'>
                        {oferta.quienPublica} {/** Asegúrate de que "carreras" sea un array en tu documento */}
                    </p>

                </div>
                <div className='my-5 mx-5'>
                    {/** Espacio para imagen img */}
                    <img className='min-w-[450px] max-w-[550px]' src={oferta.imagen || "/public/imagenpredeterminadaempleo.svg"} alt="Imagen de la oferta" /> {/** Cambia la imagen a {oferta.imagen} */}
                    <NavLink to="/OfferExploreStudent">
                        <div className='flex justify-center my-4'>
                            <button className='bg-Malachite py-2 font-[400] px-20 rounded-[10px] text-white'>Ver más Trabajos</button>
                        </div>
                    </NavLink>
                    {/** Espacio para el botón */}
                </div>
            </main>
        </>
    );
}

export default DetailsOffer;

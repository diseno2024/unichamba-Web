import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from '../data/firebase'; // Ajusta esta ruta según la ubicación de tu archivo de Firebase

const OfertaLaboral = () => {
    const [ofertasLaborales, setOfertasLaborales] = useState([]);
    const location = useLocation();

    // Función para cargar las ofertas laborales desde Firestore
    const fetchOfertasLaborales = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "anuncios"));
            const anuncios = [];
            querySnapshot.forEach((doc) => {
                anuncios.push(doc.data());
            });
            setOfertasLaborales(anuncios);
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        fetchOfertasLaborales();
    }, []);

    return (
        <>
            {ofertasLaborales.map((oferta) => (
                <div key={oferta.title} className={location.pathname === '/OfferExploreStudent' ? 'min-h-[225px] py-3 px-5 flex justify-between mb-6 border-b-[1px] border-black/40' : 'py-3 px-3 flex justify-between mb-3 border-b-2 hover:bg-Malachite/10'}>
                    <div className='flex items-center gap-4'>
                        <div className='min-h-[200px] min-w-[200px] flex items-center justify-start '>
                            <img src={`https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2020/11/empresas-en-el-Buen-Fin-que-estan-contratando-768x461.jpg`} style={{ width: '225px', height: '173px' }} alt="imagen oferta" />
                        </div>
                        <div className='min-h-[160px] '>
                            <h1 className='text-2xl font-normal text-Blue min-w-max'>{oferta.title}</h1>
                            <h2 className='flex flex-nowrap font-normal text-Dark-Blue mt-2 mr-2'>
                                <span className="material-symbols-outlined">location_on</span>
                                {oferta.direction}
                            </h2>
                            <h2 className='text-md font-normal pt-3 text-Dark-Blue overflow-hidden min-w-[320px] h-8'>{oferta.description}</h2>
                            <div className='flex justify-end pt-2 text-md min-w-[300px] text-Dark-Blue font-normal absolute '>
                                {oferta.carrera}
                            </div>
                        </div>
                    </div>
                   
                </div>
            ))}
        </>
    );
};

export default OfertaLaboral;

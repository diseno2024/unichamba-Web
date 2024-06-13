import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../data/firebase'; // Ajusta esta ruta según la ubicación de tu archivo de Firebase

const OfertaLaboral = ({ carrerasSeleccionadas }) => {
    const [ofertasLaborales, setOfertasLaborales] = useState([]);
    const location = useLocation();

    // Función para cargar las ofertas laborales desde Firestore
    const fetchOfertasLaborales = async () => {
        try {
            //Aquí traemos todos los anuncios desde firebase
            const q = collection(db, "anuncios");
            const avisosSnapshot = await getDocs(q);
            const avisos = avisosSnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

            if (carrerasSeleccionadas[0]) {
                //filtramos todos los avisos
                const avisosFiltrados = avisos.filter(oferta =>
                    carrerasSeleccionadas.some(carrera => oferta.carrera.includes(carrera))
                );
                setOfertasLaborales(avisosFiltrados);
            } else {
                // Si no hay carreras seleccionadas, mostrar todos los avisos
                setOfertasLaborales(avisos);
            }
        
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        fetchOfertasLaborales();
        return () => {
            fetchOfertasLaborales()
        }
    }, [carrerasSeleccionadas]);

    return (
        <>
            {ofertasLaborales.length === 0 ? (
                <div className="py-3 px-5 text-center text-Dark-Blue text-4xl">
                    <p>No hay anuncios que mostrar.</p>
                </div>
            ) : (
                ofertasLaborales.map((oferta) => (
                    location.pathname === '/OfferExploreStudent' ? (
                        <NavLink key={oferta.id} to={`/anuncios/${oferta.id}`} className='min-h-[235px] min-w-[200px] py-3 px-5 flex justify-between mb-6 border-b-[1px] border-black/40 hover:bg-Malachite/15 cursor-pointer'>
                            <div className='flex items-center gap-5 relative'>
                                <div className='min-h-[170px] min-w-[190px] flex items-center justify-start'>
                                    <img src={oferta.imagenSmall} style={{ width: '183px', height: '170px' }} alt="imagen oferta" />
                                </div>
                                <div className='min-h-[195px] grid justify-items-end'>
                                    <div className="mb-5">
                                        <p className='text-md font-normal pt-3 text-Dark-Blue justify-items-stretch text-justify'>
                                            {oferta.description.length > 200 ? `${oferta.description.slice(0, 200)}...` : oferta.description}
                                        </p>
                                        <p className='text-md font-normal pt-3 text-Dark-Blue'> <strong>Publicado por:</strong> {oferta.quienPublica}</p>
                                    </div>
                                    <div className='absolute bottom-0 right-0 text-md min-w-[10px] text-Dark-Blue font-normal'>
                                        {oferta.carrera.slice(0, 1).map((carrera, index) => (
                                            <span key={index} className="mx-1"> <strong>{carrera}</strong></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ) : (
                        <NavLink key={oferta.id} to={`/anuncios/${oferta.id}`} className='min-h-[300px] py-3 px-3 mt-3 flex justify-between mb-3 border-b-2 hover:bg-Malachite/15'>
                            <div className='flex items-center gap-3 relative'>
                                <div className='min-h-[250px] min-w-[190px] grid justify-items-start'>
                                    <img src={oferta.imagenSmall} style={{ width: '183px', height: '200px' }} alt="imagen oferta" />
                                </div>
                                <div className='min-h-[275px] grid justify-items-end'>
                                    <div className="mb-5">
                                        <p className='text-md font-normal pt-3 text-Dark-Blue justify-items-stretch text-justify'>
                                            {oferta.description.length > 200 ? `${oferta.description.slice(0, 200)}...` : oferta.description}
                                        </p>
                                        <p className='text-md font-normal pt-3 text-Dark-Blue'> <strong>Publicado por:</strong> {oferta.quienPublica}</p>
                                    </div>
                                    <div className='absolute bottom-0 right-0 text-md min-w-[10px] text-Dark-Blue font-normal'>
                                        {oferta.carrera.slice(0, 1).map((carrera, index) => (
                                            <span key={index} className="mx-1"> <strong>{carrera}</strong></span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    )
                ))
            )}
        </>
    );
};

export default OfertaLaboral;

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../data/firebase'; // Ajusta esta ruta según la ubicación de tu archivo de Firebase

const OfertaLaboral = ({ carreraSeleccionada }) => {
    const [ofertasLaborales, setOfertasLaborales] = useState([]);
    const location = useLocation();

    // Función para cargar las ofertas laborales desde Firestore
    const fetchOfertasLaborales = async () => {
        try {
            const querySnapshot = collection(db, "anuncios");
            /* const anuncios = []; */
            console.log(carreraSeleccionada)
            if (carreraSeleccionada != null) {
                /* Se cambio la manera de obtener los datos ya que no cambiaba al seleccionar la carrera al hacerlo de la manera comentada */
                /* anunciosSeleccionados.forEach((doc) => {
                    anuncios.push(doc.data());
                });
                setOfertasLaborales(anuncios); */
                const anunciosSeleccionados = query(querySnapshot, where('carrera', 'array-contains', carreraSeleccionada))
                await getDocs(anunciosSeleccionados)
                    .then((resp) => {
                        setOfertasLaborales(resp.docs.map((doc) => {
                            return { ...doc.data(), id: doc.id }
                        }))
                    })
            } else {
                /* querySnapshot.forEach((doc) => {
                    anuncios.push(doc.data());
                });
                setOfertasLaborales(anuncios); */
                await getDocs(querySnapshot)
                    .then((resp) => {
                        setOfertasLaborales(resp.docs.map((doc) => {
                            return { ...doc.data(), id: doc.id }
                        }))
                    })
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
    }, [carreraSeleccionada]);

    return (
        <>
            {ofertasLaborales.length === 0 ? (
                <div className="py-3 px-5 text-center text-Dark-Blue text-4xl">
                    <p>No hay anuncios que mostrar.</p>
                </div>
            ) : (
                ofertasLaborales.map((oferta) => (
                    location.pathname === '/OfferExploreStudent' ? (
                        <div key={oferta.title} className='min-h-[235px] min-w-[200px] py-3 px-5 flex justify-between mb-6 border-b-[1px] border-black/40 hover:bg-Malachite/15 cursor-pointer'>
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
                        </div>
                    ) : (
                        <div key={oferta.title} className='min-h-[300px] py-3 px-3 mt-3 flex justify-between mb-3 border-b-2 hover:bg-Malachite/15'>
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
                        </div>
                    )
                ))
            )}



        </>
    );
};

export default OfertaLaboral;

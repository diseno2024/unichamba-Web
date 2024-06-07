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
            if (carreraSeleccionada != null) {
                /* Se cambio la manera de obtener los datos ya que no cambiaba al seleccionar la carrera al hacerlo de la manera comentada */
                /* anunciosSeleccionados.forEach((doc) => {
                    anuncios.push(doc.data());
                });
                setOfertasLaborales(anuncios); */
                const anunciosSeleccionados = query(querySnapshot, where('carrera', '==', carreraSeleccionada))
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
            {ofertasLaborales.map((oferta) => (
                <div key={oferta.title} className={location.pathname === '/OfferExploreStudent' ? 'min-h-[225px] min-w-[150px] py-3 px-5 flex justify-between mb-6 border-b-[1px] border-black/40  hover:bg-Malachite/30' : ' min-h-[275px] py-3 px-3 flex justify-between mb-3 border-b-2 hover:bg-Malachite/10'}>
                    <div className='flex items-center gap-4 relative'> {/* Añadir relative aquí */}
                        <div className='min-h-[200px] min-w-[200px] flex items-center justify-start '>
                            <img src={`https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2020/11/empresas-en-el-Buen-Fin-que-estan-contratando-768x461.jpg`} style={{ width: '225px', height: '173px' }} alt="imagen oferta" />
                        </div>
                        <div className='min-h-[160px]'>
                            <p className='text-md font-normal pt-3 text-Dark-Blue'>{oferta.description}</p>
                            <p className='text-md font-normal pt-3 text-Dark-Blue'>{oferta.quienPublica}</p>
                            {/* Mover carrera a la esquina inferior derecha */}
                            <div className='absolute bottom-0 right-0 text-md min-w-[50px] text-Dark-Blue font-normal'>
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

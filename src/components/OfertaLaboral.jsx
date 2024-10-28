import React, { useEffect, useState } from "react";
import {NavLink, useLocation } from "react-router-dom";
import axios from 'axios';


const OfertaLaboral = ({ carrerasSeleccionadas, carreraSeleccionadaNav }) => {
    const [ofertasLaborales, setOfertasLaborales] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Página actual
    const ofertasPorPagina = 25; // Número de ofertas por página
    const [pageRange, setPageRange] = useState({ start: 1, end: 5 }); // Rango de páginas visibles
    const location = useLocation();

    // Función para cargar las ofertas laborales desde CouchDB
    const fetchOfertasLaborales = async () => {
        try {
            const response = await axios.get("https://couchdbbackend.esaapp.com/unichamba-anuncios/_all_docs", {
                auth: {
                    username: "unichamba",
                    password: "S3pt13mbre#2024Work"
                },
                params: {
                    include_docs: true // Incluir documentos completos en la respuesta
                }
            });

            let avisos = response.data.rows.map(row => ({...row.doc, id: row.id}));
            // Filtrar por carrera seleccionada desde el NavBar
            if (carreraSeleccionadaNav) {
                avisos = avisos.filter(oferta => oferta.carrera.includes(carreraSeleccionadaNav));
            }

            // Filtrar adicionalmente por carreras seleccionadas (si las hay)
            if (carrerasSeleccionadas[0]) {
                const avisosFiltrados = avisos.filter(oferta =>
                    carrerasSeleccionadas.some(carrera => oferta.carrera.includes(carrera))
                );
                setOfertasLaborales(avisosFiltrados);
            } else {
                setOfertasLaborales(avisos);
            }

            setCurrentPage(1); // Resetear a la primera página después de aplicar el filtro
            setPageRange({ start: 1, end: 5 }); // Resetear rango de páginas visibles
        } catch (error) {
            console.error("Error fetching documents: ", error);
        }
    };

    useEffect(() => {
        fetchOfertasLaborales();
    }, [carrerasSeleccionadas, carreraSeleccionadaNav]);

    // Calcular la cantidad de páginas totales
    const totalPaginas = Math.ceil(ofertasLaborales.length / ofertasPorPagina);

    // Limitar ofertas según la página actual
    const indexOfLastOffer = currentPage * ofertasPorPagina;
    const indexOfFirstOffer = indexOfLastOffer - ofertasPorPagina;

    // Ofertas a mostrar se ajustan según el filtrado y la página actual
    const ofertasAMostrar = location.pathname === '/OfferExploreStudent'
        ? ofertasLaborales.slice(indexOfFirstOffer, indexOfLastOffer)
        : ofertasLaborales;

    // Función para cambiar la página
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Función para avanzar en el rango de páginas visibles
    const handleNextPageRange = () => {
        if (pageRange.end < totalPaginas) {
            setPageRange({ start: pageRange.start + 5, end: pageRange.end + 5 });
        }
    };

    // Función para retroceder en el rango de páginas visibles
    const handlePrevPageRange = () => {
        if (pageRange.start > 1) {
            setPageRange({ start: pageRange.start - 5, end: pageRange.end - 5 });
        }
    };

    // Crear botones para cada página en el rango actual
    const pageButtons = [];
    for (let i = pageRange.start; i <= Math.min(pageRange.end, totalPaginas); i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={` lg:py-2 lg:px-2 py-2 px-2 rounded ${currentPage === i ? 'bg-Malachite  text-Dark-Blue mx-0.5' : 'bg-Dark-Blue text-white mx-0.5'}`}>
                {i}
            </button>
        );
    }

    return (
        <>
            {ofertasAMostrar.length === 0 ? (
                <div className="flex py-3 px-5 text-center text-Dark-Blue text-4xl ">
                    <p>No hay anuncios que mostrar.</p>
                </div>
            ) : (
                <>
                    {ofertasAMostrar.map((oferta) => (
                        location.pathname === '/OfferExploreStudent' ? (
                            <NavLink key={oferta.id} to={`/anuncios/${oferta.id}`}
                                className='lg:min-h-[210px] lg:min-w-[100px] py-2 px-2 flex justify-between mb-6 lg:border-b-[1px] lg:border-black/40 hover:bg-Malachite/15 cursor-pointer '>
                                <div className='flex items-center gap-2 relative'>
                                    {/* foto (visible en pantallas grandes) */}
                                    <div className='lg:block md:block hidden min-h-[190px] min-w-[148px] items-center justify-start'>
                                        <img src={oferta.imagenSmall} style={{ width: '183px', height: '170px' }} alt="imagen oferta" />
                                    </div>
                                    {/* Foto (visible en pantallas pequeñas) */}
                                    <div className='block sm:hidden w-full min-h-[170px] items-center justify-center'>
                                        <img src={oferta.imagenSmall} className='w-[150px] h-[150px]' alt="imagen oferta" />
                                    </div>
                                    <div className='min-h-[180px] grid justify-items-end'>
                                        {/* texto (visible en pantallas grandes) */}
                                        <div className="mb-5 lg:block md:block hidden">
                                            <p className='text-sm font-normal pt-3 text-Dark-Blue justify-items-stretch '>
                                                {oferta.description.length > 200 ? `${oferta.description.slice(0, 100)}...` : oferta.description}
                                            </p>
                                            <p className='text-sm font-normal pt-3 text-Dark-Blue md:text-sm'> <strong>Publicado por:</strong> {oferta.quienPublica}</p>
                                        </div>
                                        {/* texto (visible en pantallas grandes) */}
                                        <div className="mb-5 block sm:hidden">
                                            <p className='text-sm font-normal pt-3 text-Dark-Blue justify-items-stretch '>
                                                {oferta.description.length > 200 ? `${oferta.description.slice(0, 150)}...` : oferta.description}
                                            </p>
                                        </div>
                                        <div className='absolute bottom-0 right-0 text-sm min-w-[25px] text-Dark-Blue font-normal'>
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
                                            <p className='text-md font-normal pt-3 text-Dark-Blue justify-items-stretch'>
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
                    ))}

                    {/* Números de página */}
                    {location.pathname === '/OfferExploreStudent' && (
                        <div className=" md:absolute md:top-0 md:right-0 md:h-[10px] bg-white flex justify-center items-center lg:min-w-[200px]  min-w-[200px] p-2  ">
                            <button
                                onClick={handlePrevPageRange}
                                disabled={pageRange.start === 1}
                                className="lg:py-2 lg:px-2 py-2 px-2 mx-0.5 bg-Dark-Blue text-white disabled:opacity-90">
                                {"<<"}
                            </button>
                            {pageButtons}
                            <button
                                onClick={handleNextPageRange}
                                disabled={pageRange.end >= totalPaginas}
                                className="lg:py-2 lg:px-2 py-2 px-2 mx-0.5 bg-Dark-Blue text-white disabled:opacity-90">
                                {">>"}
                            </button>
                        </div>
                    )}
                </>
            )}
        </>
    );
};

export default OfertaLaboral;
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarreraFiltro = ({ carreraSeleccionada, setCarreraSeleccionada }) => {
    const [carreras, setCarreras] = useState([]);
    const [carrerasMostradas, setCarrerasMostradas] = useState([]);
    const [mostrarBoton, setMostrarBoton] = useState(true);

    const fetchData = async () => {
        try {
            const auth = {
                username: 'unichamba', // Cambia por tu usuario
                password: 'S3pt13mbre#2024Work' // Cambia por tu contraseña
            };
    
            const response = await axios.get(
                'https://couchdbbackend.esaapp.com/unichamba-carreras/_all_docs?include_docs=true',
                { auth } // Incluir autenticación
            );
    
            const carrerasData = response.data.rows.map(row => row.doc.carrera); // Asegúrate de que 'carrera' sea el campo en CouchDB
            const carrerasOrdenadas = carrerasData.sort((a, b) => a.localeCompare(b)); // Orden alfabético
            setCarreras(carrerasOrdenadas);
            setCarrerasMostradas(carrerasOrdenadas.slice(0, 15)); // Mostrar solo las primeras 15 carreras inicialmente
    
            if (carrerasOrdenadas.length <= 15) {
                setMostrarBoton(false); // Ocultar el botón "Ver más" si hay menos de 15 carreras en total
            }
        } catch (error) {
            console.error('Error al obtener las carreras:', error.response ? error.response.data : error.message);
        }
    };
    

    useEffect(() => {
        fetchData();
    }, []);


    const seleccionarCarrera = (carrera) => {
        setCarreraSeleccionada(carrera);
    };

    const mostrarMasCarreras = () => {
        const nuevasCarrerasMostradas = carreras.slice(carrerasMostradas.length, carrerasMostradas.length + 5); // Mostrar 5 carreras más
        setCarrerasMostradas([...carrerasMostradas, ...nuevasCarrerasMostradas]);
        if (carrerasMostradas.length + nuevasCarrerasMostradas.length >= carreras.length) {
            setMostrarBoton(false); // Ocultar el botón "Ver más" cuando se han mostrado todas las carreras
        }
    };

    const reiniciarCarreras = () => {
        setCarrerasMostradas(carreras.slice(0, 15)); // Mostrar las primeras 15 carreras nuevamente
        setMostrarBoton(true); // Mostrar el botón "Ver más"
        setCarreraSeleccionada(null); // Reiniciar la carrera seleccionada
    };

    return (
        <>
            <div className='container'>
                <h3 className='flex flex-wrap font-normal pb-3 text-Dark-Blue'>
                    <span className="material-symbols-outlined mx-5">
                        filter_alt
                    </span>
                    FILTROS
                </h3>

                <form className='form font-normal text-Dark-Blue text-sm '>
                    <div className='flex flex-wrap justify-between pb-5'>
                        <h3 className='text-lg pb-1'>
                            Carreras
                        </h3>
                        <div className='flex justify-end mr-10'>
                            <button type='button' className='btn btn-secondary mt-1 text-black' onClick={reiniciarCarreras}><span class="material-symbols-outlined">
                                mop
                            </span></button>
                        </div>
                    </div>
                    {carrerasMostradas.map((carrera, index) => (
                        <div className='form-check' key={index}>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id={`carrera-${index}`}
                                checked={carreraSeleccionada === carrera}
                                onChange={() => seleccionarCarrera(carrera)}
                            />
                            <label className='form-check-label ms-2' htmlFor={` carrera-${index}` }>{carrera}</label>
                        </div>
                    ))}
                    {mostrarBoton && (
                        <button type='button' className='btn btn-primary mt-4 text-black' onClick={mostrarMasCarreras}>Ver Más..</button>
                    )}
                </form>

            </div>
        </>
    );
};

export default CarreraFiltro;




/*
import { useState } from 'react';
import listCarrers from '../data/carrers'
import { useLocation } from 'react-router-dom';

const CarreraFiltro = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation()
    return(
        <>
        <button className='bg-Gris-claro w-[200px] py-[10px] flex justify-between gap-10 rounded-[5px] active:text-white duration-300 font-normal px-5' onClick={() => setIsOpen((prev) => !prev)}>
            Carreras
            <span class="material-symbols-outlined">school</span>
        </button>
        {isOpen && <div className=" z-50 absolute bg-white text-Naranje border-[1px] flex flex-col items-start rounded-[5px] p-2 font-semibold w-[200px] h-[300px] overflow-scroll overflow-x-hidden top-12">
                    {listCarrers.map(({nombre, id}) => (
                        <div className="cursor-pointer w-full rounded-lg text-Azul-oscuro py-1 px-1" key={id}>
                            <h3 className='hover:bg-Azul-oscuro/20 rounded-lg px-2'>{nombre}</h3>
                        </div>
                    ))}
        </div>}
        </>
    )
}

export default CarreraFiltro
*/



/*
 <form className='form mt-6'>
                    <h3 className='pb-5'>
                        Municipios
                    </h3>
                    {carreras.map((carrera, index) => (
                        <div className='form-check' key={index}>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id={`carrera-${index}`}
                                checked={carreraSeleccionada === index}
                                onChange={() => seleccionarCarrera(index)}
                            />
                            <label className='form-check-label ms-2' htmlFor={`carrera-${index}`}>{carrera}</label>
                        </div>
                    ))}
                    {mostrarBoton && (
                        <button type='button' className='btn btn-primary mt-3 text-slate-700' onClick={mostrarMasCarreras}>Ver Más..</button>
                    )}
                    {!mostrarBoton && (
                        <button type='button' className='btn btn-secondary mt-3  text-slate-700' onClick={reiniciarCarreras}>Mostrar Menos...</button>
                    )}
                </form>
*/
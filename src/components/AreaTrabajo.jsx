import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AreadeTrabajo = ({ trabajoSeleccionado, setTrabajoSeleccionado }) => {
    const [trabajos, setTrabajos] = useState([]);
    const [trabajosMostrados, setTrabajosMostrados] = useState([]);
    const [mostrarBoton, setMostrarBoton] = useState(true);

    const fetchData = async () => {
        try {
            const auth = {
                username: 'unichamba', // Cambia por tu usuario
                password: 'S3pt13mbre#2024Work' // Cambia por tu contraseña
            };
    
            // Realizar la consulta a CouchDB
            const response = await axios.get(
                'https://couchdbbackend.esaapp.com/unichamba-trabajos/_all_docs?include_docs=true',
                { auth } // Incluir autenticación
            );
    
            const trabajosData = response.data.rows.map(row => row.doc.nombre); // Asegúrate de que 'nombre' sea el campo en CouchDB
            const trabajosOrdenados = trabajosData.sort((a, b) => a.localeCompare(b)); // Orden alfabético
            setTrabajos(trabajosOrdenados);
            setTrabajosMostrados(trabajosOrdenados.slice(0, 10)); // Mostrar solo los primeros 10 trabajos inicialmente
    
            if (trabajosOrdenados.length <= 10) {
                setMostrarBoton(false); // Ocultar el botón "Ver más" si hay menos de 10 trabajos en total
            }
        } catch (error) {
            console.error('Error al obtener los trabajos:', error.response ? error.response.data : error.message);
        }
    };
    

    useEffect(() => {
        fetchData();
        return () => {
            fetchData();
        }
    }, []);

    const seleccionarTrabajo = (trabajo) => {
        setTrabajoSeleccionado(trabajo);
    };

    const mostrarMasTrabajos = () => {
        const nuevosTrabajosMostrados = trabajos.slice(trabajosMostrados.length, trabajosMostrados.length + 5); // Mostrar 5 trabajos más más
        setTrabajosMostrados([...trabajosMostrados, ...nuevosTrabajosMostrados]);
        if (trabajosMostrados.length + nuevosTrabajosMostrados.length >= trabajos.length) {
            setMostrarBoton(false); // Ocultar el botón "Ver más" cuando se han mostrado todas las carreras
        }
    };

    const reiniciarTrabajos = () => {
        setTrabajosMostrados(trabajos.slice(0, 10)); // Mostrar las primeras 15 carreras nuevamente
        setMostrarBoton(true); // Mostrar el botón "Ver más"
        setTrabajoSeleccionado(null); // Reiniciar la carrera seleccionada
    };

    return (
        <>
            <div className='container'>
                <form className='form font-normal text-Dark-Blue text-sm '>
                    <div className='flex flex-wrap justify-between pb-5 mt-2'>
                        <h3 className='text-lg pb-1'>
                            Trabajos
                        </h3>
                        <div className='flex justify-end mr-10'>
                            <button type='button' className='btn btn-secondary mt-1 text-black' onClick={reiniciarTrabajos}><span class="material-symbols-outlined">
                                mop
                            </span></button>
                        </div>
                    </div>
                    {trabajosMostrados.map((trabajo, index) => (
                        <div className='form-check' key={index}>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id={ `carrera-${index} `}
                                checked={trabajoSeleccionado === trabajo}
                                onChange={() => seleccionarTrabajo(trabajo)}
                            />
                            <label className='form-check-label ms-2' htmlFor={ `carrera-${index} `}>{trabajo}</label>
                        </div>
                    ))}
                    {mostrarBoton && (
                        <button type='button' className='btn btn-primary mt-4 text-black' onClick={mostrarMasTrabajos}>Ver Más..</button>
                    )}
                </form>

            </div>
        </>
    );
};

export default AreadeTrabajo;
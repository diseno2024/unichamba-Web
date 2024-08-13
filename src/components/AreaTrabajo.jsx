import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';

const AreadeTrabajo = ({ trabajoSeleccionado, setTrabajoSeleccionado }) => {
    const [trabajos, setTrabajos] = useState([]);
    const [trabajosMostrados, setTrabajosMostrados] = useState([]);
    const [mostrarBoton, setMostrarBoton] = useState(true);

    const fetchData = async () => {
        try {
            const trabajosSnapshot = await getDocs(collection(db, 'trabajos')); // 'trabajos' es el nombre de tu colección en Firestore
            const trabajosData = trabajosSnapshot.docs.map(doc => doc.data().nombre); // Suponiendo que tienes un campo 'nombre' en tus documentos
            const trabajosOrdenados = trabajosData.sort((a, b) => a.localeCompare(b)); // Orden alfabético
            setTrabajos(trabajosOrdenados);
            setTrabajosMostrados(trabajosOrdenados.slice(0, 10)); // Mostrar solo los primeros 10 trabajos inicialmente
            if (trabajosOrdenados.length <= 10) {
                setMostrarBoton(false); // Ocultar el botón "Ver más" si hay menos de 10 trabajos en total
            }
        } catch (error) {
            console.error("Error fetching documents: ", error);
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
                                id={`carrera-${index}`}
                                checked={trabajoSeleccionado === trabajo}
                                onChange={() => seleccionarTrabajo(trabajo)}
                            />
                            <label className='form-check-label ms-2' htmlFor={`carrera-${index}`}>{trabajo}</label>
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

import React, { useState } from 'react';

// ACLARO ESTA FORMA COMO ESTA LA MODIFICARE CUANDO SE TENGA QUE TRABAJAR CON LA BASE DE DATOS, ESTO ES PREVENTIVO
// DE IGUAL FORMA VARIABLES Y COSAS ASI LAS CAMBIARE, AHORITA PARA VISUALIZAR COMO SE IRA VIENDO CON LA BASE DE DATOS
// QUE SE CREARA EN FIREBASE

const Municipio = () => {
    const carrerasIniciales = [
        'Candelaria de la Frontera',
        'Chalchuapa',
        'Coatepeque',
        'El Congo',
        'El Porvenir',
        'Masahuat',
        'Metapán',
        'San Antonio Pajonal',
        'San Sebastián Salitrillo',
        'Santa Ana',
        'Santa Rosa Guachipilín',
        'Santiago de la Frontera',
        'Texistepeque',
        // Agrega más carreras aquí
    ];

    const [carreras, setCarreras] = useState(carrerasIniciales.slice(0, 5)); // Mostrar las primeras 5 carreras inicialmente
    const [indiceMostrar, setIndiceMostrar] = useState(5);
    const [mostrarBoton, setMostrarBoton] = useState(true);
    const [carreraSeleccionada, setCarreraSeleccionada] = useState(null);

    const seleccionarCarrera = (index) => {
        setCarreraSeleccionada(index);
    };

    const mostrarMasCarreras = () => {
        const nuevasCarreras = carrerasIniciales.slice(indiceMostrar, indiceMostrar + 5); // Mostrar 5 carreras más
        setCarreras([...carreras, ...nuevasCarreras]);
        setIndiceMostrar(indiceMostrar + 5);
        if (indiceMostrar + 5 >= carrerasIniciales.length) {
            setMostrarBoton(false); // Ocultar el botón "Ver más" cuando se han mostrado todas las carreras
        }
    };

    const reiniciarCarreras = () => {
        setCarreras(carrerasIniciales.slice(0, 5)); // Mostrar las primeras 5 carreras nuevamente
        setIndiceMostrar(5);
        setMostrarBoton(true); // Mostrar el botón "Ver más"
        setCarreraSeleccionada(null); // Reiniciar la carrera seleccionada
    };

    return (
        <>
            <div className='container pt-4'>
               
                <form className='form  text-Dark-Blue font-normal'>
                    <h3 className='pb-3'>
                       Municipio
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
                        <button type='button' className='btn btn-primary mt-3 text-Blue' onClick={mostrarMasCarreras}>Ver Más..</button>
                    )}
                    {!mostrarBoton && (
                        <button type='button' className='btn btn-secondary mt-3  text-Blue' onClick={reiniciarCarreras}>Mostrar Menos...</button>
                    )}
                </form>
            </div>
        </>
    );
};

export default Municipio;

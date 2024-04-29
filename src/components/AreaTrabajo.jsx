import React, { useState } from 'react';

// ACLARO ESTA FORMA COMO ESTA LA MODIFICARE CUANDO SE TENGA QUE TRABAJAR CON LA BASE DE DATOS, ESTO ES PREVENTIVO
// DE IGUAL FORMA VARIABLES Y COSAS ASI LAS CAMBIARE, AHORITA PARA VISUALIZAR COMO SE IRA VIENDO CON LA BASE DE DATOS
// QUE SE CREARA EN FIREBASE

const AreasDeTrabajo = () => {
    const carrerasIniciales = [
        'Finanzas corporativas',
        'Marketing estratégico',
        'Gestión de recursos humanos',
        'Desarrollo de software',
        'Seguridad informática',
        'Ingeniería de sistemas',
        'Psicología clínica',
        'Psicología educativa',
        'Psicología organizacional',
        'Cirugía general',
        'Pediatría',
        'Cardiología',
        'Derecho penal',
        'Derecho civil',
        'Derecho laboral',
        // Agrega más áreas de trabajo aquí
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
            <div className='container pt-7'>
                <form className='form'>
                    <h3 className='pb-3'>
                      Areas de Trabajo
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

export default AreasDeTrabajo;




/**
 * 
 * const AreaTrabajo = () => {
return(
    <>
        <button className='bg-Gris-claro w-[220px] py-[10px] flex justify-between gap-10 rounded-[5px] active:text-white duration-300 font-normal px-6' onClick={() => setIsOpen((prev) => !prev)}>
            Area de trabajo
            <span class="material-symbols-outlined">work</span>
        </button>
    </>
)
} */
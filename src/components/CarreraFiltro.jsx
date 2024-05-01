import React, { useState } from 'react';

// ACLARO ESTA FORMA COMO ESTA LA MODIFICARE CUANDO SE TENGA QUE TRABAJAR CON LA BASE DE DATOS, ESTO ES PREVENTIVO
// DE IGUAL FORMA VARIABLES Y COSAS ASI LAS CAMBIARE, AHORITA PARA VISUALIZAR COMO SE IRA VIENDO CON LA BASE DE DATOS
// QUE SE CREARA EN FIREBASE

const CarreraFiltro = () => {
    const carrerasIniciales = [
        'Administración de Empresas',
        'Ingeniería Informática',
        'Psicología',
        'Medicina',
        'Derecho',
        'Arquitectura',
        'Contabilidad',
        'Ingeniería Civil',
        'Marketing',
        'Diseño Gráfico',
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
            <div className='container'>
                <h3 className=' flex flex-wrap font-normal justify-normal  pb-5 text-Dark-Blue'>
                    <span class="material-symbols-outlined mx-5">
                        filter_alt
                    </span>
                    FILTROS
                </h3>
                <form className='form font-normal text-Dark-Blue'>
                    <h3 className='pb-3'>
                        Carreras
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
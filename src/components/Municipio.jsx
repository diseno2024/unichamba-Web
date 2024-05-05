import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, getDocs } from 'firebase/firestore';

const CarreraFiltro = () => {
    const [municipios, setmunicipios] = useState([]);
    const [municipioSeleccionada, setmunicipioSeleccionada] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            const municipiosSnapshot = await getDocs(collection(db, 'municipios')); // 'carreras' es el nombre de tu colección en Firestore
            const municipiosData = municipiosSnapshot.docs.map(doc => doc.data().municipio); // Suponiendo que tienes un campo 'nombre' en tus documentos de carrera
            const municipiosOrdenadas = municipiosData.sort((a, b) => a.localeCompare(b)); // Orden alfabético
            setmunicipios(municipiosOrdenadas);
        };

        fetchData();
    }, []);

    const seleccionarCarrera = (index) => {
        setmunicipioSeleccionada(index);
    };

    return (
        <>
            <div className='container mt-5'>
                <form className='form font-normal text-Dark-Blue'>
                    <h3 className='pb-3'>
                        Municipios
                    </h3>
                    {municipios.map((carrera, index) => (
                        <div className='form-check' key={index}>
                            <input
                                type='checkbox'
                                className='form-check-input'
                                id={`municipio-${index}`}
                                checked={municipioSeleccionada === index}
                                onChange={() => seleccionarCarrera(index)}
                            />
                            <label className='form-check-label ms-2' htmlFor={`carrera-${index}`}>{carrera}</label>
                        </div>
                    ))}
                </form>
            </div>
        </>
    );
};

export default CarreraFiltro;

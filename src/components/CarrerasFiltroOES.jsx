import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CarrerasFiltro = ({ carrerasSeleccionadas, setCarrerasSeleccionadas}) => {
    const [carreras, setCarreras] = useState([]);
    const [carrerasMostradas, setCarrerasMostradas] = useState([]);
    const [mostrarBoton, setMostrarBoton] = useState(true);
    const [posicion, setposicion] = useState(0)

    const fetchData = async () => {
        try {
            const response = await axios.get("https://couchdbbackend.esaapp.com/unichamba-carreras/_all_docs", {
                auth: {
                    username: "unichamba",
                    password: "S3pt13mbre#2024Work"
                },
                params: {
                    include_docs: true // Incluir documentos completos
                }
            });

            const carrerasData = response.data.rows.map(row => row.doc.carrera); // Suponiendo que el campo 'carrera' está en los documentos
            const carrerasOrdenadas = carrerasData.sort((a, b) => a.localeCompare(b)); // Ordenar alfabéticamente
            setCarreras(carrerasOrdenadas);
            setCarrerasMostradas(carrerasOrdenadas.slice(0, 15)); // Mostrar solo las primeras 15 carreras
            if (carrerasOrdenadas.length <= 15) {
                setMostrarBoton(false); // Ocultar el botón "Ver más" si hay menos de 15 carreras
            }
        } catch (error) {
            console.error("Error fetching data from CouchDB: ", error);
        }
    };

    useEffect(() => {
        fetchData();
        return () => {
            fetchData();
        }
    }, []);

    const seleccionarCarrera = (carrera) => {
        if (posicion < 3) {//aquí agregra la carrera en la posicion que corresponde
            //primero se crea un array con las carreras seleccionadas
            const nuevoArray = [...carrerasSeleccionadas]
            //luego se agrega la carrera en el nuevoArray
            nuevoArray[posicion] = carrera
            setCarrerasSeleccionadas(nuevoArray)
            setposicion(posicion + 1)//aumento la posicion
        }
        if (posicion === 2){//cuando posicion es igual a 2 es cuand o ya se seleccionaron 3 carreras y se reinicia
            setposicion(0)
        }

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
        setCarrerasSeleccionadas([null, null, null])
        setposicion(0)
    };

    return (
        <>
            <div className='container'>
                <h3 className='flex flex-wrap font-normal pb-3 lg:text-Dark-Blue  text-Navbar  md:text-black'>
                    <span className="material-symbols-outlined mx-5">
                        filter_alt
                    </span>
                    FILTROS
                </h3>

                <form className='form font-normal lg:text-Dark-Blue text-sm text-Navbar md:text-Dark-Blue '>
                    <div className='flex flex-wrap justify-between pb-3 '>
                        <h3 className='text-lg pb-1'>
                            Carreras
                        </h3>
                        <div className='flex justify-end mr-10'>
                            <button type='button' className='btn btn-secondary lg:mt-1 text-Navbar lg:text-Dark-Blue  md:text-black' onClick={reiniciarCarreras}><span class="material-symbols-outlined">
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
                                checked={carrerasSeleccionadas.includes(carrera)}//Aquí chequea si la carrera esta en carrerasSeleccionadas
                                onChange={() => seleccionarCarrera(carrera)}
                            />
                            <label className='form-check-label ms-2 text-md' htmlFor={`carrera-${index}`}>{carrera}</label>
                        </div>
                    ))}
                    {mostrarBoton && (
                        <button type='button' className='btn btn-primary mt-4 text-Navbar lg:text-black  md:text-black' onClick={mostrarMasCarreras}>Ver Más..</button>
                    )}
                </form>

            </div>
        </>
    );
};

export default CarrerasFiltro;



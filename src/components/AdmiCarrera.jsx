import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';
import axios from 'axios';

const AdmiCarrera = () => {
    const [carreras, setCarreras] = useState([]);
    const [nuevaCarrera, setNuevaCarrera] = useState('');

    useEffect(() => {
        cargarCarreras();
    }, []);

    const cargarCarreras = async () => {
        try {
            const auth = {
                username: 'unichamba', // Cambia por tu usuario
                password: 'S3pt13mbre#2024Work' // Cambia por tu contraseña
            };
    
            const response = await axios.get(
                'https://couchdbbackend.esaapp.com/unichamba-carreras/_all_docs?include_docs=true',
                { auth } // Incluir autenticación
            );
    
            // Obtener tanto 'id' como 'carrera'
            const carrerasData = response.data.rows.map(row => ({
                id: row.doc._id,  // Asegúrate de usar el campo correcto que representa el id
                nombre: row.doc.carrera,
                rev:row.doc._rev
            }));
            const carrerasOrdenadas = carrerasData.sort((a, b) => a.nombre.localeCompare(b.nombre));
            setCarreras(carrerasOrdenadas);
        } catch (error) {
            console.error("Error al cargar carreras :/:", error);
            Swal.fire("Error", "Hubo un error al cargar las carreras", "error");
        }
    };

    const agregarCarrera = async () => {
        try {
            if (nuevaCarrera.trim() !== '') {
                // Verificar si la carrera ya existe
                const carreraExistente = carreras.some(carrera => carrera.nombre.toLowerCase() === nuevaCarrera.trim().toLowerCase());

                if (carreraExistente) {
                    Swal.fire("Error", "La carrera ya existe", "error");
                } else {
                    await axios.post("https://couchdbbackend.esaapp.com/unichamba-carreras", {
                        carrera: nuevaCarrera
                    }, {
                        auth: {
                            username: 'unichamba',
                            password: 'S3pt13mbre#2024Work'
                        }
                    });
                    await cargarCarreras();
                    Swal.fire("Agregado", "La carrera ha sido agregada", "success");
                    
                }
                // Vaciar el input después de intentar agregar
                setNuevaCarrera('');
            }
        } catch (error) {
            console.error("Error al agregar carrera:", error);
            Swal.fire("Error", "Hubo un error al agregar la carrera", "error");
        }
    };

    const eliminarCarrera = async (carrera) => {
        try {
            // Asegúrate de tener el campo _rev en el objeto carrera
            await axios.delete(`https://couchdbbackend.esaapp.com/unichamba-carreras/${carrera.id}?rev=${carrera.rev}`, {
                auth: {
                    username: 'unichamba',
                    password: 'S3pt13mbre#2024Work'
                }
            });
            await cargarCarreras();
            Swal.fire("Eliminado", `${carrera.nombre} ha sido eliminado`, "success");
        } catch (error) {
            console.error("Error al eliminar carrera:", error);
            Swal.fire("Error", "Hubo un error al eliminar la carrera", "error");
        }
    };
    

    const modificarCarrera = async (carrera, nuevoNombre) => {
        try {
            await axios.put(`https://couchdbbackend.esaapp.com/unichamba-carreras/${carrera.id}`, {
                // Mantener todos los datos originales y actualizar solo el campo de "carrera"
                _id: carrera.id,        // Incluye el ID
                _rev: carrera.rev,      // Incluye la revisión actual
                carrera: nuevoNombre    // Actualizar solo el campo de "carrera"
            }, {
                auth: {
                    username: 'unichamba',
                    password: 'S3pt13mbre#2024Work'
                }
            });
    
            await cargarCarreras(); // Recargar la lista completa de carreras desde la base de datos
            Swal.fire("Modificado", `${carrera.nombre} ha sido actualizado a ${nuevoNombre}`, "success");
        } catch (error) {
            console.error('Error al modificar la carrera:', error.response ? error.response.data : error.message);
            Swal.fire("Error", "No se pudo modificar la carrera", "error");
        }
    };
    

    const handleChange = (e) => {
        setNuevaCarrera(e.target.value);
    };

    return (
        <div className="container min-w-[300px] max-w-[900px] pt-7 px-10 mx-10 mt-7">
            <h2 className="text-3xl font-normal my-8">Carreras</h2>
            <div className="flex items-center space-x-10">
                <div className='flex space-x-1'>
                    <input type="text" value={nuevaCarrera} onChange={handleChange} placeholder="Agregar Carrera" className="border text-Dark-Blue font-medium border-Dark-Blue rounded-md px-4 py-2 min-w-[725px] max-w-[900px] " />
                    <button onClick={agregarCarrera} className="bg-Dark-Blue hover:bg-blue-600 text-white font-normal py-2 px-4 rounded-md flex justify-center">
                        <span className="material-symbols-outlined">
                            add_circle
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col list-disc mt-5 mb-4 space-y-3">
                <h1 className='font-[700] text-Blue my-2'>Carreras:</h1>
                {carreras.map(carrera => (
                    <div key={carrera.id} className="flex relative items-center text-Dark-Blue font-medium mb-3 pl-4 ml-1 min-h-14 hover:bg-Space-cadet/20 border-b-2">
                        <span>{carrera.nombre}</span>
                        <button onClick={() => Swal.fire({
                            title: `Eliminar la carrera ${carrera.nombre}`,
                            html: `<hr class="my-4"><p>¿Estás seguro de que deseas eliminar la carrera: ${carrera.nombre}?</p>`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                eliminarCarrera(carrera);
                            }
                        })} className='bg-red-600 text-white font-medium py-2 px-4 rounded-md ml-4 material-symbols-outlined absolute right-[88px]'>
                            <span className=' '>
                                delete
                            </span>
                        </button>
                        <button onClick={() => Swal.fire({
                            title: `Modificar la carrera ${carrera.nombre}`,
                            input: "text",
                            inputLabel: "Editar carrera",
                            inputValue: carrera.nombre,
                            icon: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Modificar",
                            cancelButtonText: "Cancelar",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                modificarCarrera(carrera, result.value);
                            }
                        })} className='bg-green-600 text-white font-medium py-2 px-4 rounded-md ml-4 material-symbols-outlined absolute right-6'>
                            <span className=' '>
                                edit_square
                            </span>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdmiCarrera;

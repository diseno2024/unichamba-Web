import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdmiMunicipio = () => {
    const [municipios, setMunicipios] = useState([]);
    const [nuevoMunicipio, setNuevoMunicipio] = useState('');
    const auth = {
        username: 'unichamba', // Cambia por tu usuario
        password: 'S3pt13mbre#2024Work' // Cambia por tu contraseña
    };

    useEffect(() => {
        cargarMunicipios();
    }, []);

    const cargarMunicipios = async () => {
        try {
            const response = await axios.get(
                'https://couchdbbackend.esaapp.com/unichamba-municipios/_all_docs?include_docs=true',
                { auth }
            );

            const municipiosData = response.data.rows.map(row => ({
                id: row.doc._id,
                nombre: row.doc.municipio,
                rev: row.doc._rev
            }));

            const municipiosOrdenadas = municipiosData.sort((a, b) => a.nombre.localeCompare(b.nombre));
            setMunicipios(municipiosOrdenadas);
        } catch (error) {
            console.error("Error al cargar los Municipios:", error);
            Swal.fire("Error", "Hubo un error al cargar los municipios", "error");
        }
    };

    const agregarMunicipio = async () => {
        try {
            if (nuevoMunicipio.trim() !== '') {
                const municipioExistente = municipios.some(
                    municipio => municipio.nombre.toLowerCase() === nuevoMunicipio.trim().toLowerCase()
                );

                if (municipioExistente) {
                    Swal.fire("Error", "El municipio ya existe", "error");
                } else {
                    const response = await axios.post(
                        'https://couchdbbackend.esaapp.com/unichamba-municipios',
                        { municipio: nuevoMunicipio },
                        { auth }
                    );
                    
                    const nuevoMunicipioData = {
                        id: response.data.id,
                        nombre: nuevoMunicipio,
                        rev: response.data.rev
                    };

                    setMunicipios(prev => [...prev, nuevoMunicipioData].sort((a, b) => a.nombre.localeCompare(b.nombre)));
                    Swal.fire("Agregado", "El municipio ha sido agregado", "success");
                    setNuevoMunicipio('');
                }
            }
        } catch (error) {
            console.error("Error al agregar el municipio:", error);
            Swal.fire("Error", "Hubo un error al agregar el municipio", "error");
        }
    };

    const eliminarMunicipio = async (municipio) => {
        try {
            await axios.delete(
                `https://couchdbbackend.esaapp.com/unichamba-municipios/${municipio.id}?rev=${municipio.rev}`,
                { auth }
            );

            setMunicipios(prev => prev.filter(m => m.id !== municipio.id));
            Swal.fire("Eliminado", `${municipio.nombre} ha sido eliminado`, "success");
        } catch (error) {
            console.error("Error al eliminar municipio:", error);
            Swal.fire("Error", "Hubo un error al eliminar el municipio", "error");
        }
    };

    const modificarMunicipio = async (municipio, nuevoNombre) => {
        try {
            const response = await axios.put(
                `https://couchdbbackend.esaapp.com/unichamba-municipios/${municipio.id}`,
                { municipio: nuevoNombre, _rev: municipio.rev },
                { auth }
            );

            setMunicipios(prev => prev.map(m =>
                m.id === municipio.id
                    ? { ...m, nombre: nuevoNombre, rev: response.data.rev }
                    : m
            ).sort((a, b) => a.nombre.localeCompare(b.nombre)));
            Swal.fire("Modificado", `${municipio.nombre} fue cambiado con éxito`, "success");
        } catch (error) {
            console.error("Error al modificar el Municipio:", error);
            Swal.fire("Error", "Hubo un error al modificar el municipio", "error");
        }
    };

    const handleChange = (e) => {
        setNuevoMunicipio(e.target.value);
    };

    return (
        <div className="container min-w-[300px] max-w-[900px] pt-7 px-10 mx-10 mt-7">
            <h2 className="text-3xl font-normal my-8">Municipios</h2>
            <div className="flex items-center space-x-10">
                <div className='flex space-x-1'>
                    <input type="text" value={nuevoMunicipio} onChange={handleChange} placeholder="Agregar Municipio" className="border text-Dark-Blue font-medium border-Dark-Blue rounded-md px-4 py-2 min-w-[725px] max-w-[900px] " />
                    <button onClick={agregarMunicipio} className="bg-Dark-Blue hover:bg-blue-600 text-white font-normal py-2 px-4 rounded-md flex justify-center">
                        <span className="material-symbols-outlined">
                            add_circle
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col list-disc mt-5 mb-4 space-y-3">
                <h1 className='font-[700] text-Blue my-2'>Municipios:</h1>
                {municipios.map(municipio => (
                    <div key={municipio.id} className="flex relative items-center text-Dark-Blue font-medium mb-3 pl-4 ml-1  min-h-14 hover:bg-Space-cadet/20 border-b-2 ">
                        <span>{municipio.nombre}</span>
                        <button onClick={() => Swal.fire({
                            title: `Eliminar el municipio ${municipio.nombre}`,
                            html: `<hr class="my-4"><p>¿Estás seguro de que deseas eliminar el Municipio: ${municipio.nombre}?</p>`,
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Sí, eliminar",
                            cancelButtonText: "Cancelar",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                eliminarMunicipio(municipio);
                            }
                        })} className='bg-red-600 text-white font-medium py-2 px-4 rounded-md ml-4 material-symbols-outlined absolute right-[88px]'>
                            <span className=' '>
                                delete
                            </span>
                        </button>
                        <button onClick={() => Swal.fire({
                            title: `Modificar el municipio ${municipio.nombre}`,
                            input: "text",
                            inputLabel: "Editar el municipio",
                            inputValue: municipio.nombre,
                            icon: "info",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Modificar",
                            cancelButtonText: "Cancelar",
                        }).then((result) => {
                            if (result.isConfirmed) {
                                modificarMunicipio(municipio, result.value);
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

export default AdmiMunicipio;

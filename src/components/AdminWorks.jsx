import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AdminWorks = () => {
    const [works, setWorks] = useState([]);
    const couchDBUrl = "https://couchdbbackend.esaapp.com/unichamba-trabajos";
    const auth = { username: "unichamba", password: "S3pt13mbre#2024Work" };

    const fetchData = async () => {
        try {
            const response = await axios.get(`${couchDBUrl}/_all_docs?include_docs=true`, { auth });
            const workData = response.data.rows.map(row => ({
                id: row.doc._id,
                _rev: row.doc._rev,
                nombre: row.doc.nombre,
                icono: row.doc.icono,
            }));
            setWorks(workData);
        } catch (error) {
            console.error("Error al obtener trabajos:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const eliminarTrabajo = async (work) => {
        try {
            await axios.delete(`${couchDBUrl}/${work.id}?rev=${work._rev}`, { auth });
            Swal.fire("Eliminado", `${work.nombre} ha sido eliminado`, "success");
            fetchData(); // Refresca la lista de trabajos
        } catch (error) {
            console.error("Error al eliminar trabajo:", error);
            Swal.fire("Error", "Hubo un error al eliminar el trabajo", "error");
        }
    };

    const agregarTrabajo = async (nombre, icono) => {
        try {
            const nuevoTrabajo = { nombre, icono };
            await axios.post(couchDBUrl, nuevoTrabajo, { auth });
            Swal.fire("Trabajo agregado con éxito", "", "success");
            fetchData(); // Refresca la lista de trabajos
        } catch (error) {
            console.error("Error al agregar trabajo:", error);
            Swal.fire("Error", "No se pudo agregar el trabajo", "error");
        }
    };

    const modalAgregarTrabajo = () => {
        Swal.fire({
            title: "Agregar un trabajo",
            html: `
            <div style="padding-bottom: 20px;">
                <label>Nombre del trabajo</label>
                <input id="nombreTrabajo" placeholder="Ingrese el nombre del trabajo" class="swal2-input" required>
            </div>
            <div style="padding-bottom: 20px;">
                <label>Icono del trabajo</label>
                <input id="iconoTrabajo" placeholder="Ingrese el tag correspondiente" class="swal2-input" required>
                <p style="margin-top: 15px; font-weight: 300;">Los iconos se extraen de <a href="https://fonts.google.com/icons" target="_blank" style="text-decoration: underline;">Google Icons</a></p>
            </div>
            `,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agregar",
            confirmButtonColor: "#04061A",
            preConfirm: () => {
                const nombre = document.getElementById('nombreTrabajo').value;
                const icono = document.getElementById('iconoTrabajo').value;
                return { nombre, icono };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const { nombre, icono } = result.value;
                agregarTrabajo(nombre, icono);
            }
        });
    };

    return (
        <main className='py-10'>
            <div className="w-[95%] mx-auto pl-14">
                <div className='flex justify-between my-5'>
                    <h1 className='text-3xl font-medium'>Trabajos</h1>
                    <button onClick={modalAgregarTrabajo} className="bg-Dark-Blue hover:bg-Dark-Blue/75 text-white font-normal py-2 px-4 rounded-md flex justify-center">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>
                </div>
                {works.map((work) => (
                    <div key={work.id} className='w-full'>
                        <div className="flex justify-between items-center transition ease-in-out delay-50 cursor-pointer duration-100 h-[100px]">
                            <div className='flex w-[65%] justify-between'>
                                <h1 className="font-medium text-blue-500 text-2xl">{work.nombre}</h1>
                                <span className="material-symbols-outlined" style={{ fontSize: 35, color: '#2D3250' }}>{work.icono}</span>
                            </div>
                            <div>
                                <button
                                    onClick={() => Swal.fire({
                                        title: `Eliminar el trabajo ${work.nombre}`,
                                        html: `<hr class="my-4"><p>¿Estás seguro de que deseas eliminar el trabajo: ${work.nombre}?</p>`,
                                        icon: "warning",
                                        showCancelButton: true,
                                        confirmButtonColor: "#3085d6",
                                        cancelButtonColor: "#d33",
                                        confirmButtonText: "Sí, eliminar",
                                        cancelButtonText: "Cancelar",
                                    }).then((result) => {
                                        if (result.isConfirmed) {
                                            eliminarTrabajo(work);
                                        }
                                    })}
                                    className='bg-red-600 text-white font-medium py-2 px-4 rounded-md material-symbols-outlined'>
                                    <span>delete</span>
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default AdminWorks;

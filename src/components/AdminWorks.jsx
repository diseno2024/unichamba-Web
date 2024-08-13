import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, addDoc } from 'firebase/firestore';
import { db } from '../data/firebase';
import Swal from 'sweetalert2';

const AdminWorks = () => {
    const [works, setWorks] = useState([]);

    const fetchData = async () => {
        const worksSnapshot = await getDocs(collection(db, 'trabajos'));
        const workData = worksSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        setWorks(workData);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const eliminarTrabajo = async (work) => {
        try {
            await deleteDoc(doc(db, 'trabajos', work.id));
            console.log(work.id);
            fetchData();
            Swal.fire("Eliminado", `${work.nombre} ha sido eliminado`, "success");
        } catch (error) {
            console.error("Error al eliminar trabajo:", error);
            Swal.fire("Error", "Hubo un error al eliminar el trabajo", "error");
        }
    };

    // Aqui se agrega el trabajo a la BD
    const agregarTrabajo = async ( trabajo, icono ) => {
        await addDoc(collection(db, 'trabajos'), {nombre: trabajo, icono: icono})
        fetchData()
    }

    const modalAgregarTrabajo = () => {
        Swal.fire({
            title: "Agregar un trabajo",
            html: `
            <div style="padding-bottom: 20px;">
            <label>Nombre del trabajo</label>
            <input id="nombreTrabajo" name="nombreTrabajo" placeholder="Ingrese el nombre del trabajo" class="swal2-input" required>
            </div>

            <div style="padding-bottom: 20px;">
            <label>Icono del trabajo</label>
            <input id="iconoTrabajo" name="iconoTrabajo" placeholder="Ingrese el tag correspondiente" class="swal2-input" required>
        <p style="margin-top: 15px; font-weight: 300;">Los iconos se extraen de <a href="https://fonts.google.com/icons" target="_blank" style="text-decoration: underline;">Google Icons</a></p>
            </div>
            `,

            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agregar",
            confirmButtonColor: "#04061A",
            preConfirm: async () => {
                const nombre = document.getElementById('nombreTrabajo').value
                const tag = document.getElementById('iconoTrabajo').value
                try {
                    const trabajoSnapshot= await getDocs(collection(db, 'trabajos'));

                    const trabajoExiste = trabajoSnapshot.docs.find( doc => doc.data().nombre === nombre )

                    if(trabajoExiste){
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Este trabajo ya existe"
                        })
                    } else {
                        agregarTrabajo(nombre, tag)
                        Swal.fire({
                            title: "Trabajo agregado con exito",
                            icon: "success"
                        })
                    }
                } catch (error) {
                    console.log(error)
                }
            }
            })
    }

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


import React, { useEffect, useState } from 'react'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase';
import Swal from 'sweetalert2';



const AdminWorks = () => { 
    
    const [works, setWorks] = useState  ([]);
    // const [nuevoTrabajo, setnuevoTrabajo] = useState('')
    // const [icono, seticono] = useState('')

    const fetchData = async () => {
        const worksSnapshot = await getDocs(collection(db, 'trabajos')); 
        const workData = worksSnapshot.docs.map(doc => doc.data());
        setWorks(workData); 
    }

    useEffect(() => {
        fetchData()
        
        return () => {
            fetchData()
        }
        
    }, [])
    //console.log(works)

    // agregar trabajo 


    // eliminar trabajo 
    const eliminarTrabajo = async (work) => {
        try {
            await deleteDoc(doc(db, 'trabajos', work.id));
            console.log(work.id)
            fetchData();
            Swal.fire("Eliminado", `${work.nombre} ha sido eliminado`, "success");
        } catch (error) {
            console.error("Error al eliminar trabajo:", error);
            Swal.fire("Error", "Hubo un error al eliminar el trabajo", "error");
        }
    };
    
    
    return (
        <main className='py-10'>
            <div className="w-[95%] mx-auto pl-14">
                <div className='flex justify-between my-5'>
                    <h1 className='text-3xl font-medium'>Trabajos</h1>
                    <button className="bg-Dark-Blue hover:bg-Dark-Blue/75 text-white font-normal py-2 px-4 rounded-md flex justify-center">
                        <span className="material-symbols-outlined">add_circle</span>
                    </button>                    
                </div>
                {works.map((work) => (
                    <div className=' w-full'>
                        <div key={ work.id } className=" flex justify-between items-center transition ease-in-out delay-50 cursor-pointer duration-100 h-[100px]">
                            <div className='flex w-[65%] justify-between'>
                                <h1 className="font-medium text-blue-500 text-2xl">{work.nombre}</h1>
                                <span class="material-symbols-outlined" style={{fontSize:35, color:'#2D3250'}}>{work.icono}</span>
                            </div>
                            <div>
                                <button onClick={() => Swal.fire({
                                title: `Eliminar El trabajo ${work.nombre}`,
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
                                })} className='bg-red-600 text-white font-medium py-2 px-4 rounded-md material-symbols-outlined'>
                                <span>delete</span>
                            </button>
                            {/* <button onClick={() => Swal.fire({
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
                                })} className='bg-green-600 text-white font-medium py-2 px-4 rounded-md material-symbols-outlined mx-2'>
                                    <span className=' '>
                                    edit_square
                            </span>
                            </button> */}
                        </div>
                    </div>
                </div>                
                ))}
            </div>
    </main>
    )
}

export default AdminWorks

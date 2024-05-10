import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { collection, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore"
import { db } from "../data/firebase"


const TrabajosUserAdmin = () => {
    /* Esta estructura es para traer la colección de firebase solo pones el nombre de la colección dentro de las comillas de linea 12 y renombrar los const*/
    const [trabajos, setTrabajos] = useState([])

    const fetchTrabajos = async () => {
        const trabajosRef = collection(db, 'anuncios')
        await getDocs(trabajosRef)
            .then((resp) => {
                setTrabajos(resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                }))
            })
    }


    const eliminarTrabajo = async (id) => {
        await deleteDoc(doc(db, 'anuncios', id));
        fetchTrabajos();
    }

    const modalEliminarTrabajo = (id) => {
        Swal.fire({
            title: "¿Seguro que quieres borrar esta oferta?",
            text: "¡No podrás recuperar esto!",
            icon: "warning|",
            showCancelButton: true,
            confirmButtonColor: "#161A30",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarTrabajo(id)
              Swal.fire({
                title: "¡Borrado!",
                text: "La oferta fue borrada exitosamente.",
                icon: "success"
              });
            }
          });
    }


    // useEffect(() => {
    //     return fetchTrabajos
    // }, [])

    useEffect(() => {
        fetchTrabajos();
        
        return () => {
            fetchTrabajos(); //linea modificada
        }
    }, [])
    

    return (
        <>
            {/* TITULO */}
            <div className=" w-[85%]">
                <h3 className=" mt-16 ml-20 font-normal text-2xl flex justify-end">Ofertas laborales</h3>
            </div>
            {/* OFERTAS LABORALES */}
            {/* Aquí solo usas un map en donde esta la colección y luego agregas los datos*/}
            {trabajos.map((trabajo) =>
                <div key={trabajo.id} className="my-[15px]">
                    <div className=" w-[80%] max-h-[150px] border-b-2 border-gray-500 ml-20 grid grid-cols-5 pb-10">
                        <div className="  col-span-4">
                            <span className=" pt-4 pl-4 font-normal text-Blue text-xl">{trabajo.title}</span>
                            <span class="material-symbols-outlined pl-3 pt-1">
                                location_on
                            </span>
                            <span className=" font-normal text-lg">{trabajo.direction}</span>
                            <p className=" pl-4 py-1 font-normal text-slate-800">{trabajo.emailEmployer}</p>
                            <p className=" pl-4 font-light">{trabajo.description}</p>
                        </div>
                        <div className=" flex justify-center items-center ">
                            <button onClick={ () => modalEliminarTrabajo(trabajo.id) }>
                            <span class="material-symbols-outlined text-3xl text-red-600">
                                delete
                            </span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TrabajosUserAdmin;
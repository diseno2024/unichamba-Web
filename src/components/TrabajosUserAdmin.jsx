import React, { useEffect, useState } from "react"
import Swal from "sweetalert2"
import { collection, getDocs, deleteDoc, updateDoc, doc, addDoc } from "firebase/firestore"
import { db } from "../data/firebase"


const TrabajosUserAdmin = () => {
    /* Esta estructura es para traer la colección de firebase solo pones el nombre de la colección dentro de las comillas de linea 12 y renombrar los const*/
    const [trabajos, setTrabajos] = useState([])
    let correos = []

    const fetchTrabajos = async () => {
        const trabajosRef = collection(db, 'anuncios')
        await getDocs(trabajosRef)
            .then((resp) => {
                setTrabajos(resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                }))
            })
    }

    useEffect(() => {
        fetchTrabajos();
        
        return () => {
            fetchTrabajos(); //linea modificada
        }
    }, [])

    const addBlacklist = async (correo) => {
        await addDoc(collection(db, 'listaNegra'), {correo: correo})
        for (let index = 0; index < trabajos.length; index++) {
            if(trabajos[index].quienPublica === correo){
                await deleteDoc(doc(db, 'anuncios', trabajos[index].id ))
            }
        }

        fetchTrabajos();

    }

    const editarAnuncio = async (id, descEditada) => {
        await updateDoc(doc(db, 'anuncios', id), {description : descEditada});
        fetchTrabajos();
    }

    const modalEliminarTrabajo = (correo) => {
        Swal.fire({
            title: "¿Seguro que quieres agregar este correo a lista negra?",
            text: "¡Todas las ofertas del usuario serán eliminadas!",
            icon: "warning|",
            showCancelButton: true,
            confirmButtonColor: "#161A30",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                addBlacklist(correo)
            Swal.fire({
                title: "¡Borrado!",
                text: "La oferta fue borrada exitosamente.",
                icon: "success"
            });
            }
        });
    }

    const modalEditarTrabajo = (id) => {
        Swal.fire({
            title: "Editar Anuncio",
            html:`
            <div>
                <label style="display: block; padding-bottom:20px;">Nueva descripcion</label>
                <textarea id="nuevaDescripcion" type="text" name="Descripcion" placeholder="Ingrese la nueva descripcion" class="swal2-input" cols="30" rows="10" required></textarea>
            </div>
            `,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agregar",
            confirmButtonColor: "#04061A",
            preConfirm: () => {
                const descEditada = document.getElementById("nuevaDescripcion").value;
                
                const esIgual = trabajos.find(doc => doc.description === descEditada)
                if(descEditada != "" && !esIgual){
                    editarAnuncio(id, descEditada);
                    Swal.fire({
                        title: "Anuncio modificado con exito",
                        icon: "success"
                    })
                }else{
                    Swal.fire({
                        title: "Error al modificar el anuncio",
                        icon: "error"
                    })
                }
            }
        })

    }

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
                            <p className=" pl-4 py-1 font-normal text-slate-800">{trabajo.quienPublica}</p>
                            <p className=" pl-4 font-light">{trabajo.description}</p>
                        </div>
                        { <div className=" flex justify-center items-center ">
                            <button onClick={ () => modalEliminarTrabajo(trabajo.quienPublica)} className=" bg-black rounded-lg p-1">
                            <span className="material-symbols-outlined text-3xl text-white">
                                list_alt_add
                            </span>
                            </button>
                            <button onClick={ () => modalEditarTrabajo(trabajo.id)} className=" bg-green-700 rounded-lg p-1 ml-5">
                            <span className="material-symbols-outlined text-3xl text-white">
                                edit
                            </span>
                            </button>
                        </div>}
                    </div>
                </div>
            )}
        </>
    )
}

export default TrabajosUserAdmin;
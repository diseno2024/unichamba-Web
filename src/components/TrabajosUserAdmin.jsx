import React, { useEffect, useState } from "react"
import { collection, getDocs } from "firebase/firestore"
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

    useEffect(() => {
        return fetchTrabajos
    }, [])

    return (
        <>
            {/* TITULO */}
            <div className=" w-[85%]">
                <h3 className=" mt-16 ml-20 font-normal text-2xl">Ofertas laborales</h3>
                <span class="material-symbols-outlined text-black text-4xl flex justify-end">
                    add_circle
                </span>
            </div>
            {/* OFERTAS LABORALES */}
            {/* Aquí solo usas un map en donde esta la colección y luego agregas los datos*/}

            {trabajos.map((trabajo) =>
                <div key={trabajo.id} className="my-[3px]">
                    <div className=" w-[80%] h-[150px] border-b-2 border-gray-500 ml-20 grid grid-cols-5">
                        <div className="  col-span-4">
                            <h1 className=" pt-4 pl-4 font-normal text-Blue text-xl">{trabajo.title}</h1>
                            <span class="material-symbols-outlined pl-3 pt-1">
                                location_on
                            </span>
                            <span className=" font-normal text-lg">{trabajo.direction}</span>
                            <p className=" pl-4 font-light">{trabajo.description}</p>
                        </div>
                        <div className=" flex justify-center gap-6 items-center ">
                            <span class="material-symbols-outlined text-3xl text-Blue">
                                edit
                            </span>
                            <span class="material-symbols-outlined text-3xl text-red-600">
                                delete
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default TrabajosUserAdmin;
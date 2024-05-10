import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AdmiCarrera = () => {
    const [carreras, setCarreras] = useState([]);
    const [nuevaCarrera, setNuevaCarrera] = useState('');

    useEffect(() => {
        cargarCarreras();
        return () => {
            cargarCarreras();
        }
    }, []);
    const cargarCarreras = async () => {
        try {
            const carrerasSnapshot = await getDocs(collection(db, 'carreras'));
            const carrerasData = carrerasSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().carrera }));
            setCarreras(carrerasData);
        } catch (error) {
            console.error("Error al cargar carreras:", error);
            Swal.fire("Error", "Hubo un error al cargar las carreras", "error");
        };
    }
        

    const agregarCarrera = async () => {
        try {
            if (nuevaCarrera.trim() !== '') {
                await addDoc(collection(db, 'carreras'), { carrera: nuevaCarrera });
                setNuevaCarrera('');
                cargarCarreras();
            }
        } catch (error) {
            console.error("Error al agregar carrera:", error);
            Swal.fire("Error", "Hubo un error al agregar la carrera", "error");
        }
    };

    const eliminarCarrera = async (carrera) => {
        try {
            await deleteDoc(doc(db, 'carreras', carrera.id));
            cargarCarreras();
            Swal.fire("Eliminado", `${carrera.nombre} ha sido eliminado`, "success");
        } catch (error) {
            console.error("Error al eliminar carrera:", error);
            Swal.fire("Error", "Hubo un error al eliminar la carrera", "error");
        }
    };

    const modificarCarrera = async (carrera, nuevoNombre) => {
        try {
            await updateDoc(doc(db, 'carreras', carrera.id), { carrera: nuevoNombre });
            cargarCarreras();
            Swal.fire("Modificado", `${carrera.nombre} fue cambiado con éxito`, "success");
        } catch (error) {
            console.error("Error al modificar carrera:", error);
            Swal.fire("Error", "Hubo un error al modificar la carrera", "error");
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
                    <input type="text" value={nuevaCarrera} onChange={handleChange} placeholder="Agregar Carrera" className="border text-Dark-Blue font-medium border-Dark-Blue rounded-md px-4 py-2 w-64" />
                    <button onClick={agregarCarrera} className="bg-Dark-Blue hover:bg-blue-600 text-white font-normal py-2 px-4 rounded-md">
                        <span className="material-symbols-outlined">
                            add_circle
                        </span>
                    </button>
                </div>
            </div>
            <div className="flex flex-col list-disc mt-5 mb-4 space-y-3">
                <h1 className='font-[700] text-Blue my-2'>Carreras:</h1>
                {carreras.map(carrera => (
                    <div key={carrera.id} className="flex items-center text-Dark-Blue font-medium mb-3 pl-4 ml-1 min-h-14 hover:bg-Space-cadet/20 border-b-2">
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
                        })} className='bg-red-600 text-white font-medium py-2 px-4 rounded-md ml-4 material-symbols-outlined   absolute right-48'>
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
                        })} className='bg-green-600 text-white font-medium py-2 px-4 rounded-md ml-4 material-symbols-outlined absolute right-32'>
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



































// import React, {useState, useEffect} from 'react'
// import {collection, getDocs, getDoc, deleteDoc} from 'firebase/firestore';
// import {db} from '../data/firebase'

// import Swal from 'sweetalert2';
// import withReactContent from 'sweetalert2-react-content'

// const MySwal = withReactContent(Swal)

// import React from 'react'

// const AdmiCarrera = () => {

//     //1- configuramos los hooks
//     const [carreras, setCarreras] = useState([])

//     //2 referenciamos a la DB firestore
//     const carrerasCollection = collection(db, 'carreras')
//     //3 Funcion para mostrar TODOS los docs
//     const getCarreras = async () => {
//         const data = await getDocs(carrerasCollection)
//         //  console.log(data.docs)
//         setCarreras(
//             data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
//         )
//         console.log(carreras)
//     }
//     //4 Funcion para eliminar un doc
//     const deleteCarrera = async (id) => {
//         const carreraDoc = doc(db, "carreras", id)
//         await deleteDoc(carreraDoc)
//         getCarreras()
//     }
//     //5 Funcion de confirmación para Sweet Alert 2

//     //6 Usamos useEffect
//     useEffect(() => {
//         getCarreras()
//     }, [])
//     // devolvemos vista de nuestro componente





//   return (
//     <>
    
    
    
//     </>
//   )
// }


// export default AdmiCarrera;
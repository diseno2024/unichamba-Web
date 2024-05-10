import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const AdmiCarrera = () => {
    const [carreras, setCarreras] = useState([]);
    const [nuevaCarrera, setNuevaCarrera] = useState('');
    const [carreraSeleccionada, setCarreraSeleccionada] = useState({ id: '', nombre: '' });

    useEffect(() => {
        const fetchCarreras = async () => {
            const carrerasSnapshot = await getDocs(collection(db, 'carreras'));
            const carrerasData = carrerasSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().carrera }));
            setCarreras(carrerasData);
        };

        fetchCarreras();
        return () => {
            fetchCarreras(); //linea modificada
        }
    }, []);

    const agregarCarrera = async () => {
        if (nuevaCarrera.trim() !== '') {
            await addDoc(collection(db, 'carreras'), { carrera: nuevaCarrera });
            setNuevaCarrera('');
            actualizarCarreras();
        }
    };

    const actualizarCarreras = async () => {
        const carrerasSnapshot = await getDocs(collection(db, 'carreras'));
        const carrerasData = carrerasSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().carrera }));
        setCarreras(carrerasData);
    };

    const seleccionarCarrera = (carrera) => {
        setCarreraSeleccionada(carrera);
    };

    const modificarCarrera = async () => {
        if (carreraSeleccionada.nombre.trim() !== '') {
            const carreraRef = doc(db, 'carreras', carreraSeleccionada.id);
            await updateDoc(carreraRef, { carrera: carreraSeleccionada.nombre });
            actualizarCarreras();
            setCarreraSeleccionada({ id: '', nombre: '' });
        }
    };

    const eliminarCarrera = async () => {
        if (carreraSeleccionada.id.trim() !== '') {
            const carreraRef = doc(db, 'carreras', carreraSeleccionada.id);
            await deleteDoc(carreraRef);
            actualizarCarreras();
            setCarreraSeleccionada({ id: '', nombre: '' });
        }
    };

    const cancelarModificacion = () => {
        setCarreraSeleccionada({ id: '', nombre: '' });
    };

    const handleChange = (e) => {
        const inputValue = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(inputValue)) {
            setNuevaCarrera(inputValue);
        }
    };


    return (
        <div className="container min-w-[300px] max-w-[900px] pt-7 px-10 mx-10 mt-7">
            <h2 className="text-3xl font-normal my-8">Carreras</h2>
            <div className="flex items-center space-x-10  ">

                <div className='flex space-x-1'>
                    <input type="text" value={nuevaCarrera} onChange={handleChange} placeholder="Agregar Carrera" className="border  text-Dark-Blue  font-medium border-Dark-Blue rounded-md px-4 py-2 w-64" />
                    <button onClick={agregarCarrera} className="bg-Dark-Blue hover:bg-blue-600 text-white font-normal py-2 px-4 rounded-md"><span className="material-symbols-outlined flex justify-center">
                        add_circle
                    </span></button>
                </div>

                {carreraSeleccionada.id && (
                    <div className=" mt-1 min-h-[115px]">
                        <h3 className="text-xl font-bold mb-2">Editar Carrera</h3>
                        <div className='flex '>
                            <input type="text" value={carreraSeleccionada.nombre} onChange={e => setCarreraSeleccionada({ ...carreraSeleccionada, nombre: e.target.value })} className="border  text-Dark-Blue  font-medium border-Dark-Blue rounded-md px-4 py-2 w-64" />
                            <button onClick={modificarCarrera} className="bg-green-500 flex justify-center hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md ml-4"><span className="material-symbols-outlined">
                                edit_square
                            </span></button>
                            <button onClick={eliminarCarrera} className="bg-red-500 flex justify-center hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md ml-2"><span className="material-symbols-outlined">
                                delete
                            </span></button>
                            <button onClick={cancelarModificacion} className="bg-gray-500 flex justify-center hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md ml-2"><span className="material-symbols-outlined">
                                cancel
                            </span></button>
                        </div>
                    </div>
                )}
            </div>
            <div className=" flex flex-col list-disc mt-5 mb-4 space-y-3 ">
                <h1 className='font-[700] text-Blue my-2'>Seleccione una Carrera para Modificar o Eliminar:</h1>
                {carreras.map(carrera => (
                    <div key={carrera.id} className="flex items-center text-Dark-Blue font-medium mb-3 pl-4 ml-1  min-h-14 hover:bg-Space-cadet/20  border-b-2 " >
                        <span onClick={() => seleccionarCarrera(carrera)} className="cursor-pointer">{carrera.nombre}</span>
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
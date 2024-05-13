import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AdmiMunicipio = () => {
    const [municipios, setMunicipios] = useState([]);
    const [nuevaMunicipio, setNuevaMunicipio] = useState('');

    useEffect(() => {
        cargarMunicipios();
        return () => {
            cargarMunicipios();
        }
    }, []);
    const cargarMunicipios = async () => {
        try {
            const municipiosSnapshot = await getDocs(collection(db, 'municipios'));
            const municipiosData = municipiosSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().municipio }));
            setMunicipios(municipiosData);
        } catch (error) {
            console.error("Error al cargar los Municipios:", error);
            Swal.fire("Error", "Hubo un error al cargar los municipios", "error");
        };
    }
        

    const agregarMunicipio = async () => {
        try {
            if (nuevaMunicipio.trim() !== '') {
                await addDoc(collection(db, 'municipios'), { municipio: nuevaMunicipio });
                setNuevaMunicipio('');
                cargarMunicipios();
            }
        } catch (error) {
            console.error("Error al agregar el municipio:", error);
            Swal.fire("Error", "Hubo un error al agregar el municipio", "error");
        }
    };

    const eliminarMunicipio= async (municipio) => {
        try {
            await deleteDoc(doc(db, 'municipios', municipio.id));
            cargarMunicipios();
            Swal.fire("Eliminado", `${municipio.nombre} ha sido eliminado`, "success");
        } catch (error) {
            console.error("Error al eliminar municipio:", error);
            Swal.fire("Error", "Hubo un error al eliminar el municipio", "error");
        }
    };

    const modificarMunicipio = async (municipio, nuevoNombre) => {
        try {
            await updateDoc(doc(db, 'municipios', municipio.id), { municipio: nuevoNombre });
            cargarMunicipios();
            Swal.fire("Modificado", `${municipio.nombre} fue cambiado con éxito`, "success");
        } catch (error) {
            console.error("Error al modificar el Municipio:", error);
            Swal.fire("Error", "Hubo un error al modificar el municipio", "error");
        }
    };

    const handleChange = (e) => {
        setNuevaMunicipio(e.target.value);
    };

    return (
        <div className="container min-w-[300px] max-w-[900px] pt-7 px-10 mx-10 mt-7">
            <h2 className="text-3xl font-normal my-8">Municipios</h2>
            <div className="flex items-center space-x-10">
                <div className='flex space-x-1'>
                    <input type="text" value={nuevaMunicipio} onChange={handleChange} placeholder="Agregar Municipio" className="border text-Dark-Blue font-medium border-Dark-Blue rounded-md px-4 py-2 min-w-[725px] max-w-[900px] " />
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
                            title: `Eliminar El municipio ${municipio.nombre}`,
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



















// import React, { useState, useEffect } from 'react';
// import { db } from '../data/firebase';
// import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

// const AdmiMunicipio = () => {
//     const [municipios, setMunicipios] = useState([]);
//     const [municipioSeleccionada, setMunicipioSeleccionada] = useState({ id: '', nombre: '' });

//     useEffect(() => {
//         const fetchMunicipios = async () => {
//             const municipiosSnapshot = await getDocs(collection(db, 'municipios'));
//             const municipiosData = municipiosSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().municipio }));
//             setMunicipios(municipiosData);
//         };

//         fetchMunicipios();
//         return () => {
//             fetchMunicipios(); //linea modificada
//         }
//     }, []);

//   ;

//     const actualizarMunicipios = async () => {
//         const municipiosSnapshot = await getDocs(collection(db, 'municipios'));
//         const municipiosData = municipiosSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().municipio }));
//         setMunicipios(municipiosData);
//     };

//     const seleccionarMunicipio = (municipio) => {
//         setMunicipioSeleccionada(municipio);
//     };

//     const modificarMunicipio = async () => {
//         if (municipioSeleccionada.nombre.trim() !== '') {
//             const municipioRef = doc(db, 'municipios', municipioSeleccionada.id);
//             await updateDoc(municipioRef, { municipio: municipioSeleccionada.nombre });
//             actualizarMunicipios();
//             setMunicipioSeleccionada({ id: '', nombre: '' });
//         }
//     };

//     const eliminarMunicipio = async () => {
//         if (municipioSeleccionada.id.trim() !== '') {
//             const municipioRef = doc(db, 'municipios', municipioSeleccionada.id);
//             await deleteDoc(municipioRef);
//             actualizarMunicipios();
//             setMunicipioSeleccionada({ id: '', nombre: '' });
//         }
//     };

//     const cancelarModificacion = () => {
//         setMunicipioSeleccionada({ id: '', nombre: '' });
//     };



//     return (
//         <div className="container mx-auto mt-5">
//             <h2 className="text-2xl font-normal mb-1">Municipios</h2>
//             <div className="flex items-center space-x-10  ">
//                 {municipioSeleccionada.id && (
//                     <div className=" mt-1 min-h-[125px]">
//                         <h3 className="text-xl font-bold mb-2">Editar Municipio</h3>
//                         <div className='flex '>
//                             <input type="text" value={municipioSeleccionada.nombre} onChange={e => setMunicipioSeleccionada({ ...municipioSeleccionada, nombre: e.target.value })} className="border  text-Dark-Blue  font-medium border-Dark-Blue rounded-md px-4 py-2 w-64" />
//                             <button onClick={modificarMunicipio} className="bg-green-500 flex justify-center hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md ml-4"><span className="material-symbols-outlined">
//                                 edit_square
//                             </span></button>
//                             <button onClick={eliminarMunicipio} className="bg-red-500 flex justify-center hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md ml-2"><span className="material-symbols-outlined">
//                                 delete
//                             </span></button>
//                             <button onClick={cancelarModificacion} className="bg-gray-500 flex justify-center hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-md ml-2"><span className="material-symbols-outlined">
//                                 cancel
//                             </span></button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//             <div className=" flex flex-col list-disc mt-5 mb-4 space-y-3 ">
//                 <h1 className='font-medium'>Seleccione un Municipio para Modificar o Eliminar:</h1>
//                 {municipios.map(municipio => (
//                     <div key={municipio.id} className="flex items-center text-Dark-Blue font-medium mb-3 pl-4 ml-1  min-h-14 hover:bg-Space-cadet/20  border-b-2 " >
//                         <span onClick={() => seleccionarMunicipio(municipio)} className="cursor-pointer">{municipio.nombre}</span>
//                     </div>

//                 ))}

//             </div>
//         </div>
//     );
// };

// export default AdmiMunicipio;
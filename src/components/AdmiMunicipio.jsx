import React, { useState, useEffect } from 'react';
import { db } from '../data/firebase';
import { collection, addDoc, deleteDoc, doc, updateDoc, getDocs } from 'firebase/firestore';

const AdmiMunicipio = () => {
    const [municipios, setMunicipios] = useState([]);
    const [municipioSeleccionada, setMunicipioSeleccionada] = useState({ id: '', nombre: '' });

    useEffect(() => {
        const fetchMunicipios = async () => {
            const municipiosSnapshot = await getDocs(collection(db, 'municipios'));
            const municipiosData = municipiosSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().municipio }));
            setMunicipios(municipiosData);
        };

        fetchMunicipios();
        return () => {
            fetchMunicipios(); //linea modificada
        }
    }, []);

  ;

    const actualizarMunicipios = async () => {
        const municipiosSnapshot = await getDocs(collection(db, 'municipios'));
        const municipiosData = municipiosSnapshot.docs.map(doc => ({ id: doc.id, nombre: doc.data().municipio }));
        setMunicipios(municipiosData);
    };

    const seleccionarMunicipio = (municipio) => {
        setMunicipioSeleccionada(municipio);
    };

    const modificarMunicipio = async () => {
        if (municipioSeleccionada.nombre.trim() !== '') {
            const municipioRef = doc(db, 'municipios', municipioSeleccionada.id);
            await updateDoc(municipioRef, { municipio: municipioSeleccionada.nombre });
            actualizarMunicipios();
            setMunicipioSeleccionada({ id: '', nombre: '' });
        }
    };

    const eliminarMunicipio = async () => {
        if (municipioSeleccionada.id.trim() !== '') {
            const municipioRef = doc(db, 'municipios', municipioSeleccionada.id);
            await deleteDoc(municipioRef);
            actualizarMunicipios();
            setMunicipioSeleccionada({ id: '', nombre: '' });
        }
    };

    const cancelarModificacion = () => {
        setMunicipioSeleccionada({ id: '', nombre: '' });
    };



    return (
        <div className="container mx-auto mt-5">
            <h2 className="text-2xl font-normal mb-1">Municipios</h2>
            <div className="flex items-center space-x-10  ">
                {municipioSeleccionada.id && (
                    <div className=" mt-1 min-h-[125px]">
                        <h3 className="text-xl font-bold mb-2">Editar Municipio</h3>
                        <div className='flex '>
                            <input type="text" value={municipioSeleccionada.nombre} onChange={e => setMunicipioSeleccionada({ ...municipioSeleccionada, nombre: e.target.value })} className="border  text-Dark-Blue  font-medium border-Dark-Blue rounded-md px-4 py-2 w-64" />
                            <button onClick={modificarMunicipio} className="bg-green-500 flex justify-center hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md ml-4"><span className="material-symbols-outlined">
                                edit_square
                            </span></button>
                            <button onClick={eliminarMunicipio} className="bg-red-500 flex justify-center hover:bg-red-600 text-white font-medium py-2 px-4 rounded-md ml-2"><span className="material-symbols-outlined">
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
                <h1 className='font-medium'>Seleccione un Municipio para Modificar o Eliminar:</h1>
                {municipios.map(municipio => (
                    <div key={municipio.id} className="flex items-center text-Dark-Blue font-medium mb-3 pl-4 ml-1  min-h-14 hover:bg-Space-cadet/20  border-b-2 " >
                        <span onClick={() => seleccionarMunicipio(municipio)} className="cursor-pointer">{municipio.nombre}</span>
                    </div>

                ))}

            </div>
        </div>
    );
};

export default AdmiMunicipio;
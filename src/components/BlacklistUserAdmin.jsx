import Swal from "sweetalert2"
import { useState } from "react"
import { useEffect } from "react"
import axios from "axios"


export const BlacklistUserAdmin = () => {

    const [listaNegra, setListaNegra] = useState([])
    const [docs, setDocs] = useState([])
    let alldocs = []

    // TRAE LA DATA DE LISTA NEGRA
    const fetchListaNegra = async () => {
        const getRequest = "https://couchdbbackend.esaapp.com/unichamba-listanegra/_all_docs?include_docs=True";
        const listaNegraSnapshot = await axios.get(getRequest, {auth: {username:"unichamba", password:"S3pt13mbre#2024Work"}});
        const rawListaNegra = listaNegraSnapshot.data.rows;
        const listaCompleta = rawListaNegra.map(document => ({
            ...document.doc,
            id: document.id,
            rev: document.value.rev,
        }))
        setListaNegra(listaCompleta);
    }

    useEffect(() => {
        // Se monta la data
        fetchListaNegra();
    }, [])

    // AGREGAR CORREO A LISTA NEGRA
    const agregarCorreo = async (correo) => {
        const postRequest = "https://couchdbbackend.esaapp.com/unichamba-listanegra/"
        await axios.post(postRequest, {correo: correo}, {
            auth: {username:"unichamba", password:"S3pt13mbre#2024Work"},
            headers: {"Content-Type":"application/json"}
        })
        fetchListaNegra();
    }

    // ELIMINA EL ESTUDIANTE CUYO CORREO FUE AGREGADO A LISTA NEGRA
    const eliminarCorreoEstudiante = async (id, rev) => {
        const getStudentStorage = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${id}`;
        const storage = await axios.get(getStudentStorage, {auth: {username:"unichamba", password:"S3pt13mbre#2024Work"}});

        const storageData = {
            rev: storage.data._rev,
        };

        const deleteStorageRequest = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${id}`
        await axios.delete(deleteStorageRequest, {params: {"rev": storageData.rev}, auth: {username:"unichamba", password:"S3pt13mbre#2024Work"}})

        const deleteStudentRequest = `https://couchdbbackend.esaapp.com/unichamba-estudiantes/${id}`
        await axios.delete(deleteStudentRequest, {params: {"rev": rev}, auth: {username:"unichamba", password:"S3pt13mbre#2024Work"}})
    }

    // OBTIENE TODOS LOS ANUNCIOS QUE CORRESPONDEN A UN MISMO CORREO 
    const obtenerAnuncios = async (correo) => {
        let bookmark = null;
        const limit = 25;
        const findAdvertRequest = "https://couchdbbackend.esaapp.com/unichamba-anuncios/_find";
        try {
            while (true) {
                const response = await axios.post(findAdvertRequest, { selector: { quienPublica: correo }, limit, bookmark }, { auth: { username: "unichamba", password: "S3pt13mbre#2024Work" } })

                alldocs = alldocs.concat(response.data.docs)
                if (response.data.docs.length < limit) {
                    break;
                }
                bookmark = response.data.bookmark;
            }
        } catch (error) {
            console.error("Error al obtener documentos:", error);
            return [];
        }
        setDocs(alldocs)
    }

    // ELIMINA EL/LOS ANUNCIO/S DEL EMPLEADOR CUYO CORREO FUE AGREGADO A LISTA NEGRA
    const eliminarCorreoEmpleador = async () => {
        // SE GUARDA EL FORMATO PARA ELIMINAR MASIVAMENTE LOS DOCUMENTOS
        const eliminarDocs = docs.map(doc => ({
            _id: doc._id,
            _rev: doc._rev,
            _deleted: true
        }))
        const keys = docs.map(doc => doc._id);

        // SE LLAMA LOS DOCUMENTOS DE STORAGE CORRESPONDIENTES AL ID DEL ANUNCIO
        const storageRequest = "https://couchdbbackend.esaapp.com/unichamba-anuncios-storage/_all_docs";
        const response = await axios.post(storageRequest,
            {
                keys: keys,
                include_docs: true
            },
            {
                auth: { username: "unichamba", password: "S3pt13mbre#2024Work" }
            });
        
        const eliminarStorage = response.data.rows.map(document => ({
            _id: document.doc._id,
            _rev: document.doc._rev,
            _deleted: true
        }))
        
        await axios.post("https://couchdbbackend.esaapp.com/unichamba-anuncios-storage/_bulk_docs",{docs: eliminarStorage}, {auth: { username: "unichamba", password: "S3pt13mbre#2024Work"}});
        await axios.post("https://couchdbbackend.esaapp.com/unichamba-anuncios/_bulk_docs",{docs: eliminarDocs}, {auth: { username: "unichamba", password: "S3pt13mbre#2024Work"}});

    }


    // ELIMINA UN CORREO DE LA COLECCIÓN LISTA NEGRA
    const eliminarCorreo = async (id, rev) => {
        const deleteRequest = `https://couchdbbackend.esaapp.com/unichamba-listanegra/${id}`
        await axios.delete(deleteRequest, {params: {"rev": rev}, auth: {username:"unichamba", password:"S3pt13mbre#2024Work"}})
        fetchListaNegra()
    }

    const modalEliminarCorreo = (id, rev) => {
        Swal.fire({
            title: "¿Seguro que quieres borrar este correo?",
            text: "¡No podrás recuperarlo!",
            icon: "warning|",
            showCancelButton: true,
            confirmButtonColor: "#161A30",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                eliminarCorreo(id, rev)
                Swal.fire({
                    title: "¡Borrado!",
                    text: "El correo fue borrada exitosamente.",
                    icon: "success"
                });
            }
            });
    }

    const modalAgregarEmail = async () => {
        Swal.fire({
            title: "Agregar a la lista",
            html: `<input id="correo" name="correo" class="swal2-input" placeholder="Ingrese un correo" required>`,
            showCancelButton: true,
            confirmButtonText: "Agregar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#04061A",
            cancelButtonColor: "#d33",
            showLoaderOnConfirm: true,
            preConfirm: async () => {
                const correo = document.getElementById( 'correo' ).value
                try {
                    const findStudentRequest = "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_find";

                    // COMPARA SI EL CORREO CAPTURADO ES DE UN ESTUDIANTE
                    const esEstudiante = await axios.post(findStudentRequest, { selector: { email: correo }, limit: 1 }, { auth: { username: "unichamba", password: "S3pt13mbre#2024Work" } })
                    
                    // COMPARA SI EL CORREO CAPTURADO ES DE UN EMPLEADOR
                    obtenerAnuncios(correo);
                    
                    if (esEstudiante.data.docs[0]) {
                        const idEstudiante = esEstudiante.data.docs[0]._id;
                        const revEstudiante = esEstudiante.data.docs[0]._rev;
                        agregarCorreo(correo);
                        eliminarCorreoEstudiante(idEstudiante, revEstudiante);
                        Swal.fire({
                            title: "Agregado a lista negra",
                            html: `${correo}<br>Fue removido del sistema`,
                            icon: "success"
                        })
                    } else if (alldocs) {
                        agregarCorreo(correo)
                        eliminarCorreoEmpleador();
                        Swal.fire({
                            title: "Agregado a lista negra",
                            html: `${correo}<br>Fue removido del sistema`,
                            icon: "success"
                        })
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: "Este correo no esta asociado a ningun usuario",
                        })
                    }
                } catch (error) {
                    Swal.showValidationMessage(error.message);
                }
            }
        })
    }


  return (
    <>
    <div className=" w-[85%]">

        {/* TITULO */}
        <h3 className=" mt-16 ml-20 font-normal text-2xl flex justify-end">Lista negra</h3>
        
        {/* BOTON PARA AGREGAR CORREO A LISTA NEGRA */}
        <span class="material-symbols-outlined flex justify-end cursor-pointer hover:text-green-600 text-4xl pt-5" onClick={modalAgregarEmail}>
            add_circle
        </span>

        {/* LISTA NEGRA */}
        {listaNegra.map((usuario) => (
            <div key={usuario.id} className=" grid grid-cols-5 mt-5">
                <div className=" col-span-4">
                    <h3 className=" text-2xl font-bold pl-16 pb-5">{usuario.correo}</h3>
                </div>

                <div className="flex justify-end">
                    <button onClick={() => modalEliminarCorreo(usuario.id, usuario.rev)}>
                        <span class="material-symbols-outlined text-3xl text-red-600">
                            delete
                        </span>
                    </button>
                </div>
            </div>
        ))}



    </div>
    </>
  )
}

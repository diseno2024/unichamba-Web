import { getDocs, collection, addDoc, deleteDoc, getDoc, doc} from "firebase/firestore"
import { db } from "../data/firebase"
import Swal from "sweetalert2"
import { useState } from "react"
import { useEffect } from "react"


export const BlacklistUserAdmin = () => {

    const [listaNegra, setListaNegra] = useState([])

    // TRAE LA DATA DE LISTA NEGRA
    const fetchListaNegra = async () => {
        const listaNegraRef = collection(db, 'listaNegra')
        await getDocs(listaNegraRef)
        .then((resp) => {
            setListaNegra(resp.docs.map((doc) => {
                return {...doc.data(), id: doc.id}
            }))
        })
    }

    useEffect(() => {
        fetchListaNegra();

        return () => {
            fetchListaNegra();
        }
    }, [])

    // AGREGAR CORREO A LISTA NEGRA
    const agregarCorreo = async (correo) => {
        await addDoc(collection(db, 'listaNegra'), {correo: correo})
        fetchListaNegra()
    }

    // ELIMINA EL ESTUDIANTE CUYO CORREO FUE AGREGADO A LISTA NEGRA
    const eliminarCorreoEstudiante = async (id) => {
        await deleteDoc(doc(db, 'estudiantes', id))
    }

    // ELIMINA EL ANUNCIO DEL EMPLEADOR CUYO CORREO FUE AGREGADO A LISTA NEGRA
    const eliminarCorreoEmpleador = async (id) => {
        await deleteDoc(doc(db, 'anuncios', id))
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
                    // TRAE LA DATA QUE NECESITA PARA VALIDAR
                    const estudiantesSpanshot = await getDocs(collection(db, 'estudiantes'));
                    const anunciosSnapshot = await getDocs(collection(db, 'anuncios'));

                    // COMPARA SI EL CORREO CAPTURADO ES DE UN ESTUDIANTE
                    const esEstudiante = estudiantesSpanshot.docs.find(doc => doc.data().email === correo)

                    // COMPARA SI EL CORREO CAPTURADO ES DE UN EMPLEADOR
                    const esEmpleador = anunciosSnapshot.docs.find(doc => doc.data().emailEmployer === correo)

                    if (esEstudiante) {
                        const idEstudiante = esEstudiante.id;
                        console.log(idEstudiante);
                        agregarCorreo(correo);
                        eliminarCorreoEstudiante(idEstudiante);
                        Swal.fire({
                            title: "Agregado a lista negra",
                            html: `${correo}<br>Fue removido del sistema`,
                            icon: "success"
                        })
                    } else if (esEmpleador) {
                        const idAnuncio = esEmpleador.id;
                        agregarCorreo(correo)
                        eliminarCorreoEmpleador(idAnuncio);
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
            <div key={usuario.id}>
                <h3 className=" text-2xl font-bold pl-16 pb-5">{usuario.correo}</h3>
            </div>
        ))}


    </div>
    </>
  )
}

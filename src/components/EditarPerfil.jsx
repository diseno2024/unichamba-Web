import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { db } from "../data/firebase";
import {doc,updateDoc} from "firebase/firestore";

const EditarPerfil = ({ titulo, referencia, estudiante}) => {
  const location = useLocation();
  const {id} = estudiante;

  const actualizarDato = async (referencia, id, dato) => {
    if (referencia === "nombre") {
        await updateDoc(doc(db, "estudiantes", id), {
            nombre: dato,
          });
    } else if (referencia === "apellido") {
        await updateDoc(doc(db, "estudiantes", id), {
            apellido: dato,
          });
    } else if (referencia === "telefono") {
      await updateDoc(doc(db, "estudiantes", id), {
        telefono: dato,
      });
    } else if (referencia === "email") {
      await updateDoc(doc(db, "estudiantes", id), {
        email: dato,
      });
    } else if (referencia === "acercaDe") {
      await updateDoc(doc(db, "estudiantes", id), {
        acercaDe: dato,
      });
    }
  }

  const editarNombres = () => {
    Swal.fire({
      title: `Editar ${titulo}`,
      html: `
          <div>
              <label style="display: block; padding-bottom:10px;">${titulo}</label>
              <input id="nuevo" type="text" name="nuevo" placeholder="Escriba aqui" class="swal2-input" required>
          </div>
          `,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agregar",
      confirmButtonColor: "#04061A",
      preConfirm: async () => {
        const nuevoDato = document.getElementById("nuevo").value;

        if (nuevoDato != "") {
            actualizarDato(referencia, id, nuevoDato)
          Swal.fire({
            title: "Nombre editado con exito",
            icon: "success",
          });
        } else {
          Swal.fire({
            title: "Error al modificar el nombre",
            icon: "error",
          });
        }
      },
    });
  };

  return (
    <>
      {location.pathname === "/studentProfile" ? (
        <span
          className="material-symbols-outlined justify-end opacity-0 hover:opacity-100 top-0 right-0 transition-opacity duration-200"
          onClick={editarNombres}
        >
          edit
        </span>
      ) : null}
    </>
  );
};

export default EditarPerfil;

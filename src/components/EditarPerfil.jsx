import React from "react";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import { db } from "../data/firebase";
import { doc, updateDoc } from "firebase/firestore";

const telefonoRegex = /^\d{8}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expresión regular para validar formato de correo electrónico

const EditarPerfil = ({ titulo, referencia, estudiante }) => {
  const location = useLocation();
  const { id } = estudiante;

  const actualizarDato = async (referencia, id, dato) => {
    try {
      // Validar según la referencia
      if (referencia === "telefono") {
        // Validar el número de teléfono con la expresión regular
        if (!telefonoRegex.test(dato)) {
          throw new Error("Número de teléfono inválido. Debe contener exactamente 8 dígitos numéricos.");
        }
      } else if (referencia === "email") {
        // Validar el formato del correo electrónico con la expresión regular
        if (!emailRegex.test(dato)) {
          throw new Error("Correo electrónico inválido. Introduce un formato válido.");
        }
      }

      // Actualizar el campo correspondiente en Firestore según la referencia
      await updateDoc(doc(db, "estudiantes", id), {
        [referencia]: dato,
      });

      // Mostrar alerta de éxito después de actualizar
      Swal.fire({
        title: `${titulo} editado con éxito`,
        icon: "success",
      }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/";
          }
        });
    } catch (error) {
      // Mostrar alerta de error si la validación falla o la actualización en Firestore falla
      Swal.fire({
        title: `Error al modificar ${titulo}`,
        text: error.message,
        icon: "error",
      });
    }
  };

  const editarNombres = () => {
    Swal.fire({
      title: `Editar ${titulo}`,
      html: `
          <div>
              <label style="display: block; padding-bottom:10px;">${titulo}</label>
              <input id="nuevo" type="text" name="nuevo" placeholder="Escriba aquí" class="swal2-input" required>
          </div>
          `,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#d33",
      confirmButtonText: "Agregar",
      confirmButtonColor: "#04061A",
      preConfirm: async () => {
        const nuevoDato = document.getElementById("nuevo").value.trim();

        if (nuevoDato !== "") {
          // Llamar a actualizarDato con la referencia, id y nuevoDato validado
          actualizarDato(referencia, id, nuevoDato);
        } else {
          Swal.fire({
            title: `Error al modificar ${titulo}`,
            text: `${titulo} no puede estar vacío`,
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

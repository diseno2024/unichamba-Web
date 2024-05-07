import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../data/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs } from "firebase/firestore";

const AdministradoresUserAdmin = () => {
  const [administradores, setAdministradores] = useState([])

  const fetchAdministradores = async () => {
    const administradoresRef = collection(db, 'administradores')
    await getDocs(administradoresRef)
      .then((resp) => {
        setAdministradores(resp.docs.map((doc) => {
          return { ...doc.data(), id: doc.id }
        }))
      })
  }

  useEffect(() => {
    return fetchAdministradores
  }, [])

  const agregarAdmin = async (name, email) => {
    await addDoc(collection(db, 'administradores'), { correo: email, nombre: name })
    fetchAdministradores()
  }

  const eliminarAdmin = async (id) => {
    await deleteDoc(doc(db, 'administradores', id));
    fetchAdministradores();
  }

  // Modal para confirmar la eliminación
  const modalEliminarAdmin = (admin) => {
    Swal.fire({
      title: `Eliminar a ${admin.nombre}`,
      html: `
      <div>
        <p>Correo electrónico: ${admin.correo}</p>
      </div>
      <hr class="my-4">
      <p>¿Estás seguro de que deseas eliminar a ${admin.nombre}?</p>
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí se puede implementar el metodo para eliminar al administrado
        eliminarAdmin(admin.id)
        Swal.fire("Eliminado", `${admin.nombre} ha sido eliminado`, "success");
      }
    });
  };


  // Modal para agregar administradores
  const modalAgregarAdministradores = () => {
    Swal.fire({
      title: "Agregar Correo Electrónico y Nombre",
      html: `<input id="correo" name="correo" class="swal2-input" placeholder="Ingrese su correo electrónico">
      <input id="nombre" name="nombre" class="swal2-input" placeholder="Ingrese su nombre">`
      ,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const email = document.getElementById("correo").value;
        const nombre = document.getElementById("nombre").value;
        if (!email || !nombre) {
          Swal.showValidationMessage("Por favor, complete ambos campos");
        } else {
          agregarAdmin(nombre, email);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  

  // Modal que confirma que se guardó el correo como admin
  const modalConfirmacion = () => {
    Swal.fire({
      html: "Administrador agregado",
      toast: true,
      icon: "success",
      padding: "1rem",
      position: "top-right",
      timer: "3000",
      timerProgressBar: true,
      showConfirmButton: false, // Ocultar el botón OK
      customClass: {
        popup: "text-black",
      },

    });
  };

  return (
    <>
      <div className="w-[85%]">
        <h3 className="mt-16 ml-20 font-normal text-2xl">Administradores</h3>
        <span className="cursor-pointer ... material-symbols-outlined text-black text-4xl flex justify-end hover:text-green-600" onClick={modalAgregarAdministradores}>
          add_circle
        </span>
      </div>

      {/* Se muestran las tarjetas de los administradores */}
      <div className="ml-20">
        {administradores.map((admin) => (
          <div key={admin.id} className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100 ... w-[80%] h-[150px] border-b-2 border-gray-500 grid grid-cols-5 hover:border-b-2 hover:border-blue-500">
            <div className="col-span-4 flex items-center">
              <div className="ml-4">
                <h1 className="font-normal text-Blue text-xl">{admin.nombre}</h1>
                <p className="font-light">{admin.correo}</p>
              </div>
            </div>
            <div className="flex justify-center gap-6 items-center">
              <span className="cursor-pointer ... material-symbols-outlined text-3xl text-red-600" key={admin.id} onClick={() => modalEliminarAdmin(admin)}>
                delete
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdministradoresUserAdmin;

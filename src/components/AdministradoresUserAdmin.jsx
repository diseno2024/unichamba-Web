import React, { useState } from "react";
import AdministradoresData from "../data/AdministradoresData";
import Swal from "sweetalert2";

const AdministradoresUserAdmin = () => {

 // Modal para confirmar la eliminación
const modalEliminarAdmin = (admin) => {
  Swal.fire({
    title: `Eliminar a ${admin.nombre}`,
    html: `
      <div>
        <img src="/foto-perfil.jpg" alt="Foto de perfil" class="w-[12%] mx-auto mb-4 rounded-full">
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
      // Aquí se puede implementar el metodo para eliminar al administrador
      Swal.fire("Eliminado", `${admin.nombre} ha sido eliminado`, "success");
    }
  });
};


  // Modal para agregar administradores
  const modalAgregarAdministradores = () => {
    Swal.fire({
      title: "Agregar Correo Electrónico",
      html: '<input id="correo" name="correo" class="swal2-input" placeholder="Ingrese su correo electrónico">',
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const email = document.getElementById("correo").value;
        if (!email) {
          Swal.showValidationMessage("Por favor, ingrese un correo electrónico válido");
        } else {
          modalConfirmacion(); // Llamada a modalConfirmacion
          /*aqui puede ir el metodo de firebase para guardar el correo que sera admin a traves del
                input con la variable correo,podria ser que antes de enviar el correo
                haga una busqueda en firebase para ver si existe el registro y 
                si existe lo guardara como admin*/
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
        {AdministradoresData.map((admin) => (
          <div key={admin.id} className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100 ... w-[80%] h-[150px] border-b-2 border-gray-500 grid grid-cols-5 hover:border-b-2 hover:border-blue-500">
            <div className="col-span-4 flex items-center">
              <img src="/foto-perfil.jpg" alt="" className="w-[12%] rounded-full border-8" />
              <div className="ml-4">
                <h1 className="font-normal text-Blue text-xl">{admin.nombre}</h1>
                <p className="font-light">{admin.correo}</p>
              </div>
            </div>
            <div className="flex justify-center gap-6 items-center">
              <span className="cursor-pointer ... material-symbols-outlined text-3xl text-Blue" key={admin.id}>
                edit
              </span>
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

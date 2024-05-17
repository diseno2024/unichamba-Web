import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { db } from "../data/firebase";
import { addDoc, collection, deleteDoc, doc, getDocs,getDoc } from "firebase/firestore";

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

  // useEffect(() => {
  //   return fetchAdministradores
  // }, [])

  useEffect(() => {
    fetchAdministradores();
    return () => {
      fetchAdministradores(); //linea modificada
  }
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
  const modalAgregarAdministradores = async () => {
    Swal.fire({
      title: "Agregar Correo Electrónico ",
      html: `<input id="correo" name="correo" class="swal2-input" placeholder="Ingrese su correo electrónico required">`,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#240D5E",
      cancelButtonColor: "#3F11B5",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const email = document.getElementById("correo").value;
        try {

          console.log("Correo electrónico ingresado:", email);
        if (!email.endsWith("@ues.edu.sv")) {
          throw new Error("El dominio del correo electrónico debe ser '@ues.edu.sv'");
        }
          console.log("Correo electrónico ingresado:", email); 
          const estudiantesSnapshot = await getDocs(collection(db, 'estudiantes'));  // Obtenemos todos los documentos de la colección "estudiantes"
          console.log("Documentos de estudiantes:", estudiantesSnapshot.docs); // verificar los  obtenidos
          const estudianteEncontrado = estudiantesSnapshot.docs.find(doc => doc.data().email === email);//verificamos que exista el email 
          
          //verificamos si existe ya el administrador
          const adminSnapshot = await getDocs(collection(db, 'administradores'));  // Obtenemos todos los documentos de la colección "estudiantes"
          const adminEncontrado = adminSnapshot.docs.find(doc => doc.data().correo === email);//verificamos que exista el email 
          
          if(adminEncontrado){
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Ya existe el Administrador!",
              
            });
          }else if (estudianteEncontrado && !adminEncontrado) {// Si se encontró el estudiante, agregar el administrador y no existe admin
            const datos=estudianteEncontrado.data(); //el doc lo convertimos en datos
            const nombreEstudiante=datos.nombre +' '+ datos.apellido; //y recivimos los datos para que se almacenen nombre+apellido
            agregarAdmin(nombreEstudiante, email);
          
            Swal.fire({
              title: "Administrador",
              html: `${nombreEstudiante}<br>Agregado Con Exito`,
              icon: "success"
            });
          } else {
            // Si no se encontró, mostrar un mensaje de error
            throw new Error('Correo invalido o No pertenece a la Universidad');
          }
        } catch (error) {
          Swal.showValidationMessage(error.message);
        }
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };

  return (
    <>
      <div className="w-[95%] py-10 flex items-center justify-between px-5 mx-auto">
        <h3 className="font-normal text-2xl">Administradores</h3>
        <span className="cursor-pointer material-symbols-outlined text-black text-4xl hover:text-green-600" onClick={modalAgregarAdministradores}>
          add_circle
        </span>
      </div>

      {/* Se muestran las tarjetas de los administradores */}
      <div className="w-[95%] mx-auto">
        {administradores.map((admin) => (
          <div key={admin.id} className="transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-110 duration-100 w-[85%] h-[150px] mx-auto border-b-2 border-gray-500 grid grid-cols-5 hover:border-b-2 hover:border-blue-500">
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

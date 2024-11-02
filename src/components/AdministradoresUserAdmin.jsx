import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const AdministradoresUserAdmin = () => {

  const [administradores, setadmins] = useState({})
  
  useEffect(() => {
    getAdministradores();
    return () => {
      getAdministradores();
    }
  }, [])

  const getAdministradores = () => {
    axios.get(`https://couchdbbackend.esaapp.com/unichamba-administradores/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
      .then((response) => {
        setadmins(response.data.rows);
      })
  } 

  const addAdmin = (administrador, email) => {
    axios.post(`https://couchdbbackend.esaapp.com/unichamba-administradores`, {
      administrador: administrador,
      email: email
    },{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
      .then(response => {
        getAdministradores();
      })
      .catch(error => {
        console.error(error);
      });
    console.log(`Administrador: ${administrador}, Correo: ${email}`);
  }


  const deleteAdmin = (id, rev) => {

  axios.delete(`https://couchdbbackend.esaapp.com/unichamba-administradores/${id}`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'},
  params: {rev: rev}})
    .then(response => {
      getAdministradores();
    })
    .catch(error => {
      console.error(error);
    });

  }

  // Modal para confirmar la eliminación

  const modalEliminarAdmin = (admin) => {
    Swal.fire({
      title: `Eliminar a ${admin.doc.administrador}`, // admin.nombre
      html: `
      <div>
        <p>Correo electrónico: ${admin.doc.email}</p>
      </div>
      <hr class="my-4">
      <p>¿Estás seguro de que deseas eliminar a ${admin.doc.administrador}?</p> 
    `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, eliminar",
    }).then((result) => {
      if (result.isConfirmed) {
        // Aquí se puede implementar el metodo para eliminar al administrado
        deleteAdmin(admin.doc._id, admin.doc._rev)
        Swal.fire("Eliminado", `${admin.doc.administrador} ha sido eliminado`, "success");
      }
    });
  };


  // Modal para agregar administradores
  const modalAgregarAdministradores = async () => {
    Swal.fire({
      title: "Datos del administrador",
      html: `
      <input id="nombre" name="nombre" class="swal2-input" placeholder="Nombre del administrador">
      <input id="correo" name="correo" class="swal2-input" placeholder="Correo electrónico">
      `,
      showCancelButton: true,
      confirmButtonText: "Agregar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#240D5E",
      cancelButtonColor: "#3F11B5",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const email = document.getElementById("correo").value;
        const nombre = document.getElementById("nombre").value;
        try {

          // console.log("Correo electrónico ingresado:", email);
          if(nombre.length === 0){
            throw new Error("El campo de nombre no puede estar vacío");
          }else if (!email.endsWith("@ues.edu.sv")) {
            throw new Error("El dominio del correo electrónico debe ser '@ues.edu.sv'");
          }
        
          // console.log("Correo electrónico ingresado:", email);

        // si el administrador que se esta agregando es estudiante y no tiene cuenta registrada como estudiante
        try {
          // Verificar en la base de datos de estudiantes
          const estudiantesResponse = await axios.post(
            'https://couchdbbackend.esaapp.com/unichamba-estudiantes/_find',
            {
              selector: {
                email: email
              },
              limit: 1
            },
            {
              auth: {
                username: 'unichamba',
                password: 'S3pt13mbre#2024Work' 
              }
            }
          );
    
          if (estudiantesResponse.data.docs.length > 0) {
            // Si existe el documento, establece los nombres
            console.log("Estudiante encontrado:", estudiantesResponse.data.docs[0]); // Mostrar información en la consola
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Correo ya registrado como estudiante!",
              
            });
          } else {
            console.log("No se encontró el estudiante, verificando administradores..."); // Mensaje si no se encuentra el estudiante
            try {
              const adminsResponse = await axios.post(
                'https://couchdbbackend.esaapp.com/unichamba-administradores/_find',
                {
                  selector: {
                    email: email
                  },
                  limit: 1
                },
                {
                  auth: {
                    username: 'unichamba', 
                    password: 'S3pt13mbre#2024Work' 
                  }
                }
              );
        
              if (adminsResponse.data.docs.length > 0) {
                console.log("Administrador encontrado:", adminsResponse.data.docs[0]); 
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Administrador ya registrado!",
                  
                });
              } else {
                addAdmin(nombre, email);
                Swal.fire({
                  title: "Administrador",
                  html: `${nombreEstudiante}<br>Agregado Con Exito`,
                  icon: "success"
                });

              }
            } catch (error) {
              console.error(error.message);
              // Manejo de errores aquí
            }
          }
        } catch (error) {
          console.error(error.message);
    
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
      <div className="w-[95%] py-10 flex items-center justify-between pl-20 mx-auto">
        <h3 className="font-normal text-2xl">Administradores</h3>
        {/* modal para agregar a un administrador */}
        <span className="cursor-pointer material-symbols-outlined text-black text-4xl hover:text-green-600 pr-24" onClick={modalAgregarAdministradores}> 
          add_circle
        </span>
      </div>

      {/* Se muestran las tarjetas de los administradores */}
      <div className="w-[95%] mx-auto pl-14">

      { administradores.length > 0 ? 
        administradores.map((admin) => (
          <div className="w-[90%] h-[100px] mx-auto mb-3 pl-4  ml-1 border-b-2 grid grid-cols-5">
            <div className="col-span-4 flex items-center">
              <div className="ml-1">
                <h1 className="font-normal text-Blue text-xl">{admin.doc.administrador}</h1>
                <p className="font-light">{admin.doc.email}</p>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <span className='cursor-pointer bg-red-600 text-white font-medium py-2 px-4 rounded-md ml-1 material-symbols-outlined absolute ' key={admin.doc._id} onClick={() => modalEliminarAdmin(admin)}>
                delete
              </span>
            </div>
          </div>
        ))
      : 
      <div className="flex justify-center items-center mt-40">
        <div className="animate-spin rounded-full h-20 w-20 border-t-8 border-blue-900"></div>
      </div>
      }
      </div>
    </>
  );
};

export default AdministradoresUserAdmin;

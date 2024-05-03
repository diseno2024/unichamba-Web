import AdministradoresData from "../data/AdministradoresData";
import Swal from "sweetalert2";
const AdministradoresUserAdmin = () => {


    //modal que confirma que se guardo el correo como admin
    const modalConfirmacion = () => {
        Swal.fire({
          html:'Administrador agregado',
          toast:true,
          icon:'success',
          padding:'1rem',
          position:'top-right',
          timer:'3000',
          timerProgressBar:true, 
          showConfirmButton: false, // Ocultar el botón OK
          customClass: {
            popup: 'text-black',
        },

        });
    };

    //modal para agregar administradores
    const modalAgregarAdministradores = () => {
        Swal.fire({
            title: 'Agregar Correo Electrónico',
            html: '<input id="correo" name="correo" class="swal2-input" placeholder="Ingrese su correo electrónico">',
            showCancelButton: true,
            confirmButtonText: 'Agregar',
            cancelButtonText: 'Cancelar',
            showLoaderOnConfirm: true,
           preConfirm: () => {
            const email = document.getElementById('correo').value;
            if (!email) {
                Swal.showValidationMessage('Por favor, ingrese un correo electrónico válido');
            } else {
                modalConfirmacion(); // Llamada a modalConfirmacion
                
                /*aqui puede ir el metodo de firebase para guardar el correo que sera admin a traves del
                input con la variable correo,podria ser que antes de enviar el correo
                haga una busqueda en firebase para ver si existe el registro y 
                si existe lo guardara como admin*/
            }
        },
        allowOutsideClick: () => !Swal.isLoading()
    });
      };

      

  return (
    <>
      <div className="w-[85%]">
        <h3 className="mt-16 ml-20 font-normal text-2xl">Administradores</h3>
        <span className="material-symbols-outlined text-black text-4xl flex justify-end hover:text-green-600" onClick={modalAgregarAdministradores}> 
          add_circle
        </span>
      </div>

      {/* Se muestran las tarjetas de los administradores */}
      <div className="ml-20">
        {AdministradoresData.map(admin => (
          <div key={admin.id} className="w-[80%] h-[150px] border-b-2 border-gray-500 grid grid-cols-5">
            <div className="col-span-4 flex items-center">
              <img src="/foto-perfil.jpg" alt="" className="w-[12%] rounded-full border-8" />
              <div className="ml-4">
                <h1 className="font-normal text-Blue text-xl">{admin.nombre}</h1>
                <p className="font-light">{admin.correo}</p>
              </div>
            </div>
            <div className="flex justify-center gap-6 items-center">
              <span className="material-symbols-outlined text-3xl text-Blue"  key={admin.id}>edit</span>
              <span className="material-symbols-outlined text-3xl text-red-600"  key={admin.id}>delete</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdministradoresUserAdmin;

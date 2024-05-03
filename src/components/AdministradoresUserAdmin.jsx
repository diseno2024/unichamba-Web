import AdministradoresData from "../data/AdministradoresData";

const AdministradoresUserAdmin = () => {
  return (
    <>
      <div className="w-[85%]">
        <h3 className="mt-16 ml-20 font-normal text-2xl">Administradores</h3>
        <span className="material-symbols-outlined text-black text-4xl flex justify-end">
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
              <span className="material-symbols-outlined text-3xl text-Blue">edit</span>
              <span className="material-symbols-outlined text-3xl text-red-600">delete</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdministradoresUserAdmin;

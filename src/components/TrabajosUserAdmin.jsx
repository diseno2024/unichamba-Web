const TrabajosUserAdmin = () => {
  return (
    <>
    {/* TITULO */}
    <div className=" w-[85%]">
        <h3 className=" mt-16 ml-20 font-normal text-2xl">Ofertas laborales</h3>
        <span class="material-symbols-outlined text-black text-4xl flex justify-end">
            add_circle
        </span>
    </div>
    {/* OFERTAS LABORALES */}
    <div>
        <div className=" w-[80%] h-[150px] border-b-2 border-gray-500 ml-20 grid grid-cols-5">
            <div className="  col-span-4">
                <h1 className=" pt-4 pl-4 font-normal text-Blue text-xl">Auxiliar contable</h1>
                <span class="material-symbols-outlined pl-3 pt-1">
                    location_on
                </span>
                <span className=" font-normal text-lg">Metapan - Santa Ana</span>
                <p className=" pl-4 font-light">Estamos en busca de un profesional dedicado para asistir en labores contables clave. Esta persona será responsable de mantener la salud financiera de nuestra empresa.</p>
            </div>
            <div className=" flex justify-center gap-6 items-center ">
            <span class="material-symbols-outlined text-3xl text-Blue">
                edit
            </span>
            <span class="material-symbols-outlined text-3xl text-red-600">
                delete
            </span>
            </div>
        </div>
    </div>

    <div className=" mt-5">
        <div className=" w-[80%] h-[150px] border-b-2 border-gray-500 ml-20 grid grid-cols-5">
            <div className="  col-span-4">
                <h1 className=" pt-4 pl-4 font-normal text-Blue text-xl">Auxiliar contable</h1>
                <span class="material-symbols-outlined pl-3 pt-1">
                    location_on
                </span>
                <span className=" font-normal text-lg">Metapan - Santa Ana</span>
                <p className=" pl-4 font-light">Estamos en busca de un profesional dedicado para asistir en labores contables clave. Esta persona será responsable de mantener la salud financiera de nuestra empresa.</p>
            </div>
            <div className=" flex justify-center gap-6 items-center ">
            <span class="material-symbols-outlined text-3xl text-Blue">
                edit
            </span>
            <span class="material-symbols-outlined text-3xl text-red-600">
                delete
            </span>
            </div>
        </div>
    </div>
    </>
  )
}

export default TrabajosUserAdmin;
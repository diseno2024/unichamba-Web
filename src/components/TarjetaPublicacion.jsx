import { NavLink, useLocation } from "react-router-dom";

const TarjetaPublicacion = ({ listStudent }) => {
  const { estudiante, localidad, carrera, descripcion, FechaPublicacion } = listStudent;
  const location = useLocation();

  return (
    <>
      {/* foto del estudiante */}
      {location.pathname === "/studentsPublications" ? (
        <div className="w-[525px] px-5 h-max py-10 border-b-2 flex flex-col justify-center">

          <div className="flex h-max">

            {/* imagen */}
            <div className="w-[180px] h-[200px] bg-foto-estudiante rounded-r-[25px] bg-top bg-cover"></div>

            {/* informacion del estudiante */}
            <div className=" w-[65%] px-4">
              <h1 className="text-lg font-normal">{estudiante}</h1>
              <span className="text-sm font-light">{localidad} - {carrera}</span>
              <p className="py-5 font-normal">{descripcion}</p>
            </div>

          </div>

          {/* trabajos que el estudiante puede realizar */}
          <div className="text-bg-icon flex gap-x-2 justify-end px-5">
            {/* como llamaras el icono desde firebase, ya que solo guardaremos el nombre sera de la siguiente forma */}
            {/* trabajos.map((traabajo) => ( <span class="material-symbols-outlined" style={{fontSize:35}}>{nombreTrabajo}</span>))  */}
          <span className="material-symbols-outlined" style={{fontSize:35}}>vaccines</span>
          <span className="material-symbols-outlined" style={{fontSize:35}}>pets</span>
          <span className="material-symbols-outlined" style={{fontSize:35}}>self_improvement</span>
          <span className="material-symbols-outlined" style={{fontSize:35}}>book</span>
          <span className="material-symbols-outlined" style={{fontSize:35}}>stroller</span>
          </div>
  
          </div>
      ) : (
        <div className="py-4 border-b-2 flex flex-col justify-center ">

            <div className="flex h-max">

              {/* imagen */}
              <div className="w-[170px] h-[200px] bg-foto-estudiante rounded-r-[25px] bg-top bg-cover"></div>

              {/* informacion del estudiante */}
              <div className=" w-[65%] px-4">
                <h1 className="text-lg font-normal">{estudiante}</h1>
                <span className="text-sm font-light">{localidad} - {carrera}</span>
                <p className="py-5 font-normal">{descripcion}</p>
              </div>

            </div>

            {/* trabajos que el estudiante puede realizar */}
            <div className="text-bg-icon flex gap-x-2 justify-end px-5">
              {/* como llamaras el icono desde firebase, ya que solo guardaremos el nombre sera de la siguiente forma */}
              {/* trabajos.map((traabajo) => ( <span class="material-symbols-outlined" style={{fontSize:35}}>{nombreTrabajo}</span>))  */}
            <span className="material-symbols-outlined" style={{fontSize:35}}>vaccines</span>
            <span className="material-symbols-outlined" style={{fontSize:35}}>pets</span>
            <span className="material-symbols-outlined" style={{fontSize:35}}>self_improvement</span>
            <span className="material-symbols-outlined" style={{fontSize:35}}>book</span>
            <span className="material-symbols-outlined" style={{fontSize:35}}>stroller</span>
            </div>
    
    
          </div>
          
      )}
    </>
  );
};

export default TarjetaPublicacion;

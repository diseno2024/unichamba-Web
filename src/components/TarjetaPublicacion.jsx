import { NavLink, useLocation } from "react-router-dom";



const TarjetaPublicacion = ({ listStudent }) => {
  const location = useLocation();
  const {nombre, carrera, acercaDe, trabajos, imageUrl, id} = listStudent;

  const primerosCinco = trabajos.slice(0, 5);

  return (
    <>
      {/* foto del estudiante */}
      {location.pathname === "/studentsPublications" ? (
        <NavLink key={id} to={`/studentProfile/${id}`} className="w-[400px] px-3 h-max py-5 border-b-2 flex flex-col justify-center  hover:bg-Space-cadet/15">

          <div className="flex h-[100%] ">

            {/* imagen */}
            <div className="w-[170px] max-h-[230px] rounded-r-[25px] overflow-hidden">
            <img src={imageUrl} alt="foto-perfil" className="rounded-r-[25px]"/>
            </div>

            {/* informacion del estudiante */}
            <div className=" w-[70%] px-2 mb-12 py-2">
              <h1 className="text-lg font-normal px-2">{nombre}</h1>
              <span className="text-sm font-light px-2 text-black/75">{carrera}</span>
              <p className="py-2 font-normal w-full h-[100%] px-2 overflow-hidden">{acercaDe}</p>
              
            </div>

          </div>

          {/* trabajos que el estudiante puede realizar */}
          <div className="text-bg-icon flex gap-x-2 justify-end px-5 my-10">
            {primerosCinco.map( trabajo => 
              <span className="material-symbols-outlined" style={{fontSize:35}} key={trabajo.nombre}>{trabajo.icono}</span>
            )}
          </div>
  
          </NavLink>
      ) : (
        <NavLink key={id} to={`/studentProfile/${id}`} className="py-4 my-3 flex flex-col justify-center border-b-[1px] border-black/30 w-full h-[300px]  hover:bg-Space-cadet/15">
            <div className="flex h-max space-x-5">

              {/* imagen */}
              <div className="w-[170px] h-[250px] rounded-r-[25px] overflow-y-hidden py-2">
              <img src={imageUrl} alt="foto-perfil" className="rounded-r-[25px]"/>
              </div>

              {/* informacion del estudiante */}
              <div className=" w-[65%] px-4 py-5">
                <h1 className="text-xl font-semibold tracking-wide">{nombre}</h1>
                <span className="text-lg font-light">{carrera}</span>
                <p className="py-5 font-normal h-[140px] overflow-hidden">{acercaDe}</p>
              </div>

            </div>

            {/* trabajos que el estudiante puede realizar */}
            <div className="text-bg-icon flex gap-x-2 justify-end px-5 pb-4">
            {primerosCinco.map( trabajo => 
              <span className="material-symbols-outlined" style={{fontSize:35}} key={trabajo.nombre}>{trabajo.icono}</span>
            )}
            </div>
        </NavLink>


          
      )}
    </>
  );
};

export default TarjetaPublicacion;

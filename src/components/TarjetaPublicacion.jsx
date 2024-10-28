import { NavLink, useLocation } from "react-router-dom";



const TarjetaPublicacion = ({ listStudent }) => {
  const location = useLocation();
  const {nombre, carrera, acercaDe, trabajos, imageUrl, id} = listStudent;

  const primerosCinco = trabajos.slice(0, 5);

  return (
    <>
      {/* foto del estudiante */}
      {location.pathname === "/studentsPublications" ? ( //Parte exclusiva para studentsPublication
        <NavLink key={id} to={`/studentProfile/${id}`} className="w-[100%] md:w-[100%] px-3 h-full  py-5 border-b-2 flex flex-col justify-center  hover:bg-Space-cadet/15">

          <div className="flex h-[110px] md:h-[120px] w-full">

            {/* imagen */}
           
            <img src={imageUrl} alt="foto-perfil" className="min-w-[80px] max-w-[80px] min-h-[100px] max-h-[100px] rounded-[25px] overflow-hidden object-cover"/>

            {/* informacion del estudiante */}
            <div className=" w-full px-2 mb-8 py-2 ">
              <h1 className="text-lg font-normal px-2">{nombre}</h1>
              <span className="text-sm font-light px-2 w-full text-black/75">{carrera}</span>
              <p className="py-2 font-normal w-full h-[50px] md:h-[60px] px-2 overflow-hidden">{acercaDe}</p>
              
            </div>

          </div>

          {/* Trabajos que el estudiante puede realizar */}
          <div className="text-bg-icon flex gap-x-2 justify-start px-5 mt-16">
            {primerosCinco.map((trabajo) => (
              <span
                className="material-symbols-outlined text-3xl  md:text-[20px] lg:text-3xl"
                key={trabajo.nombre}
              >
                {trabajo.icono}
              </span>
            ))}
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

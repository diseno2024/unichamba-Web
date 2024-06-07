import { useLocation } from "react-router-dom";



const TarjetaPublicacion = ({ listStudent }) => {
  // const { estudiante, localidad, carrera, descripcion, FechaPublicacion } = listStudent;
  const location = useLocation();
  const {nombre, carrera, acercaDe, trabajos} = listStudent;

// carrera, nombre, acercaDe, trabajos
console.log(trabajos)
  return (
    <>
      {/* foto del estudiante */}
      {location.pathname === "/studentsPublications" ? (
        <div className="w-[525px] px-3 h-max py-10 border-b-2 flex flex-col justify-center">

          <div className="flex h-max">

            {/* imagen */}
            <div className="w-[180px] h-[200px] bg-foto-estudiante rounded-r-[25px] bg-top bg-cover"></div>

            {/* informacion del estudiante */}
            <div className=" w-[65%] px-4">
              <h1 className="text-lg font-normal px-2">{nombre}</h1>
              <span className="text-sm font-light px-2 text-black/75">{carrera}</span>
              <p className="py-2 font-normal w-full h-[130px] px-2 overflow-hidden">{acercaDe}</p>
            </div>

          </div>

          {/* trabajos que el estudiante puede realizar */}
          <div className="text-bg-icon flex gap-x-2 justify-end px-5">
            {trabajos.map( trabajo => <span className="material-symbols-outlined" style={{fontSize:35}} key={trabajo}>{trabajo.icono}</span>)}
          </div>
  
          </div>
      ) : (
        <div className="py-4 flex flex-col justify-center border-b-[1px] border-black/30 w-full">

            <div className="flex h-max space-x-5">

              {/* imagen */}
              <div className="w-[170px] h-[200px] bg-foto-estudiante rounded-r-[25px] bg-top bg-cover"></div>

              {/* informacion del estudiante */}
              <div className=" w-[65%] px-4">
                <h1 className="text-lg font-normal">{nombre}</h1>
                <span className="text-sm font-light">{carrera}</span>
                <p className="py-5 font-normal">{acercaDe}</p>
              </div>

            </div>

            {/* trabajos que el estudiante puede realizar */}
            <div className="text-bg-icon flex gap-x-2 justify-end px-5">
            {trabajos.map( trabajo => <span className="material-symbols-outlined" style={{fontSize:38}} key={trabajo}>{trabajo.icono}</span>)}
            </div>
          </div>


          
      )}
    </>
  );
};

export default TarjetaPublicacion;

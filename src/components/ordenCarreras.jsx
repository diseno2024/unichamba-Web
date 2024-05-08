import React, { useState } from "react";
import listCarrersOrden from "../data/orderCarrers";
import { useLocation } from "react-router-dom";

const OrdenarCarreras = ({onSelect}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const location = useLocation();

  const handleSelectChange = (event) => {
    const carreraSeleccionada = event.target.value;
    setSelectedCarrera(carreraSeleccionada);
    onSelect(carreraSeleccionada);
    setIsOpen(false);
  };
  
  

  return (
    <>
      <select
        className="rounded-lg border border-black p-3 w-80 mt-4 text-lg bg-white"
        onClick={() => setIsOpen((prev) => !prev)}
        onChange={handleSelectChange}
        value={selectedCarrera}
        required
      >
        <option value="" >Seleccione una carrera</option>
        {listCarrersOrden.map(({ nombre, id }) => (
          <option value={nombre} key={id}>
            {nombre}
          </option>
        ))}
      </select>
      {isOpen && (
        <div>
          {listCarrersOrden.map(({ nombre, id }) => (
            <div
              key={id}
              onClick={() => {
                setSelectedCarrera(nombre);
                onSelect(nombre);
                setIsOpen(false);
              }}
            ></div>
          ))}
        </div>
      )}
    </>
  );
};

export default OrdenarCarreras;

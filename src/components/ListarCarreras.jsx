import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../data/firebase"; // Ajusta la ruta según la ubicación de tu archivo de configuración de Firebase
import { collection, getDocs } from "firebase/firestore";

const CarrerasInicio = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [carreras, setCarreras] = useState([]); // Estado para almacenar las carreras
  const location = useLocation();

  useEffect(() => {
    // Función para obtener las carreras de Firestore
    const fetchCarreras = async () => {
      try {
        const carrerasCollection = collection(db, "carreras");
        const carrerasSnapshot = await getDocs(carrerasCollection);
        const carrerasList = carrerasSnapshot.docs.map(doc => ({
          id: doc.id,
          carrera: doc.data().carrera
        }));
        
        // Ordenar las carreras alfabéticamente por su nombre
        carrerasList.sort((a, b) => a.carrera.localeCompare(b.carrera));
        
        setCarreras(carrerasList);
      } catch (error) {
        console.error("Error obteniendo carreras: ", error);
      }
    };

    fetchCarreras(); // Llamar a la función para obtener las carreras cuando el componente se monta
  }, []);

  const handleSelectChange = (event) => {
    const carreraSeleccionada = event.target.value;
    setSelectedCarrera(carreraSeleccionada);
    onSelect(carreraSeleccionada);
    setIsOpen(false);
  };

  return (
    <>
    {location.pathname === "/inicio" ? 
    
    <select
    className="bg-inherit font-normal text-white px-2 w-[400px] focus:outline-none"
    onClick={() => setIsOpen((prev) => !prev)}
    onChange={handleSelectChange}
    value={selectedCarrera}
    required
  >
    <option value="">Seleccione una carrera</option>
    {carreras.map(({ carrera, id }) => (
      <option value={carrera} key={id}>
        {carrera}
      </option>
    ))}
  </select>

  :

  <select
        className="bg-inherit font-normal text-Dark-Blue px-2 w-[400px] focus:outline-none"
        onClick={() => setIsOpen((prev) => !prev)}
        onChange={handleSelectChange}
        value={selectedCarrera}
        required
      >
        <option value="">Seleccione una carrera</option>
        {carreras.map(({ carrera, id }) => (
          <option value={carrera} key={id}>
            {carrera}
          </option>
        ))}
      </select>
  
  
  }
      
    </>
  );
};

export default CarrerasInicio;
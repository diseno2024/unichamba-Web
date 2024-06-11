import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../data/firebase"; // Ajusta la ruta según la ubicación de tu archivo de configuración de Firebase
import { collection, getDocs } from "firebase/firestore";

const OrdenarTrabajos = ({ onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTrabajo, setSelectedTrabajo] = useState("");
  const [trabajos, setTrabajos] = useState([]); // Estado para almacenar los trabajos
  const location = useLocation();

  useEffect(() => {
    // Función para obtener los trabajos de Firestore
    const fetchTrabajos = async () => {
      try {
        const trabajosCollection = collection(db, "trabajos");
        const trabajosSnapshot = await getDocs(trabajosCollection);
        const trabajosList = trabajosSnapshot.docs.map(doc => ({
          id: doc.id,
          trabajo: doc.data().nombre,
          icono: doc.data().icono // Incluir el campo icono
        }));
        
        // Ordenar los trabajos alfabéticamente por su nombre
        trabajosList.sort((a, b) => a.trabajo.localeCompare(b.trabajo));
        
        setTrabajos(trabajosList);
      } catch (error) {
        console.error("Error obteniendo trabajos: ", error);
      }
    };

    fetchTrabajos(); // Llamar a la función para obtener los trabajos cuando el componente se monta
  }, []);

  const handleSelectChange = (event) => {
    const trabajoSeleccionado = event.target.value;
    setSelectedTrabajo(trabajoSeleccionado);

    if (trabajoSeleccionado === "") {
      onSelect(null); // Pasar null para restablecer el filtro
    } else {
      const trabajo = trabajos.find(t => t.trabajo === trabajoSeleccionado);
      if (trabajo && trabajo.icono) {
        onSelect(trabajo.icono); // Pasar el icono en lugar del nombre del trabajo
      } else {
        onSelect(null); // En caso de error, restablecer el filtro
      }
    }

    setIsOpen(false);
  };

  return (
    <>
      <select
        className="bg-inherit placeholder:text-white placeholder:font-medium w-[400px]"
        onClick={() => setIsOpen((prev) => !prev)}
        onChange={handleSelectChange}
        value={selectedTrabajo}
        required
      >
        <option value="" className="text-orange">Seleccione un trabajo</option>
        {trabajos.map(({ trabajo, id, icono }) => (
          <option value={trabajo} key={id}>
            {trabajo}
          </option>
        ))}
      </select>
    </>
  );
};

export default OrdenarTrabajos;

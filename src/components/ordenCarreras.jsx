import React, { useState, useEffect } from "react";
import axios from "axios"; // Asegúrate de importar axios

const OrdenarCarreras = ({ onSelect }) => {
  const [selectedCarrera, setSelectedCarrera] = useState("");
  const [carreras, setCarreras] = useState([]); // Estado para almacenar las carreras

  useEffect(() => {
    // Función para obtener las carreras de CouchDB
    const fetchCarrerasFromCouchDB = async () => {
      try {
        const response = await axios.get('https://couchdbbackend.esaapp.com/unichamba-carreras/_all_docs?include_docs=true', {
          auth: {
            username: 'unichamba',  // Cambia esto con tus credenciales
            password: 'S3pt13mbre#2024Work'
          }
        });

        // Extraer las carreras del resultado
        const carrerasList = response.data.rows
          .filter(row => row.doc && row.doc.carrera) // Filtrar los documentos que tienen carrera
          .map(row => ({
            id: row.id, // ID del documento
            carrera: row.doc.carrera // Asegurarse de que 'carrera' existe
          }));

        // Ordenar las carreras alfabéticamente por su nombre
        carrerasList.sort((a, b) => a.carrera.localeCompare(b.carrera));

        setCarreras(carrerasList);
      } catch (error) {
        console.error("Error obteniendo carreras de CouchDB: ", error);
      }
    };

    fetchCarrerasFromCouchDB(); // Llamar a la función para obtener las carreras cuando el componente se monta
  }, []);

  const handleSelectChange = (event) => {
    const carreraSeleccionada = event.target.value;
    setSelectedCarrera(carreraSeleccionada);
    onSelect(carreraSeleccionada); // Llamar a la función onSelect con la carrera seleccionada
  };

  return (
    <select
      className="rounded-lg border border-black p-3 w-[87%] md:w-80 mt-4 text-lg bg-white"
      onChange={handleSelectChange} // Cambiar a onChange para manejar la selección
      value={selectedCarrera} // Vincular el valor seleccionado
      required
    >
      <option value="">Seleccione una carrera</option>
      {carreras.map(({ carrera, id }) => (
        <option value={carrera} key={id}>
          {carrera}
        </option>
      ))}
    </select>
  );
};

export default OrdenarCarreras;

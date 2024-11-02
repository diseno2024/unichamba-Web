import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const TrabajosUserAdmin = () => {
    const [trabajos, setTrabajos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;
    const couchDBUrl = "https://couchdbbackend.esaapp.com/unichamba-anuncios/_all_docs?include_docs=true";
    const auth = { username: "unichamba", password: "S3pt13mbre#2024Work" };

    const fetchTrabajos = async () => {
        try {
            const response = await axios.get(couchDBUrl, { auth });
            setTrabajos(response.data.rows.map(row => ({ ...row.doc, id: row.id })));
        } catch (error) {
            console.error("Error al obtener trabajos:", error);
        }
    };

    useEffect(() => {
        fetchTrabajos();
    }, []);

    const totalPages = Math.ceil(trabajos.length / itemsPerPage);
    const currentTrabajos = trabajos.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const addBlacklist = async (correo) => {
        try {
            await axios.post("https://couchdbbackend.esaapp.com/unichamba-listaNegra", { correo }, { auth });

            const trabajosUsuario = trabajos.filter(trabajo => trabajo.quienPublica === correo);
            for (const trabajo of trabajosUsuario) {
                await axios.delete(`https://couchdbbackend.esaapp.com/unichamba-anuncios/${trabajo.id}?rev=${trabajo._rev}`, { auth });
            }

            fetchTrabajos();
        } catch (error) {
            console.error("Error al agregar a la lista negra:", error);
        }
    };

    const editarAnuncio = async (id, descEditada) => {
        try {
            const trabajo = trabajos.find(trabajo => trabajo.id === id);
            await axios.put(`https://couchdbbackend.esaapp.com/unichamba-anuncios/${id}`, 
                { ...trabajo, description: descEditada }, 
                { auth }
            );
            fetchTrabajos();
        } catch (error) {
            console.error("Error al editar el anuncio:", error);
        }
    };

    const modalEliminarTrabajo = (correo) => {
        Swal.fire({
            title: "¿Seguro que quieres agregar este correo a lista negra?",
            text: "¡Todas las ofertas del usuario serán eliminadas!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#161A30",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, borrar",
            cancelButtonText: "Cancelar"
        }).then((result) => {
            if (result.isConfirmed) {
                addBlacklist(correo);
                Swal.fire({
                    title: "¡Borrado!",
                    text: "La oferta fue borrada exitosamente.",
                    icon: "success"
                });
            }
        });
    };

    const modalEditarTrabajo = (id) => {
        Swal.fire({
            title: "Editar Anuncio",
            html: `
            <div>
                <label style="display: block; padding-bottom:20px;">Nueva descripcion</label>
                <textarea id="nuevaDescripcion" type="text" name="Descripcion" placeholder="Ingrese la nueva descripcion" class="swal2-input" cols="30" rows="10" required></textarea>
            </div>
            `,
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            cancelButtonColor: "#d33",
            confirmButtonText: "Agregar",
            confirmButtonColor: "#04061A",
            preConfirm: () => {
                const descEditada = document.getElementById("nuevaDescripcion").value;
                const esIgual = trabajos.find(doc => doc.description === descEditada);
                if (descEditada !== "" && !esIgual) {
                    editarAnuncio(id, descEditada);
                    Swal.fire({
                        title: "Anuncio modificado con éxito",
                        icon: "success"
                    });
                } else {
                    Swal.fire({
                        title: "Error al modificar el anuncio",
                        icon: "error"
                    });
                }
            }
        });
    };

    return (
        <>
            <div className=" w-[85%]">
                <h3 className=" mt-16 ml-20 font-normal text-2xl flex justify-end">Ofertas laborales</h3>
            </div>
            {currentTrabajos.map((trabajo) =>
                <div key={trabajo.id} className="my-[15px]">
                    <div className=" w-[80%] max-h-[150px] border-b-2 border-gray-500 ml-20 grid grid-cols-5 pb-10">
                        <div className=" col-span-4">
                            <span className=" pt-4 pl-4 font-normal text-Blue text-xl">{trabajo.title}</span>
                            <span className="material-symbols-outlined pl-3 pt-1">location_on</span>
                            <span className=" font-normal text-lg">{trabajo.direction}</span>
                            <p className=" pl-4 py-1 font-normal text-slate-800">{trabajo.quienPublica}</p>
                            <p className=" pl-4 font-light">
                                {trabajo.description && trabajo.description.length > 100
                                    ? trabajo.description.slice(0, 210) + "..."
                                    : trabajo.description || ""}
                            </p>
                        </div>
                        <div className=" flex justify-center items-center ">
                            <button onClick={() => modalEliminarTrabajo(trabajo.quienPublica)} className=" bg-black rounded-lg p-1">
                                <span className="material-symbols-outlined text-3xl text-white">list_alt_add</span>
                            </button>
                            <button onClick={() => modalEditarTrabajo(trabajo.id)} className=" bg-green-700 rounded-lg p-1 ml-5">
                                <span className="material-symbols-outlined text-3xl text-white">edit</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <div className="flex justify-center items-center mt-4">
                <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-blue-700"
                >
                    {"<"}
                </button>
                {[...Array(totalPages)].map((_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => goToPage(index + 1)}
                        className={`px-3 py-1 ${currentPage === index + 1 ? "text-blue-800 font-bold" : "text-blue-700"}`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-blue-700"
                >
                    {">"}
                </button>
            </div>
        </>
    );
};

export default TrabajosUserAdmin;

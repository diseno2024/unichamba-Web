import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import WhatsAppButton from "../components/WhatsAppButton";
import { UserAuth } from "../context/AuthContext";
import axios from "axios";
import { createRoot } from "react-dom/client";
const StudentProfile = () => {
  const location = useLocation();
  const { idPerfil } = useParams();
  const [loading, setLoading] = useState(false);
  const [estudiante, setEstudiante] = useState([]);
  const { user } = UserAuth();
  const initialpdf = { hojadevida: "" };
  const [trabajosOptions, setTrabajosOptions] = useState([]);
  const navigate = useNavigate();
  let nombreActualizado = {};
  let apellidoActualizado = {};
  let telefonoActualizado = {};
  let whatsappActualizado = {};
  let acercaDeActualizado = {};
  const [archivoSeleccionado, setArchivoSeleccionado] = useState(null);
  const [value, setValue] = useState(initialpdf);
  let trabajosInicial = [];
  let carreraActualizada = {};
  let archivo;
  let students = [];
  let pdf = {};
  let fotoPerfil = {};
  const MySwal = withReactContent(Swal);
  const animatedComponents = makeAnimated();
  const [carrerasList, setCarrerasOptions] = useState([]);
  const [trabajos, setTrabajos] = useState([]);

  // LLAMADA A LA DATA DE LOS ESTUDIANTES Y ORDENA LA DATA SEGUN EL PERFIL DEL ESTUDIANTE A MOSTRAR
  const fetchData = async () => {
    setLoading(true);
    const getRequest =
      "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?include_docs=True";
    const findRequest =
      "https://couchdbbackend.esaapp.com/unichamba-estudiantes/_find";

    const studentsSnapshot = await axios.get(getRequest, {
      auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
    });
    const rawStudents = studentsSnapshot.data.rows;
    const estudiantes = rawStudents.map((document) => ({
      ...document.doc,
      id: document.id,
      rev: document.value.rev,
    }));

    const perfilSeleccionado = await axios.post(
      findRequest,
      { selector: { _id: idPerfil }, limit: 1 },
      { auth: { username: "unichamba", password: "S3pt13mbre#2024Work" } }
    );
    students = estudiantes;
    if (location.pathname === "/studentProfile") {
      students.map((perfil) => {
        if (perfil.email === user.email) {
          setTrabajos(
            perfil.trabajos.map((trabajo) => ({
              nombre: trabajo.nombre,
              icono: trabajo.icono,
            }))
          );
          setEstudiante(perfil);
        }
      });
    } else if (perfilSeleccionado.data.docs[0].email === user.email) {
      setEstudiante(perfilSeleccionado.data.docs[0]);
      setTrabajos(perfilSeleccionado.data.docs[0].trabajos);
      navigate("/studentProfile");
    } else {
      setTrabajos(perfilSeleccionado.data.docs[0].trabajos);
      setEstudiante(perfilSeleccionado.data.docs[0]);
    }

    setLoading(false);
  };

  // LLAMA LA DATA DE LOS TRABAJOS PARA EDICION DE PERFIL
  const fetchTrabajos = async () => {
    const getTrabajos =
      "https://couchdbbackend.esaapp.com/unichamba-trabajos/_all_docs?include_docs=True";
    const trabajosCollection = await axios.get(getTrabajos, {
      auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
    });
    const rawTrabajos = trabajosCollection.data.rows;

    // Mapear los trabajos filtrados a un formato adecuado para el Select
    const trabajosList = rawTrabajos.map((document) => ({
      value: document.doc.icono,
      label: document.doc.nombre,
    }));

    // Ordenar alfabéticamente por nombre
    trabajosList.sort((a, b) => a.label.localeCompare(b.label));

    // Actualizar el estado de las opciones de trabajo
    setTrabajosOptions(trabajosList);
  };

  // TRAE LA DATA DE LAS CARRERAS PARA EDICION DEL PERFIL DEL ESTUDIANTE
  const fetchCarreras = async () => {
    const getCarreras =
      "https://couchdbbackend.esaapp.com/unichamba-carreras/_all_docs?include_docs=True";
    const carrerasCollection = await axios.get(getCarreras, {
      auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
    });
    const rawCarreras = carrerasCollection.data.rows;
    const carrerasList = rawCarreras.map((document) => ({
      value: document.id,
      label: document.doc.carrera,
    }));
    carrerasList.sort((a, b) => a.label.localeCompare(b.label));
    setCarrerasOptions(carrerasList);
  };

  // PROCESO PARA MANEJO DE LOS PDF'S
  const handlePDFChange = (e) => {
    pdf = e.target.files[0];

      if (pdf) {
        const maxSize = 1 * 1024 * 1024;
        if (pdf.size > maxSize) {
          Swal.fire({
            title: "Archivo demasiado grande",
            icon: "error",
            text: "El pdf no debe superar 1 MB de tamaño.",
          });
          pdf = {};
          setArchivoSeleccionado(null);
          estudiante.hojadevida = "";
          return;
        } else {
          setArchivoSeleccionado(pdf);
          const reader = new FileReader();

          reader.onloadend = () => {
            const base64String = reader.result;
            estudiante.hojadevida = base64String;
          };

          reader.readAsDataURL(pdf);
        }
      } else {
        setArchivoSeleccionado(null);
        estudiante.hojadevida = "";
      }
    
  };

  const addOrEdit = async (link) => {
    const getStorage = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}`;
    const storageStudent = await axios.get(getStorage, {
      auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
    });

    const storagePdf = {
      data: storageStudent.data,
      rev: storageStudent.data._rev,
    };

    const attachments = {
      _attachments: {
        "curriculum.pdf": {
          content_type: "application/pdf",
          data: estudiante.hojadevida.split(",")[1],
        },
      },
    };

    storagePdf.data._attachments["curriculum.pdf"] =
      attachments._attachments["curriculum.pdf"];

    await axios.put(
      `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}`,
      storagePdf.data,
      {
        auth: {
          username: "unichamba",
          password: "S3pt13mbre#2024Work",
        },
        params: { rev: storagePdf.rev },
      }
    );

    estudiante.pdfNombre = pdf.name;
    estudiante.pdfUrl = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}/curriculum.pdf`;

    await axios.put(
      `https://couchdbbackend.esaapp.com/unichamba-estudiantes/${estudiante.id}`,
      estudiante,
      {
        auth: {
          username: "unichamba",
          password: "S3pt13mbre#2024Work",
        },
        params: { rev: estudiante.rev },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    Swal.fire({
      title: "PDF agregado",
      icon: "success",
      text: "El PDF se agregó correctamente",
    });
    fetchData();
    setArchivoSeleccionado(null);
  };

  const deletePdf = async () => {
    estudiante.pdfUrl = "";
    estudiante.hojadevida = "";
    await axios.put(
      `https://couchdbbackend.esaapp.com/unichamba-estudiantes/${estudiante.id}`,
      estudiante,
      {
        auth: {
          username: "unichamba",
          password: "S3pt13mbre#2024Work",
        },
        params: { rev: estudiante.rev },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    Swal.fire({
      title: "PDF eliminado",
      icon: "success",
      text: "El PDF se elimino correctamente",
    });
    fetchData();
    setArchivoSeleccionado(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (archivoSeleccionado) {
      addOrEdit(value);
      setArchivoSeleccionado(null);
      e.target.reset();
    }
  };

  // CAPTURA LOS INPUTS PARA EDITAR
  const handleNombreChange = (e) => {
    nombreActualizado = { nombre: e.target.value };
  };

  const handleApellidoChange = (e) => {
    const lastName = {
      apellido: e.target.value,
    };

    apellidoActualizado = lastName;
  };

  const handleTelefonoChange = (e) => {
    const phone = {
      telefono: e.target.value,
    };

    telefonoActualizado = phone;
  };

  const handleWhatsappChange = (e) => {
    const whats = {
      whatsapp: e.target.value,
    };

    whatsappActualizado = whats;
  };

  const handleAcercaDeChange = (e) => {
    const descripcion = {
      acercaDe: e.target.value,
    };

    acercaDeActualizado = descripcion;
  };

  const handleTrabajosChange = (selectedOptions) => {
    trabajosInicial = trabajos;
    const trabajosSelected = selectedOptions.map((option) => ({
      icono: option.value,
      nombre: option.label,
    }));
    trabajosInicial = trabajosSelected;
  };

  const handleCarreraChange = (e) => {
    const carreras = {
      carrera: e.label,
    };
    carreraActualizada = carreras;
  };

  // SUBMIT PARA SUBIR EDICION DEL MODAL
  const editSubmit = async (e) => {
    e.preventDefault();
    const isEmpty = (obj) => Object.keys(obj).length === 0;

    if (!isEmpty(nombreActualizado)) {
      estudiante.nombre = nombreActualizado.nombre;
    }

    if (!isEmpty(apellidoActualizado)) {
      estudiante.apellido = apellidoActualizado.apellido;
    }

    if (!isEmpty(telefonoActualizado)) {
      estudiante.telefono = telefonoActualizado.telefono;
    }

    if (!isEmpty(whatsappActualizado)) {
      estudiante.whatsapp = whatsappActualizado.whatsapp;
    }

    if (!isEmpty(acercaDeActualizado)) {
      estudiante.acercaDe = acercaDeActualizado.acercaDe;
    }

    if (!isEmpty(carreraActualizada)) {
      estudiante.carrera = carreraActualizada.carrera;
    }

    if (trabajosInicial.length >= 0) {
      estudiante.trabajos = [...trabajosInicial];
    }
    await axios.put(
      `https://couchdbbackend.esaapp.com/unichamba-estudiantes/${estudiante.id}`,
      estudiante,
      {
        auth: {
          username: "unichamba",
          password: "S3pt13mbre#2024Work",
        },
        params: { rev: estudiante.rev },
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    Swal.fire({
      title: "Edicion exitosa",
      icon: "success",
      text: "Los cambios se aplicaron correctamente",
    });
    fetchData();
  };

  // MODAL Y FORMULARIO PARA EDICION DEL PERFIL
  const editarPerfil = () => {
    trabajosInicial = trabajos;
    MySwal.fire({
      title: "Editar Perfil",
      customClass: {
        container: "my-custom-modal",
      },
      html: `<div id="modal-form-container"></div>`, // Contenedor donde React montará el formulario
      didOpen: () => {
        const formContainer = document.getElementById("modal-form-container");
        const root = createRoot(formContainer);
        root.render(<FormularioCompleto />); // Renderiza el formulario dentro del modal
      },
      showCancelButton: true,
      showConfirmButton: false, // Controla el envío con React
    }).then((result) => {
      if (result.dismiss === Swal.DismissReason.cancel) {
        // Si se cancela, restablece el valor del select al inicial
        trabajosInicial = [];
        nombreActualizado = {};
        apellidoActualizado = {};
        telefonoActualizado = {};
        whatsappActualizado = {};
        acercaDeActualizado = {};
        carreraActualizada = {};
      }
    });
  };

  const FormularioCompleto = () => {
    return (
      <form onSubmit={editSubmit}>
        <div className="md:flex w-full">
          <div className="md:px-5 space-y-4 ">
            <div className="w-full px-5 flex flex-col items-center justify-start space-y-3 mt-3 md:mt-0">
              <label htmlFor="nombreInput">Nombre(s)*</label>
              <input
                placeholder={estudiante.nombre}
                type="text"
                id="nombreInput"
                className="rounded-lg border border-black font-normal py-4 w-[270px] md:w-[600px] px-5"
                name="nombre"
                onChange={handleNombreChange}
                pattern="^[A-Za-záéíóúÁÉÍÓÚ]+(\s[A-Za-záéíóúÁÉÍÓÚ]+)*$"
              />

              <label htmlFor="apellidoInput">Apellido(s)*</label>
              <input
                placeholder={estudiante.apellido}
                type="text"
                id="apellidoInput"
                className="rounded-lg border border-black font-normal py-4  w-[270px] md:w-[600px] px-5"
                name="apellido"
                onChange={handleApellidoChange}
                pattern="^[A-Za-záéíóúÁÉÍÓÚ]+(\s[A-Za-záéíóúÁÉÍÓÚ]+)*$"
              />

              <label htmlFor="telefonoInput">Telefono*</label>
              <input
                placeholder={estudiante.telefono}
                type="text"
                id="telefonoInput"
                className="rounded-lg border border-black font-normal py-4  w-[270px] md:w-[600px] px-5"
                name="telefono"
                pattern="[0-9]{8}"
                onChange={handleTelefonoChange}
              />
            </div>
          </div>

          <div className="w-full px-5 flex flex-col items-center justify-start space-y-3 mt-3 md:mt-0">
            <label htmlFor="whatsappInput">Whatsapp*</label>
            <input
              placeholder={estudiante.whatsapp}
              type="text"
              id="whatsappInput"
              className="rounded-lg border border-black font-normal py-4  w-[270px] md:w-[600px] px-5"
              name="whatsapp"
              onChange={handleWhatsappChange}
              pattern="[0-9]{8}"
            />

            <label htmlFor="carreraInput">Carrera*</label>
            <Select
              id="carreraInput"
              placeholder={estudiante.carrera}
              closeMenuOnSelect={false}
              components={animatedComponents}
              onChange={handleCarreraChange}
              isMulti={false}
              options={carrerasList}
              className="rounded-lg border border-black  mt-4 font-light  w-[270px] md:w-[600px] px-5 py-2"
            />

            <label htmlFor="trabajosInput">Trabajo(s)*</label>
            <Select
              id="trabajosInput"
              defaultValue={trabajos.map((trabajo) => ({
                value: trabajo.icono,
                label: trabajo.nombre,
              }))}
              closeMenuOnSelect={false}
              components={animatedComponents}
              options={trabajosOptions} // Solo los trabajos que no han sido seleccionados
              isMulti
              onChange={handleTrabajosChange} // Actualizar el estado de trabajos seleccionados
              className="rounded-lg border border-black mt-4 font-light w-[270px] md:w-[600px] px-5 py-2 overflow-visible whitespace-normal"
            />
          </div>
        </div>
        <br />
        <label htmlFor="AcercaDe" className=" space-y-3 mt-3">
          Acerca de*
        </label>
        <div className=" px-5 mx-auto flex items-center justify-center">
          <textarea
            placeholder={estudiante.acercaDe}
            name="acercaDe"
            id="AcercaDe"
            cols="79"
            rows="4"
            onChange={handleAcercaDeChange}
            maxLength={500}
            className="rounded-lg border border-black  mt-4 font-light w-[1250px] py-5 px-3 h-[180px]"
          />
        </div>
        <br />
        <button className="py-4 px-5 border-[1px] border-Space-cadet rounded-md">
          Enviar
        </button>
      </form>
    );
  };

  // METODOS PARA MANEJO DE LA FOTO DE PERFIL
  const actualizarFoto = () => {
    MySwal.fire({
      title: "Actualizar Foto",
      html: (
        <div className="flex flex-col space-y-2">
          {/* Input para seleccionar imagen */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            accept=".jpeg, .png, .jpg"
            onChange={handleImageChange}
          />
          <label
            htmlFor="fileInput"
            accept=".jpeg, .png, .jpg"
            className="bg-white border border-black text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
          >
            Actualizar imagen de perfil
          </label>
          <h6 className="text-sm text-gray-500 mt-2 ml-1 font-normal">
            El tamaño máximo permitido para la foto es 1 MB.
          </h6>
          {/* Botón para subir imagen */}
        </div>
      ),
      showConfirmButton: false,
    });
  };

  const handleImageChange = async (e) => {
    fotoPerfil = e.target.files[0];

    const maxSize = 1 * 1024 * 1024;
    if (fotoPerfil.size > maxSize) {
      Swal.fire({
        title: "Archivo demasiado grande",
        icon: "error",
        text: "La foto no debe superar 1 MB de tamaño.",
      });
      fotoPerfil = {};
      return;
    } else {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = reader.result;
        estudiante.imageUrl = base64String;
      };

      reader.readAsDataURL(fotoPerfil);

      const getStorage = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}`;
      const storageStudent = await axios.get(getStorage, {
        auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
      });

      const storageImage = {
        data: storageStudent.data,
        rev: storageStudent.data._rev,
      };

      const attachments = {
        _attachments: {
          "imagen.jpg": {
            content_type: "image/jpeg",
            data: estudiante.imageUrl.split(",")[1],
          },
        },
      };

      storageImage.data._attachments["imagen.jpg"] =
        attachments._attachments["imagen.jpg"];

      await axios.put(
        `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}`,
        storageImage.data,
        {
          auth: {
            username: "unichamba",
            password: "S3pt13mbre#2024Work",
          },
          params: { rev: storageImage.rev },
        }
      );

      estudiante.imageUrl = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}/imagen.jpg`;

      await axios.put(
        `https://couchdbbackend.esaapp.com/unichamba-estudiantes/${estudiante.id}`,
        estudiante,
        {
          auth: {
            username: "unichamba",
            password: "S3pt13mbre#2024Work",
          },
          params: { rev: estudiante.rev },
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Swal.fire({
        title: "Imagen actualizada",
        icon: "success",
        text: "La imagen se actualizó correctamente",
      });

      fotoPerfil = {};
      fetchData();
    }
  };

  // CONTROLES PARA ELIMINAR LA CUENTA
  const modalEliminarCuenta = () => {
    Swal.fire({
      title: "¿Seguro que quieres eliminar tu cuenta?",
      icon: "warning|",
      showCancelButton: true,
      confirmButtonColor: "#161A30",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarCuenta();
      }
    });
  };

  const eliminarCuenta = async () => {
    const getStudentStorage = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}`;
    const storage = await axios.get(getStudentStorage, {
      auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
    });

    const storageData = {
      rev: storage.data._rev,
    };

    const deleteStorageRequest = `https://couchdbbackend.esaapp.com/unichamba-estudiantes-storage/${estudiante.id}`;
    await axios.delete(deleteStorageRequest, {
      params: { rev: storageData.rev },
      auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
    });

    const deleteStudentRequest = `https://couchdbbackend.esaapp.com/unichamba-estudiantes/${estudiante.id}`;
    await axios.delete(deleteStudentRequest, {
      params: { rev: estudiante.rev },
      auth: { username: "unichamba", password: "S3pt13mbre#2024Work" },
    });

    Swal.fire({
      title: "¡Tu cuenta ha sido borrada de Unichamba!",
      text: "Esperamos verte pronto de nuevo, puedes volver siempre que desees",
      icon: "success",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/";
      }
    });
  };

  // USEEFFECT PARA DISPARAR LAS LLAMADAS A LOS DATOS
  useEffect(() => {
    fetchData();
    fetchTrabajos();
    fetchCarreras();
  }, [location.pathname, user.email, idPerfil]);

  return (
    <>
      {/* HEADER */}
      <header>
        <nav className=" h-[90px] flex items-center justify-center px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50 md:justify-start">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
        </nav>
      </header>

      {/* MAIN */}
      <main className=" mb-10 mt-24">
        {/* FOTO DE PERFIL Y PORTADA */}
        <div className="realtive">
          <div className=" mt-2 mx-2 bg-portada bg-cover h-[290px] relative md:mx-5 flex justify-between">
            <NavLink
              to="/studentsPublications"
              className="h-[50px] w-[80px] px-2 border-[1px]  border-transparent rounded-lg placeholder:text-white focus:outline-none mr-3 flex text-white md:px-5"
            >
              <button>
                <span class="material-symbols-outlined">arrow_back</span>
              </button>
            </NavLink>
            {location.pathname === "/studentProfile" ? (
              <button
                className="mx-4 px-1 text-gray-400 rounded-lg font-normal bg-gray-800 relative top-3 max-h-10"
                onClick={modalEliminarCuenta}
              >
                Eliminar cuenta
              </button>
            ) : null}
          </div>
          <div className=" w-[200px]  h-[200px] ml-12 rounded-full overflow-hidden flex items-center absolute top-60 left-10 md:left-5 border-4">
            <img src={estudiante.imageUrl} alt="" className=" " />
          </div>

          {location.pathname === "/studentProfile" ? (
            <span
              className="material-symbols-outlined cursor-pointer text-4xl pt-3 absolute left-64 md:left-60 z-50"
              onClick={actualizarFoto}
            >
              add_a_photo
            </span>
          ) : null}

          <div className="flex justify-center right-6 pt-20 md:pt-5 md:absolute ">
            {trabajos &&
              trabajos.map((trabajo) => (
                <span class="material-symbols-outlined text-Dark-Blue text-5xl">
                  {trabajo.icono}
                </span>
              ))}
          </div>
        </div>

        {/* INFORMACION */}
        <div className=" w-[95%] mx-auto md:flex justify-between mt-[10px] md:w-[97%] md:mt-[55px]">
          <div className=" w-[100%] py-5 flex flex-col items-center md:w-[20%]">
            <h2 className="text-3xl font-normal ">{estudiante.nombre}</h2>
            <h1 className="text-2xl font-normal ">{estudiante.apellido}</h1>
            <div className="w-full flex justify-center">
              {" "}
              <WhatsAppButton phoneNumber={estudiante.whatsapp} />{" "}
            </div>
            {location.pathname === "/studentProfile" ? (
              // <NavLink to={"/editProfile"}>
              <button
                className="mx-4 py-2 px-6 text-Space-cadet rounded-lg font-normal bg-Navbar relative top-3 max-h-10"
                onClick={editarPerfil}
              >
                Editar perfil
              </button>
            ) : // </NavLink>
            null}
            <div className=" mt-5 px-2 flex flex-col justify-start md:items-center w-full">
              <span className="font-normal">Informacion personal</span>
              <ul className=" mt-5">
                <li className="flex items-center">
                  <span class="material-symbols-outlined">call</span>
                  <span className=" ml-2 font-normal">Telefono fijo</span>
                </li>
                <p className=" ml-9 mb-3 font-light">{estudiante.telefono}</p>

                <li className="flex items-center">
                  <span class="material-symbols-outlined">mail</span>
                  <span className=" ml-2 font-normal">Email</span>
                </li>
                <p className=" ml-9 mb-3 font-light">{estudiante.email}</p>

                <li>
                  <span class="material-symbols-outlined">apartment</span>
                  <span className=" ml-2 font-normal">Educacion actual</span>
                </li>
                <p className=" ml-9 font-light">{estudiante.carrera}</p>
              </ul>
            </div>
          </div>

          <div className="w-[95%] pt-5 md:w-[80%]">
            <h3 className=" ml-5 text-2xl font-normal">Acerca de</h3>
            <div className=" w-[100%] ml-5 font-light text-lg">
              <p>{estudiante.acercaDe}</p>
            </div>
            <div className="grid grid-cols-2 mt-10">
              <div className=" ml-5">
                <h3 className=" text-2xl font-normal">
                  Experiencias en trabajos
                </h3>
                <ul className=" font-light space-y-1 pt-2 text-lg">
                  {trabajos &&
                    trabajos.map((trabajo) => (
                      <li key={trabajo.id}>
                        <span className="material-symbols-outlined mr-2">
                          {trabajo.icono}
                        </span>
                        {trabajo.nombre}
                      </li>
                    ))}
                </ul>
              </div>
              <div className=" ml-5">
                <h3 className=" text-2xl font-normal">Curriculum</h3>
                {location.pathname === "/studentProfile" ? (
                  <div>
                    <form onSubmit={handleSubmit}>
                      <input
                        type="file"
                        id="archivo"
                        accept=".pdf"
                        className="px-1"
                        onChange={handlePDFChange}
                      />
                      <h6 className="text-sm text-gray-500 mt-2 ml-1 font-normal">
                          El tamaño máximo permitido para el archivo es 1 MB.
                      </h6>
                      <button
                        type="submit"
                        disabled={!archivoSeleccionado}
                        className={`font-normal py-2 px-6 rounded-lg block mt-3 ${
                          archivoSeleccionado
                            ? "bg-Space-cadet text-white"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        Subir Archivo
                      </button>
                    </form>
                    <div>
                      {estudiante.pdfUrl != "" ? (
                        <>
                          <a
                            href={estudiante.pdfUrl}
                            target="_blank"
                            className="font-bold mt-5 pl-2 block"
                          >
                            <img src="/pdf.png" className=" w-20 ml-5" />
                          </a>
                          <button
                            className=" bg-red-600 text-white font-normal p-2 rounded-lg block mt-3"
                            onClick={deletePdf}
                          >
                            Eliminar archivo
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div>
                    {estudiante.pdfUrl != "" ? (
                      <a
                        href={estudiante.pdfUrl}
                        target="_blank"
                        className="font-bold mt-2 block"
                      >
                        <img src="/pdf.png" className=" w-20 ml-5" />
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {loading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
          <div className="spinner">
            <div class="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
              <div className="animate-spin rounded-full h-32 w-32 border-t-8 border-blue-900"></div>
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="text-gray-900"
              ></path>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default StudentProfile;

import { NavLink, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../data/firebase";
import { UserAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import WhatsAppButton from "../components/WhatsAppButton";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import OrdenarCarreras from "../components/ordenCarreras";


// Este es la paginación de Elias

const StudentProfile = () => {
  const location = useLocation();
  const { idPerfil } = useParams();
  const [estudiante, setEstudiante] = useState([]);
  const [pdf, setPdf] = useState(null);
  const { user } = UserAuth();
  const initialpdf = { hojadevida: "" };
  const [trabajosOptions, setTrabajosOptions] = useState([])

  let nombreActualizado = {};
  let apellidoActualizado = {};
  let telefonoActualizado = {};
  let whatsappActualizado = {};
  let acercaDeActualizado = {};

  const [value, setValue] = useState(initialpdf);
  let trabajosInicial = []
  let carreraActualizada={}
  let setCarreraActualizada=null
  
  const [image, setImage] = useState(null);
  let student = [];
  let nombrePdf = "";
  const MySwal = withReactContent(Swal);
  const animatedComponents = makeAnimated();
  const [carrerasList, setCarrerasOptions] = useState([]);

  const fetchData = async () => {
    const studentsSnapshot = await getDocs(collection(db, "estudiantes"));
    const estudiantes = studentsSnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    const perfilSeleccionado = estudiantes.find(
      (estudiante) => estudiante.id === idPerfil
    );
    student = estudiantes;

    if (location.pathname === "/studentProfile") {
      student.map((perfil) => {
        if (perfil.email === user.email) {
          setEstudiante(perfil);
        }
      });
    } else {
      setEstudiante(perfilSeleccionado);
    }
  };

  const fetchTrabajos = async () => {
    const trabajosCollection = collection(db, "trabajos");
        const trabajosSnapshot = await getDocs(trabajosCollection);
        const trabajosList = trabajosSnapshot.docs.map(doc => ({
          value: doc.id,
          label: doc.data().nombre,
          icon: doc.data().icono
        }));
        trabajosList.sort((a, b) => a.label.localeCompare(b.label));
        setTrabajosOptions(trabajosList);
  }

  const fetchCarreras = async () => {
    try {
      const carrerasCollection = collection(db, 'carreras');
      const carrerasSnapshot = await getDocs(carrerasCollection);
      const carrerasList = carrerasSnapshot.docs.map(doc => ({
        value: doc.id,
        label: doc.data().carrera,
        // Puedes agregar más propiedades según sea necesario
      }));
      carrerasList.sort((a, b) => a.label.localeCompare(b.label));
      setCarrerasOptions(carrerasList);
    } catch (error) {
      console.error('Error al obtener carreras:', error);
      // Manejo de errores aquí
    }
  };

  const actualizarFoto = () => {
    MySwal.fire({
      title: 'Actualizar Foto',
      html: (
        <div className="flex flex-col space-y-2">
          {/* Input para seleccionar imagen */}
          <input
            type="file"
            id="fileInput"
            className="hidden"
            onChange={handleImageChange}
            accept="image/jpeg, image/png, image/jpg"
          />
          <label
            htmlFor="fileInput"
            className="bg-white border border-black text-black px-4 py-2 rounded-lg cursor-pointer hover:bg-gray-200 transition duration-300"
          >
            Actualizar imagen de perfil
          </label>
          {/* Botón para subir imagen */}
          
        </div>
      ),
      showConfirmButton: false,
    });
  };

  const { trabajos } = estudiante;

  const handlePDFChange = (e) => {
    let archivo = document.getElementById("archivo");
    let archivoRuta = archivo.value;
    let extPermitidas = /(.pdf)$/i;

    if (!extPermitidas.exec(archivoRuta)) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Asegúrate de subir un PDF",
      });
      archivo.value = "";
      return false;
    } else {
      setPdf(e.target.files[0]);
    }
  };

  const addOrEdit = async (link) => {
    try {
      const docId = estudiante.id;

      const uploadPdf = async (file) => {
        nombrePdf = file.name;
        const pdfRef = ref(storage, `cvPerfil/${docId}/${file.name}`);
        await uploadBytes(pdfRef, file);
        const fileUrl = await getDownloadURL(pdfRef);
        return fileUrl;
      };

      const url = await uploadPdf(pdf);

      await updateDoc(doc(db, "estudiantes", docId), { hojadevida: url });
      await updateDoc(doc(db, "estudiantes", docId), { pdfNombre: nombrePdf });
      document.getElementById("archivo").value = "";

      Swal.fire({
        title: "PDF agregado",
        icon: "success",
        text: "El PDF se agregó correctamente",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const deletePdf = async () => {
    try {
      const docId = estudiante.id;
      const docNombre = estudiante.pdfNombre;

      const pdfRef = ref(storage, `cvPerfil/${docId}/${docNombre}`);

      await deleteObject(pdfRef);

      await updateDoc(doc(db, "estudiantes", docId), { hojadevida: "" });
      await updateDoc(doc(db, "estudiantes", docId), { pdfNombre: "" });
      Swal.fire({
        title: "PDF eliminado",
        icon: "success",
        text: "El PDF se elimino correctamente",
      });
      fetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(value);
    console.log(pdf);
    addOrEdit(value);
  };

  // CAPTURA LOS INPUTS PARA EDITAR
  const handleNombreChange = (e) => {
    const name = {
      nombre: e.target.value
    } 

    nombreActualizado = name
  };

  const handleApellidoChange = (e) => {
    const lastName = {
      apellido: e.target.value
    } 

    apellidoActualizado = lastName
  };

  const handleTelefonoChange = (e) => {
    const phone = {
      telefono: e.target.value
    } 

    telefonoActualizado = phone
  };

  const handleWhatsappChange = (e) => {
    const whats = {
      whatsapp: e.target.value
    } 

    whatsappActualizado = whats
  };

  const handleAcercaDeChange = (e) => {
    const descripcion = {
      acercaDe: e.target.value
    } 

    acercaDeActualizado = descripcion
  };

  // SUBMIT PARA SUBIR EDICION
  const editSubmit = async (e) => {
    e.preventDefault()
    const isEmpty = (obj) => Object.keys(obj).length === 0;

    if (!isEmpty(nombreActualizado)) {
      await updateDoc(doc(db, "estudiantes", estudiante.id), { nombre: nombreActualizado.nombre });
      nombreActualizado = {}
    }

    if (!isEmpty(apellidoActualizado)) {
      await updateDoc(doc(db, "estudiantes", estudiante.id), { apellido: apellidoActualizado.apellido }); 
      apellidoActualizado = {} 
    }

    if (!isEmpty(telefonoActualizado)) {
      await updateDoc(doc(db, "estudiantes", estudiante.id), { telefono: telefonoActualizado.telefono }); 
      telefonoActualizado = {} 
    }

    if (!isEmpty(whatsappActualizado)) {
      await updateDoc(doc(db, "estudiantes", estudiante.id), { whatsapp: whatsappActualizado.whatsapp }); 
      whatsappActualizado = {} 
    }

    if (!isEmpty(acercaDeActualizado)) {
      await updateDoc(doc(db, "estudiantes", estudiante.id), { acercaDe: acercaDeActualizado.acercaDe }); 
      acercaDeActualizado = {} 
    }

    if (!isEmpty(carreraActualizada)) {
      await updateDoc(doc(db, "estudiantes", estudiante.id), { carrera: carreraActualizada.carrera })
      carreraActualizada = {} 
    }
    
    if (trabajosInicial.length > 0) {
      await updateDoc(doc(db, "estudiantes", estudiante.id), { trabajos: trabajosInicial })
      trabajosInicial = [] 
    }
    

    Swal.fire({
      title: "Edicion exitosa",
      icon: "success",
      text: "Los cambios se aplicaron correctamente"
    })
    fetchData()

  }
  
  const handleTrabajosChange = (selectedOptions) => {
    const trabajos = selectedOptions.map(option => ({
      icono: option.icon,
      nombre: option.label
    }));
    trabajosInicial = trabajos
  }

  const handleCarreraChange = (e) => {
    const carreras = {
      carrera: e.label
    };
    carreraActualizada=carreras
    
    console.log(carreraActualizada);
  };

  const editarPerfil = () => {
    MySwal.fire({
      title: "Editar Perfil",
      customClass: {
        container: "my-custom-modal",
      },
      html: (
        <form onSubmit={editSubmit}>
          <div className="flex w-full">
            {/* <label htmlFor="nombreInput" className="mt-7 font-normal">
                Nombre(s)*
              </label> */}
            <div className="px-5 space-y-3">  
              <input
                placeholder="Nombres"
                type="text"
                id="nombreInput"
                className="rounded-lg border border-black font-normal py-4 w-[600px] px-5"
                name="nombre"
                onChange={handleNombreChange}
                pattern="^[A-Za-záéíóúÁÉÍÓÚ]+\s[A-Za-záéíóúÁÉÍÓÚ]+$"
              />

              <input
                placeholder="Apellidos"
                type="text"
                id="apellidoInput"
                className="rounded-lg border border-black font-normal py-4 w-[600px] px-5"
                name="apellido"
                onChange={handleApellidoChange}
                pattern="^[A-Za-záéíóúÁÉÍÓÚ]+\s[A-Za-záéíóúÁÉÍÓÚ]+$"
              />

              <input
                placeholder="Telefono"
                type="text"
                id="telefonoInput"
                className="rounded-lg border border-black font-normal py-4 w-[600px] px-5"
                name="telefono"
                pattern="[0-9]{8}"
                onChange={handleTelefonoChange}
              />
            </div>

            <div className="w-full px-5 flex flex-col items-center justify-start space-y-3">
              <input
                placeholder="WhatsApp"
                type="text"
                id="whatsappInput"
                className="rounded-lg border border-black font-normal py-4 w-[600px] px-5"
                name="whatsapp"
                onChange={handleWhatsappChange}
                pattern="[0-9]{8}"
              />

              <Select
                placeholder="Seleccione una carrera"
                closeMenuOnSelect={false}
                components={animatedComponents}
                onChange={handleCarreraChange}
                isMulti={false}
                options={carrerasList}
                className="rounded-lg border border-black  mt-4 font-light w-[600px] px-5 py-2"
              />

              <Select
                placeholder="Seleccione los trabajos"
                closeMenuOnSelect={false}
                components={animatedComponents}
                options={trabajosOptions}
                isMulti
                onChange={handleTrabajosChange}
                className="rounded-lg border border-black  mt-4 font-light w-[600px] px-5 py-2"
              />
            </div>

          </div>

          <div className="py-5 px-5 mx-auto flex items-center justify-center">
              <textarea
                placeholder="Puedes hablar acerca de tus conocimientos o sobre tus aptitudes"
                name="acercaDe"
                id=""
                cols="79"
                rows="4"
                onChange={handleAcercaDeChange}
                maxLength={500}
                className="rounded-lg border border-black  mt-4 font-light w-[1250px] py-5 px-3 h-[180px]"
              />
          </div>
          <button className="py-4 px-5 border-[1px] border-Space-cadet rounded-md">Enviar</button>
        </form>
      ),
      showConfirmButton: false,
      showCancelButton: true,
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
  }

  const handleImageChange = async (e) => {
    const selectedImage = e.target.files[0];

    try {
      const imageRef = ref(
        storage,
        `imagenesPerfil/${estudiante.id}/${selectedImage.name}`
      );
      await uploadBytes(imageRef, selectedImage);
      const imageUrl = await getDownloadURL(imageRef);

      await updateDoc(doc(db, "estudiantes", estudiante.id), {
        imageUrl: imageUrl,
      });

      setEstudiante({ ...estudiante, imageUrl: imageUrl });

      Swal.fire({
        title: "Imagen actualizada",
        icon: "success",
        text: "La imagen se actualizó correctamente",
      });

      setImage(null); // Limpiar la imagen seleccionada después de subirla
    } catch (error) {
      console.error("Error al subir la imagen:", error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Hubo un problema al subir la imagen",
      });
    }
  };
  
  
  useEffect(() => {
    fetchData();
    fetchTrabajos();
    fetchCarreras();
  }, [location.pathname, user.email, idPerfil]);

  return (
    <>
      {/* HEADER */}
      <header>
        <nav className="h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50">
          <NavLink to="/inicio">
            <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
          </NavLink>
        </nav>
      </header>

      {/* MAIN */}
      <main className=" mb-10 mt-24">
        {/* FOTO DE PERFIL Y PORTADA */}
        <div className="realtive">
          <div className=" mt-2 mx-5 bg-portada bg-cover h-[290px] relative">
            <NavLink
              to="/"
              className="h-[50px] w-[80px] px-5 border-[1px]  border-transparent rounded-lg placeholder:text-white focus:outline-none mr-3 flex  text-white"
            >
              <button>
                <span class="material-symbols-outlined">arrow_back</span>
              </button>
            </NavLink>
            {location.pathname === "/studentProfile" ? (
              <button
                className="mx-4 py-2 px-6 text-Space-cadet rounded-lg font-normal bg-Navbar absolute  bottom-5 right-1"
                onClick={editarPerfil}
              >
                Editar perfil
              </button>
            ) : null}
          </div>
          <div className=" w-[200px]  h-[200px] ml-12 rounded-full overflow-hidden flex items-center absolute top-60 left-5 border-4">
            <img src={estudiante.imageUrl} alt="" className=" " />
          </div>

          {location.pathname === "/studentProfile" ? (
            <span
              className="material-symbols-outlined cursor-pointer text-4xl pt-3 absolute left-60 z-50"
              onClick={actualizarFoto}
            >
              add_a_photo
            </span>
          ) : null}

          <div className="absolute right-6 pt-7 flex">
            {trabajos &&
              trabajos.map((trabajo) => (
                <span class="material-symbols-outlined text-Dark-Blue text-5xl">
                  {trabajo.icono}
                </span>
              ))}
          </div>
        </div>

        {/* INFORMACION */}
        <div className="flex justify-between w-[97%] mx-auto relative mt-[55px]">
          <div className="w-[20%] py-5 flex flex-col items-center">
            <h2 className="text-3xl font-normal">{estudiante.nombre}</h2>
            <h1 className="text-2xl font-normal">{estudiante.apellido}</h1>
            <div className="w-full flex justify-center">
              {" "}
              <WhatsAppButton phoneNumber={estudiante.whatsapp} />{" "}
            </div>
            <div className=" mt-5">
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

          <div className="w-[80%] pt-5">
            <h3 className=" ml-5 text-2xl font-normal">
              Acerca de
              {/* <EditarPerfil
                titulo={"acerca de"}
                referencia={"acercaDe"}
                estudiante={estudiante}
              /> */}
            </h3>
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
                      <li key={trabajo.id}>{trabajo.nombre}</li>
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
                        className="px-1"
                        onChange={handlePDFChange}
                      />
                      <button className="bg-Space-cadet text-white font-normal py-2 px-6 rounded-lg block mt-3">
                        Subir un archivo nuevo
                      </button>
                    </form>
                    <div>
                      {estudiante.hojadevida ? (
                        <>
                          <a
                            href={estudiante.hojadevida}
                            target="_blank"
                            className="font-bold mt-5 pl-2 block"
                          >
                            Ver Curriculum
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
                    {estudiante.hojadevida ? (
                      <a
                        href={estudiante.hojadevida}
                        target="_blank"
                        className="font-bold mt-2 block"
                      >
                        Ver Curriculum
                      </a>
                    ) : null}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default StudentProfile;

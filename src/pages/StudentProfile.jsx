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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import WhatsAppButton from "../components/WhatsAppButton";
import EditarPerfil from "../components/EditarPerfil";
import withReactContent from "sweetalert2-react-content";
import Select from "react-select";
import makeAnimated from "react-select/animated";

// Este es la paginación de Elias

const StudentProfile = () => {
  const location = useLocation();
  const { idPerfil } = useParams();
  const [estudiante, setEstudiante] = useState([]);
  const [pdf, setPdf] = useState(null);
  const { user } = UserAuth();
  const initialStateValues = { pdfUrl: "" };
  const [trabajosOptions, setTrabajosOptions] = useState([])
  const [value, setValue] = useState(initialStateValues);
  let trabajosInicial = { trabajos: []}
  const [nuevosTrabajos, setnuevosTrabajos] = useState(trabajosInicial)
  const [image, setImage] = useState(null);
  let student = [];
  const MySwal = withReactContent(Swal);
  const animatedComponents = makeAnimated();

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
        console.log(trabajosOptions)
  }

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
        const pdfRef = ref(storage, `cvPerfil/${docId}/${file.name}`);
        await uploadBytes(pdfRef, file);
        const fileUrl = await getDownloadURL(pdfRef);
        return fileUrl;
      };

      const url = await uploadPdf(pdf);

      await updateDoc(doc(db, "estudiantes", docId), { pdfUrl: url });
      document.getElementById("archivo").value = "";

      Swal.fire({
        title: "PDF agregado",
        icon: "success",
        text: "El PDF se agregó correctamente",
      });
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

  const handleTrabajosChange = (selectedOptions) => {
    const trabajos = selectedOptions.map(option => ({
      icono: option.icon,
      nombre: option.label
    }));
    trabajosInicial = trabajos
    console.log(trabajosInicial)
  }

  const trabajosSubmit = async (e) => {
    await updateDoc(doc(db, "estudiantes", estudiante.id), {trabajos: trabajosInicial})
    fetchData(  )
  }

  const editarTrabajos = () => {
    MySwal.fire({
      title: "Actualizar trabajos",
      html: (
        <div className="flex flex-col space-y-2">
          {/* Input para seleccionar imagen */}
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            onChange={handleTrabajosChange}
            isMulti
            options={trabajosOptions}
            required
            className="rounded-lg border border-black p-3 w-100 h-16  mt-4 font-light"
          />
          <button onClick={trabajosSubmit} className=" pt-24 ">Enviar</button>
        </div>
      ),
      showConfirmButton: false,
      showCancelButton: true,
    })
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
          <div className=" mt-2 mx-5 bg-portada bg-cover h-[290px]">
            <NavLink
              to="/"
              className="h-[50px] w-[80px] px-5 border-[1px]  border-transparent rounded-lg placeholder:text-white focus:outline-none mr-3 flex  text-white"
            >
              <button>
                <span class="material-symbols-outlined">arrow_back</span>
              </button>
            </NavLink>
          </div>
          <div className=" w-[200px]  h-[200px] ml-9 rounded-full overflow-hidden flex items-center absolute top-60 left-5 border-4">
            <img src={estudiante.imageUrl} alt="" className=" " />
          </div>

          <div className="absolute right-6 pt-5">
            {trabajos &&
              trabajos.map((trabajo) => (
                <span class="material-symbols-outlined text-Dark-Blue text-5xl">
                  {trabajo.icono}
                </span>
              ))}
          </div>
        </div>
        <div className="absolute top-30 left-35">
          <br />
          <br />
          <br />
          <span
            className="material-symbols-outlined justify-end opacity-0 hover:opacity-100 top-0 right-0 transition-opacity duration-200"
            onClick={actualizarFoto}
          >
            edit
          </span>
          {/* Input para seleccionar imagen */}
        </div>

        {/* INFORMACION */}
        <div className="flex justify-between px-5 w-[97%] mx-auto relative mt-[85px]">
          <div className="w-[20%] py-5">
            <h2 className="ml-5 text-3xl font-normal">
              {estudiante.nombre}
              <EditarPerfil
                titulo={"nombre"}
                referencia={"nombre"}
                estudiante={estudiante}
              />
            </h2>
            <h1 className="ml-[26px] text-2xl font-normal">
              {estudiante.apellido}
              <EditarPerfil
                titulo={"apellido"}
                referencia={"apellido"}
                estudiante={estudiante}
              />
            </h1>
            <div className=" mt-5 ">
              <span className=" ml-5 font-normal">Informacion personal</span>
              <ul className=" mt-5 ml-4">
                <li className="flex items-center">
                  <span class="material-symbols-outlined">call</span>
                  <span className=" ml-2 font-normal">
                    Telefono fijo
                    <EditarPerfil
                      titulo={"telefono"}
                      referencia={"telefono"}
                      estudiante={estudiante}
                    />
                  </span>
                </li>
                <p className=" ml-9 mb-3 font-light">{estudiante.telefono}</p>

                <li className="flex items-center">
                  <span class="material-symbols-outlined">mail</span>
                  <span className=" ml-2 font-normal">
                    Email
                    <EditarPerfil
                      titulo={"email"}
                      referencia={"email"}
                      estudiante={estudiante}
                    />
                  </span>
                </li>
                <p className=" ml-9 mb-3 font-light">{estudiante.email}</p>

                <li>
                  <span class="material-symbols-outlined">apartment</span>
                  <span className=" ml-2 font-normal">
                    Educacion actual
                    <EditarPerfil
                      titulo={"carrera"}
                      referencia={"carrera"}
                      estudiante={estudiante}
                    />
                  </span>
                </li>
                <p className=" ml-9 font-light">{estudiante.carrera}</p>
              </ul>
              <WhatsAppButton phoneNumber={estudiante.whatsapp} />
            </div>
          </div>

          <div className="w-[80%]">
            <h3 className=" ml-5 text-2xl font-normal">
              Acerca de
              <EditarPerfil
                titulo={"acerca de"}
                referencia={"acercaDe"}
                estudiante={estudiante}
              />
            </h3>
            <div className=" w-[100%] ml-5 font-light text-lg">
              <p>{estudiante.acercaDe}</p>
            </div>
            <div className="grid grid-cols-2 mt-10">
              <div className=" ml-5">
                <h3 className=" text-2xl font-normal">
                  Experiencias en trabajos
                  {location.pathname === "/studentProfile" ? (
                    <span
                      className="material-symbols-outlined justify-end opacity-0 hover:opacity-100 top-0 right-0 transition-opacity duration-200"
                      onClick={editarTrabajos}
                    >
                      edit
                    </span>
                  ) : null}
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
                      <label className="font-light">
                        Suba aqui su Curriculum
                      </label>
                      <input
                        type="file"
                        id="archivo"
                        className="px-1"
                        onChange={handlePDFChange}
                      />
                      <button className="bg-Rich-black text-white font-normal p-2 rounded-lg block mt-3">
                        Enviar
                      </button>
                    </form>
                    <div>
                      <a
                        href={estudiante.pdfUrl}
                        target="_blank"
                        className="font-bold mt-2 block"
                      >
                        Curriculum
                      </a>
                    </div>
                  </div>
                ) : (
                  <div>
                    <a
                      href={estudiante.pdfUrl}
                      target="_blank"
                      className="font-bold mt-2 block"
                    >
                      Curriculum
                    </a>
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

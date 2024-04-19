import React from "react";
import NavGeneral from "../components/NavGeneral";



const CreateStudentAccount = () => {

  const onSubmit = () => {
    window.location.href = '/inicio'
}

  return (
    <>
      <header className="bg-Blanco-cremoso">
        <NavGeneral></NavGeneral>

        <br />
        <br />
        <br />
      </header>
      <main className="bg-Blanco-cremoso h-screen">
        <div className="bg-Blanco-cremoso pl-5">
          <div
            className="flex justify-between items-center"
            style={{ color: "#424769" }}
          >
            <p className="font-bold font-sans text-2xl ml-4 ">
              Crea tu cuenta y encuentra el empleo que estas buscando
            </p>
          </div>
          <form>
            <div className="flex ml-10">
              <div>
                <br />
                <br></br>
                <label htmlFor="nombreInput" className="mt-7">
                  Nombre(s)*
                </label>
                <br></br>

                <input
                  type="text"
                  id="nombreInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="nombre"
                  required
                  pattern="^[a-zA-Z]+\s[a-zA-Z]+$"
                  title="Por favor introduce entre 5 y 30 dígitos."
                />
                <br></br>
                <br></br>
                <label htmlFor="telefonoInput">Telefono celular *</label>
                <br></br>

                <input
                  type="text"
                  id="telefonoInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="telefono"
                  required
                  pattern="[0-9]{8}"
                  title="Por favor, introduce exactamente 8 números."
                />
                <br />
                <br></br>
                <label htmlFor="carreraInput">Carrera</label>
                <br />
                <select className="rounded-lg border border-black p-3 w-80 mt-4 text-lg bg-Blanco-cremoso">
                  <option value="">Seleccione una carrera</option>
                  <optgroup label="Ingenieria y Arquitectura">
                    <option value="doctorado-en-medicina">
                      Doctorado en Medicina
                    </option>
                    <option value="tecnico-en-enfermeria">
                      Técnico en Enfermería
                    </option>
                    <option value="licenciatura-en-anestesiologia-y-medicina-perioperatoria">
                      Licenciatura en Anestesiología y Medicina Perioperatoria
                    </option>
                  </optgroup>
                  <optgroup label="Departamento de ciencias, filosofia y letras">
                    <option value="licenciatura-en-psicologia">
                      Licenciatura en Psicología
                    </option>
                    <option value="licenciatura-en-letras">
                      Licenciatura en Letras
                    </option>
                    <option value="profesorado-en-educacion-basica-para-primer-y-segundo-ciclo">
                      Profesorado en Educación Básica para Primero y Segundo
                      Ciclo
                    </option>
                    <option value="licenciatura-en-ciencias-de-la-educacion-lenguaje-y-literatura">
                      Licenciatura en Ciencias de la Educación, Especialidad
                      Lenguaje y Literatura
                    </option>
                    <option value="licenciatura-en-ciencias-de-la-educacion-primero-y-segundo-ciclo">
                      Licenciatura en Ciencias de la Educación, Especialidad en
                      Primero y Segundo Ciclo de Educación Básica
                    </option>
                    <option value="licenciatura-en-ciencias-de-la-educacion-administracion-escolar">
                      Licenciatura en Ciencias de la Educación, Especialidad en
                      Administración Escolar
                    </option>
                  </optgroup>
                  <optgroup label="Departamento de idiomas">
                    <option value="licenciatura-en-idioma-ingles-ensenanza">
                      Licenciatura en Idioma Inglés: Opción Enseñanza
                    </option>
                    <option value="profesorado-en-idioma-ingles-para-tercer-ciclo">
                      Profesorado en Idioma Inglés para tercer ciclo de
                      educación básica y educación media
                    </option>
                  </optgroup>
                  <optgroup label="Departamento de Ingenieria y Arquitectura">
                    {" "}
                    <option>Arquitectura</option>
                    <option>Ingeniería Civil</option>
                    <option>Ingeniería Industrial</option>
                    <option>Ingeniería Mecánica (4 ciclos)</option>
                    <option>Ingeniería Eléctrica (4 los)</option>
                    <option>Ingeniería Química (4 ciclos)</option>
                    <option>Ingeniería de Sistemas Informáticos</option>
                    <option>
                      Ingeniería en Desarrollo de Software (en linea)
                    </option>
                  </optgroup>
                  <optgroup label="Departamento de ciencias economicas">
                    <option value="licenciatura-en-administracion-de-empresas">
                      Licenciatura en Administración de Empresas
                    </option>
                    <option value="licenciatura-en-mercadeo-internacional">
                      Licenciatura en Mercadeo Internacional
                    </option>
                    <option value="licenciatura-en-contaduria-publica">
                      Licenciatura en Contaduría Pública
                    </option>
                  </optgroup>
                  <optgroup label="Departamento de matemática">
                    <option value="licenciatura-en-estadistica">
                      Licenciatura en Estadística
                    </option>
                    <option value="profesorado-en-matematica-para-tercer-ciclo">
                      Profesorado en Matemática para Tercer Ciclo de Educación
                      Básica y Educación Media
                    </option>
                    <option value="licenciatura-en-ciencias-de-la-educacion-matematica">
                      Licenciatura en Ciencias de la Educación, Especialidad
                      Matemática
                    </option>
                  </optgroup>
                  <optgroup label="Departamento de Física">
                    <option value="licenciatura-en-fisica">
                      Licenciatura en Física
                    </option>
                    <option value="licenciatura-en-geofisica">
                      Licenciatura en Geofísica
                    </option>
                    <option value="profesorado-en-fisica-para-tercer-ciclo">
                      Profesorado en Física para Tercer Ciclo de Educación
                      Básica y Educación Media
                    </option>
                  </optgroup>
                  <optgroup label="Departamento de Biologia">
                    <option value="tecnico-en-turismo-ecologico-y-cultural">
                      Técnico en Turismo Ecológico y Cultural
                    </option>
                    <option value="licenciatura-en-biologia">
                      Licenciatura en Biología
                    </option>
                    <option value="tecnico-en-veterinaria-y-zootecnia">
                      Técnico en Veterinaria y Zootecnia
                    </option>
                    <option value="profesorado-en-biologia-para-tercer-ciclo">
                      Profesorado en Biología para Tercer Ciclo de Educación
                      Básica y Educación Media
                    </option>
                  </optgroup>
                </select>
                <br></br>
                <br />
                <label htmlFor="trabajoInput">Trabajos</label>
                <br></br>

                <select className="rounded-lg border border-black p-3 w-80 mt-4 text-lg bg-Blanco-cremoso">
                  <option value="">Seleccione trabajos</option>
                  <option value="encuestador_campo">
                    Encuestador de campo
                  </option>
                  <option value="trabajador_limpieza">
                    Trabajador de limpieza por horas
                  </option>
                  <option value="promotor_productos">
                    Promotor de productos en supermercados o tiendas
                  </option>
                  <option value="traductor_independiente">
                    Traductor independiente
                  </option>
                  <option value="vendedor_ambulante">
                    Vendedor ambulante de productos diversos
                  </option>
                  <option value="trabajador_eventos">
                    Trabajador de eventos (montaje y desmontaje)
                  </option>
                  <option value="trabajo_agricultura">
                    Trabajo en agricultura temporal (cosecha)
                  </option>
                  <option value="servicio_lavado_autos">
                    Servicio de lavado de autos a domicilio
                  </option>
                  <option value="asistente_personal_virtual">
                    Asistente personal virtual
                  </option>
                  <option value="trabajador_entrega_paquetes">
                    Trabajador de entrega de paquetes
                  </option>
                </select>
                <br></br>
                <br />

                <br></br>
              </div>

              <div className="ml-9">
                <br />
                <br></br>
                <label htmlFor="apellidoInput">Apellido(s)*</label>

                <br></br>
                <input
                  type="text"
                  id="apellidoInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="apellido"
                  required
                  pattern="^[a-zA-Z]+\s[a-zA-Z]+$"
                  title="Por favor introduce entre 5 y 30 dígitos."
                />
                <br></br>
                <br></br>
                <label htmlFor="whatsappInput">WhatsApp *</label>
                <br></br>

                <input
                  type="number"
                  id="whatsappInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="email"
                  required
                />
                <br></br>
                <br></br>

                <label htmlFor="fechaInput">Fecha de Nacimiento</label>
                <br></br>

                <input
                  type="date"
                  id="fechaInput"
                  className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                  name="repetirContraseña"
                  required
                />
              </div>
              <div className="pl-[80px]">
                <img src="./public/Computer login-rafiki 1.png" alt="" />
              </div>
            </div>

            <div className="flex ml-10 bg-Blanco-cremoso ">
              <div>
                {" "}
                <label htmlFor="aptitudInput ">Acerca de</label>
                <br />
                <br></br>
                <textarea
                  placeholder="Puedes hablar acerca de tus conocimientos o sobre tus aptitudes                                         0-500"
                  name=""
                  id=""
                  cols="79"
                  rows="4"
                  className="border border-black rounded-lg resize-none p-3 bg-Blanco-cremoso "
                ></textarea>
              </div>
              <div className="justify-end ml-auto">
                <br />
                
                <div className="flex justify-end mr-40">
                  <h6 className="text-sm text-gray-500 mt-3">
                    Campos obligatorios *
                  </h6>
                </div>
                
                <div className="flex justify-end mr-16">
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="mt-3 checked:bg-Blanco-cremoso"
                    required
                  />
                  <h6 className="text-sm text-gray-500 mt-3 ml-3">
                    Acepto los terminos y condiciones de unichamba
                  </h6>
                </div>
                <br />
                <button className="bg-Azul-Crepúsculo text-white px-4 py-4 rounded-lg w-80 mr-11" onClick={onSubmit}>
                  Crear cuenta estudiante
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </>
  );
};

export default CreateStudentAccount;

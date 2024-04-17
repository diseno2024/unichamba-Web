import React from "react";
import NavGeneral from "../componentes/NavGeneral";

const CreateStudentAccount = () => {
  return (
    <>
      <header className="bg-Blanco-cremoso">
        <NavGeneral></NavGeneral>

        <br />
        <br />
        <br />
      </header>

      <div className="bg-Blanco-cremoso ">
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
              <label htmlFor="contrasenaInput">Contraseña *</label>
              <label className="text-xs text-gray-500 p-6">
                debe contener al menos 6 digitos
              </label>
              <br></br>

              <input
                type="password"
                id="contrasenaInput"
                className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                name="contraseña"
                required
                pattern=".{6,}"
                title="La contraseña debe tener al menos 6 caracteres"
              />
              <br></br>
              <br />
              <label htmlFor="contrasenaInput">Carrera</label>
              <br />
              <select className="rounded-lg border border-black p-3 w-80 mt-4 text-lg bg-Blanco-cremoso">
               <option value="">Seleccione una carrera</option>
                <option value="">
                  Doctorado en Medicina
                </option>
                <option value="">
                  Licenciatura en Ciencias Jurídicas
                </option>
                <option value="">
                  Licenciatura en Sociología
                </option>
                <option value="">
                  Licenciatura en Psicología
                </option>
                <option value="">
                  Licenciatura en Idioma Inglés opción enseñanza
                </option>
                <option>Licenciatura en Ciencias de la Educación</option>
                <option>
                  Licenciatura en Ciencias del Lenguaje y Literatura
                  (descripción pendiente)
                </option>
                <option>
                  Profesorado en Educación Básica para Primero y Segundo Ciclos
                </option>
                <option>Profesorado en Lenguaje y Literatura</option>
                <option>
                  Profesorado en Inglés para Tercer Ciclo de Educación Básica y
                  Educación Media
                </option>
                <option>Profesorado en Educación Física y Deportes</option>
                <option>Arquitectura</option>
                <option>Ingeniería Civil</option>
                <option>Ingeniería Industrial</option>
                <option>Ingeniería Mecánica (4 ciclos)</option>
                <option>Ingeniería Eléctrica (4 ciclos)</option>
                <option>Ingeniería Química (4 ciclos)</option>
                <option>Ingeniería de Sistemas Informáticos</option>
                <option>Licenciatura en Contaduría Pública</option>
                <option>Licenciatura en Administración de Empresas</option>
                <option>Licenciatura en Mercadeo Internacional</option>
                <option>Licenciatura en Química y Farmacia (6 ciclos)</option>
                <option>Licenciatura en Estadística</option>
                <option>Licenciatura en Ciencias Químicas</option>
                <option>Licenciatura en Biología</option>
                <option>Licenciatura en Geofísica</option>
                <option>
                  Profesorado en Ciencias Naturales para Tercer Ciclo de
                  Educación Básica y Educación Media (no ofertada 2017)
                </option>
                <option>
                  Profesorado en Matemática para Tercer Ciclo de Educación
                  Básica y Educación Media
                </option>
                <option>
                  Profesorado en Biología para Tercer Ciclo de Educación Básica
                  y Educación Media{" "}
                </option>
                <option>
                  Profesorado en Física para Tercer Ciclo de Educación Básica y
                  Educación Media{" "}
                </option>
                <option>
                  Profesorado en Química para Tercer Ciclo de Educación Básica y
                  Educación Media{" "}
                </option>
                <option>
                  Profesorado en Ciencias Sociales para Tercer Ciclo de
                  Educación Básica y Educación Media{" "}
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
              <label htmlFor="emailInput">Email *</label>
              <br></br>

              <input
                type="email"
                id="emailInput"
                className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                name="email"
                required
              />
              <br></br>
              <br></br>

              <label htmlFor="edadInput">Edad</label>
              <br></br>

              <input
                type="number"
                id="edadInput"
                className="rounded-lg border border-black p-3 w-80 mt-4 bg-Blanco-cremoso"
                name="repetirContraseña"
                required
              />
            </div>
            <div></div>
          </div>

          <div className="flex ml-10 ">
            <div>
              {" "}
              <label htmlFor="aptitudInput ">Aptitudes</label>
              <br />
              <br></br>
              <textarea
                placeholder="Describa brevemente sus habilidades y aptitudes"
                name=""
                id=""
                cols="85"
                rows="3"
                className="border border-black rounded-lg resize-none p-3 bg-Blanco-cremoso "
              ></textarea>
            </div>
            <div className="justify-end ml-auto">
              <div className="flex justify-end mr-16">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="mt-3"
                  required
                />
                <h6 className="text-xs text-gray-500 mt-3 ml-3">
                  Acepto los terminos y condiciones de unichamba
                </h6>
              </div>
              <br />
              <button className="bg-Azul-Crepúsculo text-white px-4 py-4 rounded-lg w-80 mr-11">
                Crear cuenta empleador
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateStudentAccount;

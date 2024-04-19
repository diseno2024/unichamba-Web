// Aqui trabajara kendall

import React from 'react';

const data = [
  {
    id: 1,
    entidad: "Empresa",
    Cargo: "Desarrollo de Software",
    Descripcion: "Contrata talento digital en El Salvador más rápido obteniendo acceso inmediato a los mayores candidatos pasivos, ya preseleccionados.",
    acercaDe: "Somos un grupo de desarrolladores,una empresa dedicada al rubro y comercialización de servicios logísticos y comerciales. Actualmente nos encontramos en la búsqueda de un desarrollador FullStack.",
    FechaPublicacion: "Publicado Hace 1 Semana",
    Telefono: "78556367",
    Email: "fulldesarrollo@gmail.com",
    Direccion: "Bypass, Santa Ana"
  },

  {
    id: 2,
    entidad: "Empresa",
    Cargo: "Desarrollo de Backend",
    Descripcion: "Oportunidad de aprendizaje para jovones, potencia tus habilidades en el desarrollo de backend",
    acercaDe: "Somos una empresa lider en la creacion de aplicaciones de alto nivel para grandes empresas.",
    FechaPublicacion: "Publicado Hace 3 dias",
    Telefono: "79673456",
    Email: "Devsa@gmail.com",
    Direccion: "Calle 9°, Santa Ana"
  },
  {
    id: 3,
    entidad: "Empresa",
    Cargo: "Desarrollo de Fronted",
    Descripcion: "Una Empresa dedicada a formar jovenes talentos en el area de fronted y nube",
    acercaDe: "Somo una Empresa dedicada a la elaboración de aplicaciones para grandes empresas y prestamos servicios de nube",
    FechaPublicacion: "Publicado Hace 2 Semana",
    Telefono: "74557834",
    Email: "fronteddev@gmail.com",
    Direccion: "Metrocentro, Santa Ana"
  },

  {
    id: 4,
    entidad: "Empresa",
    Cargo: "Desarrollo de IAS",
    Descripcion: "Oportunidad de aprendizaje para jovones, potencia tus habilidades en el desarrollo de IAS a nivel intermedio",
    acercaDe: "Somos una empresa lider en la creacion de IAS que permitan facilitar ciertas tareas en diferentes campos",
    FechaPublicacion: "Publicado Hace 3 dias",
    Telefono: "72366752",
    Email: "Devias@gmail.com",
    Direccion: "proceres, San Salvador"
  },

  {
    id: 5,
    entidad: "Reclutador",
    Cargo: "Desarrollo Sitios Web",
    Descripcion: "Contrata talento digital en El Salvador más rápido obteniendo acceso inmediato a los mayores candidatos pasivos, ya preseleccionados.",
    acercaDe: "Somos un grupo de desarrolladores,una empresa dedicada al rubro y comercialización de servicios logísticos y comerciales. Actualmente nos encontramos en la búsqueda de un desarrollador FullStack.",
    FechaPublicacion: "Publicado Hace 3 Semana",
    Telefono: "76551397",
    Email: "avance@gmail.com",
    Direccion: "Escalon, Santa Ana"
  },


  {
    id: 6,
    entidad: "Empresa",
    Cargo: "Desarrollo de Software",
    Descripcion: "Contrata talento digital en El Salvador más rápido obteniendo acceso inmediato a los mayores candidatos pasivos, ya preseleccionados.",
    acercaDe: "Somos un grupo de desarrolladores,una empresa dedicada al rubro y comercialización de servicios logísticos y comerciales. Actualmente nos encontramos en la búsqueda de un desarrollador FullStack.",
    FechaPublicacion: "Publicado Hace 1 Semana",
    Telefono: "78556367",
    Email: "fulldesarrollo@gmail.com",
    Direccion: "Bypass, Santa Ana"
  },

  {
    id: 7,
    entidad: "Empresa",
    Cargo: "Desarrollo de Backend",
    Descripcion: "Oportunidad de aprendizaje para jovones, potencia tus habilidades en el desarrollo de backend",
    acercaDe: "Somos una empresa lider en la creacion de aplicaciones de alto nivel para grandes empresas.",
    FechaPublicacion: "Publicado Hace 3 dias",
    Telefono: "79673456",
    Email: "Devsa@gmail.com",
    Direccion: "Calle 9°, Santa Ana"
  },

];


const Inicio = () => {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-transparent flex justify-center">
        <div className="flex items-center border border-white rounded-lg p-2 mr-2">
          <input
            type="text"
            placeholder="Puesto o cargo"
            className="px-4 py-2 border border-white rounded-l-lg focus:outline-none focus:border-blue-500 text-white bg-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17l-5-5m0 0l-5 5m5-5V3"
            />
          </svg>
        </div>
        <div className="flex items-center border border-white rounded-lg p-2">
          <input
            type="text"
            placeholder="Municipio"
            className="px-4 py-2 border border-white rounded-l-lg focus:outline-none focus:border-blue-500 text-white bg-transparent"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-white ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 17l-5-5m0 0l-5 5m5-5V3"
            />
          </svg>
        </div>
      </div>



      {/* Botones Ver más */}

      {/* Botón "Ver más" debajo del cuadrado izquierdo */}
      <button style={{ position: 'absolute', top: 'calc(170px + 80% + 20px)', left: 335, backgroundColor: '#31304D', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '10px', fontSize: '16px', cursor: 'pointer', width: '20%' }}>Ver más</button>


      {/* Botón "Ver más" debajo del cuadrado derecho */}
      <button style={{ position: 'absolute', top: 'calc(170px + 80% + 20px)', right: 70, backgroundColor: '#31304D', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '10px', fontSize: '16px', cursor: 'pointer', width: '20%' }}>Ver más</button>


      {/* Botones Crear cuenta y Publicar oferta */}
      <button className="absolute top-4 right-4 bg-white text-black py-2 px-4 rounded-lg text-lg font-semibold border-4 border-white">Crear cuenta</button>

      <button className="absolute top-4 right-60 bg-transparent text-white py-2 px-4 rounded-lg text-lg font-semibold border-4 border-white">Publicar oferta</button>


      {/* Botón Buscar Trabajo */}
      <button className="absolute top-1/3 right-1/2 transform translate-x-1/2 translate-y-1/2 bg-transparent text-white py-2 px-4 rounded-lg text-lg font-semibold border-4 border-white">Buscar Trabajo</button>


      {/* LOGO UNICHAMBA*/}
      <img src='./public/LOGO.svg' style={{ position: 'absolute', top: 1, left: 15, width: '200px', height: '160px', zIndex: 10 }} alt="Imagen pequeña" />

      {/* Fondo de pantalla */}
      <img src='./public/fondo.jpeg' style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Fondo" />

      {/* Fondo de Ola */}
      <img src='./public/ola.jpeg' style={{ width: '100%', height: '200%', objectFit: 'cover' }} alt="Fondo" />


      <section className='flex mx-10 my-3 justify-center'>
        <section className="overflow-y-scroll   bg-Gris-claro/90 rounded-xl shadow-xl mr-7 w-[667px] h-[332px]">
          {data.map(person => (
            <section key={person.id} className=''>
              <section className="rounded-xl shadow px-5 mx-4 py-5 my-6 bg-Azul-Medianoche/90">
                <div >
                  <div className='flex flex-col'>
                    <p className='text-base text-Blanco-cremoso'>{person.Cargo}</p>
                    <p className='text-Blanco-cremoso'> <b>{person.entidad}</b> <i> {" -> " + person.FechaPublicacion}</i> </p>
                    <p className='text-Blanco-cremoso'>{person.Descripcion}</p>
                  </div>
                </div>

              </section>
            </section>
          ))}
        </section>

        <section className="overflow-y-scroll   bg-Gris-claro/90 rounded-xl shadow-xl w-[667px] h-[332px]">
          {data.map(person => (
            <section key={person.id} className=''>
              <section className="rounded-xl shadow px-5 mx-4 py-5 my-6  bg-Azul-Medianoche/90">
                <div >
                  <div className='flex flex-col'>
                    <p className='text-base text-Blanco-cremoso'>{person.Cargo}</p>
                    <p className='text-Blanco-cremoso'> <b>{person.entidad}</b> <i> {" -> " + person.FechaPublicacion}</i> </p>
                    <p className='text-Blanco-cremoso'>{person.Descripcion}</p>
                  </div>
                </div>

              </section>
            </section>
          ))}
        </section>
      </section>

    </div>
  );
}

export default Inicio;
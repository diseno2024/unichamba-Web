import { data } from "../data/ProfileStudentData";

// Este es la paginación de Elias  

const {nombre, ciudad, municipio, contacto, email, educacion} = data[0]

const StudentProfile = () => {
  return (
    <>
    {/* HEADER */}
    <header>
    </header>

    {/* MAIN */}
    <main className=' grid grid-cols-[1fr_2fr] gap-x-4'>
      {/* PERFIL */}
      <div className=' bg-Azul-oscuro/40 w-96 ml-10 mt-5 rounded-lg'>
        {/* CONTENIDO */}
        <div className=' flex justify-center py-5 '>
          <box-icon name='user-circle' size="110px" color="#2D3250"></box-icon>
        </div>

        <div>
          <h3 className=" flex justify-center text-2xl text-Azul-Medianoche font-bold">{nombre}</h3>
          <span className=" flex justify-center font-light">{ciudad},{municipio}</span>
          <a href="#" className=" flex justify-center bg-Azul-Medianoche text-white font-normal p-2 w-40 my-5 mx-auto rounded-xl shadow-xl">Descargar CV</a>

          {/* INFORMACION DEL CONTACTO */}
          <p className=" pl-10 pb-4">Informacion de contacto</p>
          <ul className=' pl-10'>
            <li><strong><box-icon name='phone' size="20px"></box-icon> Telefono</strong></li>
            <span className=' font-extralight ml-5 '>{contacto} (Movil)</span>
            <li><strong><box-icon name='envelope' size="20px"></box-icon>Email</strong></li>
            <span className=' font-extralight ml-5'>{email}</span>
            <li><strong><box-icon name='book-open' size="20px"></box-icon> Educacion</strong></li>
            <span className=' font-extralight ml-5'>{educacion}</span>
          </ul>

          {/* BTN WHATSAPP */}
          <a href="#" className=" flex justify-center mt-32 p-3 w-80 mx-auto mb-5 bg-WhatsApp rounded-xl shadow-xl"><span className=" text-white font-bold mr-2">Contacta conmigo</span><box-icon name='whatsapp' type='logo' color='white' ></box-icon></a>
        </div>
      </div>

      <div>
        2
      </div>
    </main>
    </>
  )
}

export default StudentProfile;
import { data } from "../data/ProfileStudentData";

const {nombre, ciudad, municipio, contacto, email, educacion} = data[0]

const Perfiles = () => {
    return(
        <>
        <div className=' bg-Azul-oscuro/40 w-96 ml-10 mt-5 rounded-lg mx-auto'>
        {/* CONTENIDO */}
        <div className=' flex justify-center py-5 '>
          <box-icon name='user-circle' size="110px" color="#2D3250"></box-icon>
        </div>

        <div>
          <h3 className=" flex justify-center text-2xl text-Azul-Medianoche font-bold">{nombre}</h3>
          <span className=" flex justify-center font-light">{ciudad},{municipio}</span>
          <div className=" flex justify-center py-2">
          <box-icon type='solid' name='capsule' color='#161A30'></box-icon>
          <box-icon name='baby-carriage' type='solid' color='#161A30'></box-icon>
          <box-icon name='library' color='#161A30'></box-icon>
          <box-icon name='dog' type='solid' color='#161A30'></box-icon>
          <box-icon name='brush' color='#161A30'></box-icon>
          </div>
          {/* INFORMACION DEL CONTACTO */}
          <p className=" pl-10 py-4">Informacion de contacto</p>
          <ul className=' pl-10'>
            <li><box-icon name='phone' size="20px"></box-icon><span className=" ml-2 font-normal">Telefono fijo</span></li>
            <span className=' font-extralight pl-5 ml-2'>{contacto} (Movil)</span>
            <li><box-icon name='envelope' size="20px"></box-icon><span className=" ml-2 font-normal">Email</span></li>
            <span className=' font-extralight pl-5 ml-2'>{email}</span>
          </ul>

          {/* BTN WHATSAPP */}
          <a href="#" className=" flex justify-center mt-32 p-3 w-80 mx-auto mb-5 bg-WhatsApp rounded-xl shadow-xl"><span className=" text-white font-bold mr-2">Contacta conmigo</span><box-icon type='logo' name='whatsapp' color='white'></box-icon></a>
        </div>
      </div>
        </>
    )
}

export default Perfiles;
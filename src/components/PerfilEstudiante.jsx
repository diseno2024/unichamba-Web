import { data } from "../data/ProfileStudentData";

const {nombre, ciudad, municipio, contacto, email} = data[0]

const Perfiles = () => {
    return(
        <>
        <div className=' bg-Azul-oscuro/20 w-[310px] h-[800px] rounded-lg mx-auto'>
          {/* CONTENIDO */}
          <div className=' flex justify-center py-5 '>
            <box-icon name='user-circle' size="110px" color="#2D3250"></box-icon>
          </div>

          <div className="text-center">
            <h3 className="text-2xl text-Azul-Medianoche font-bold">{nombre}</h3>
            <span className="font-light">{ciudad},{municipio}</span>

            <div className=" flex justify-center py-2 space-x-2">
              <box-icon type='solid' name='capsule' color='#161A30'></box-icon>
              <box-icon name='baby-carriage' type='solid' color='#161A30'></box-icon>
              <box-icon name='library' color='#161A30'></box-icon>
              <box-icon name='dog' type='solid' color='#161A30'></box-icon>
              <box-icon name='brush' color='#161A30'></box-icon>
            </div>
            {/* INFORMACION DEL CONTACTO */}
            <div className="text-start px-10">
              <p className="py-4 font-normal">Informacion de contacto</p>
              <ul className='space-y-3'>
                <li><box-icon name='phone' size="20px"></box-icon><span className=" ml-2 font-semibold">Telefono fijo</span></li>
                <span className=' font-light pl-5 ml-2'>{contacto} (Movil)</span>
                <li><box-icon name='envelope' size="20px"></box-icon><span className=" ml-2 font-semibold">Email</span></li>
                <span className=' font-light pl-5 ml-2'>{email}</span>
              </ul>
            </div>

            {/* BTN WHATSAPP */}
            <a href="#" className="flex w-[280px] justify-center mt-[310px] mx-auto p-3  bg-WhatsApp rounded-xl shadow-xl"><span className=" text-white font-bold mr-2">Contacta conmigo</span><box-icon type='logo' name='whatsapp' color='white'></box-icon></a>
          </div>
      </div>
        </>
    )
}

export default Perfiles;
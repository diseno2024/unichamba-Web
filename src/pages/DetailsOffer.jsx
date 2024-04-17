import React from 'react'

const DetailsOffer = () => {
return(
    <>
    <div className='w-[95%] mx-auto my-12 bg-Gris-claro pb-3 rounded shadow border border-black'>
        <img className='h-[200px] w-[100%]' src="./public/Fondo-inicio.png" alt="" />
        <div className='my-4 ml-5 text-black'>
            <h1 className='font-normal text-4xl mb-0'>Instalacion Electrica</h1>
            <p className='my-3 ml-2'>Santa Ana- Santa Ana</p>
            <p className='ml-2 my-2 font-semibold text-gray-600'>Descripcion del Empleo</p>
            <p className='ml-2 my-2'>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi ea temporibus sit reiciendis deserunt aut inventore nihil sint excepturi quo incidunt itaque, error eaque quod quibusdam non consequuntur optio beatae! Lorem ipsum dolor, sit amet consectetur adipisicing elit. Et, magnam eaque ad mollitia excepturi illo maxime inventore debitis minus? Reprehenderit eum quos ex eveniet tempore illum assumenda vitae facilis sunt?</p>
            <p className='ml-2 my-2 font-semibold text-gray-600'> Aptitudes o habilidades</p>
            <ul className='ml-8 my-2 list-disc'>
                <li>Tener habilidades manuales</li>
                <li>Tener capacidad de leer dibujos tecnicos</li>
            </ul>
        <button className='ml-4 px-10 py-3 my-5 flex items-center text-white bg-WhatsApp rounded'> <box-icon type='logo' name='whatsapp' color='white'></box-icon>Contacta conmigo</button>
        </div>
       </div>

    </>
)
}

export default DetailsOffer


//Componente de la vista del estudiante para filtrar todo sobre las oportunidades Laborales


import React from 'react'

const OfertaLaboral = ({listStudent}) => {
    const {oferta, localidad, carrera, descripcion} = listStudent;
    
return (
    <>
    {/* foto del estudiante */}
        <div className=' h-[150px] py-3 px-5 flex justify-between bg-Gris-claro mb-6 rounded-[10px] '>
            {/* informacion del estudiante */}
            <div className='flex items-center gap-6'>
                <div className='h-[70px] w-[70px] rounded-full flex items-center justify-center border-[1px] border-Azul-Fuerte'>
                    <box-icon name='user' size='md'></box-icon>
                </div>
                <div className='space-y-1'>
                    <h1 className='text-2xl font-normal'>{oferta}</h1>
                    {/* icons */}
                    <h2 className='text-md font-normal pt-3'>{descripcion}</h2>
                </div>
            </div>
            <div className='text-center space-y-14'>
                <h2 className='font-normal'>{localidad}</h2>
                <div className='space-x-3 pt-5 text-xl'>
                        {carrera}
                </div>
            </div>
        </div>
    </>
)
}

export default OfertaLaboral
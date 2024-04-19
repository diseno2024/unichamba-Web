import React from 'react'

const TarjetaPublicacion = ({listStudent}) => {
    const {estudiante, localidad, carrera, descripcion} = listStudent;
    
return (
    <>
    {/* foto del estudiante */}
        <div className=' h-[150px] py-3 px-5 flex justify-between bg-Gris-claro mb-5 rounded-[10px]'>
            {/* informacion del estudiante */}
            <div className='flex items-center gap-6'>
                <div className='h-[70px] w-[70px] rounded-full flex items-center justify-center border-[1px] border-Azul-Fuerte'>
                    <box-icon name='user' size='md'></box-icon>
                </div>
                <div className='space-y-1'>
                    <h1 className='text-2xl font-normal'>{estudiante}</h1>
                    {/* icons */}
                    <h2 className='text-md font-normal'>{carrera}</h2>
                    <p className='font-normal'>{descripcion}</p>
                </div>
            </div>
            <div className='text-center space-y-14'>
                <h2 className='font-normal'>{localidad}</h2>
                <div className='space-x-3 pt-2'>
                        <box-icon name='plus-medical' color='#31304D'></box-icon>
                        <box-icon type='solid' name='baby-carriage' color='#31304D' ></box-icon>
                        <box-icon name='library'  color='#31304D'></box-icon>
                        <box-icon name='dog' type='solid' color='#31304D' ></box-icon>
                        <box-icon name='brush-alt' color='#31304D' ></box-icon>
                </div>
            </div>
        </div>
    </>
)
}

export default TarjetaPublicacion

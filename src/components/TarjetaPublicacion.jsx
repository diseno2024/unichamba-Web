import { useLocation } from "react-router-dom";

const TarjetaPublicacion = ({listStudent}) => {
    const {estudiante, localidad, carrera, descripcion, FechaPublicacion} = listStudent;
    const location = useLocation();
    
return (
    <>
    {/* foto del estudiante */}
        {location.pathname === '/studentsPublications' 
            ?
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
            <div className='text-center space-y-11'>
                <div>
                    <h2 className='font-normal'>{FechaPublicacion}</h2>
                    <h2 className='font-normal'>{localidad}</h2>
                </div>
                <div className='space-x-3 pt-2'>
                        <box-icon name='plus-medical' color='#31304D'></box-icon>
                        <box-icon type='solid' name='baby-carriage' color='#31304D' ></box-icon>
                        <box-icon name='library'  color='#31304D'></box-icon>
                        <box-icon name='dog' type='solid' color='#31304D' ></box-icon>
                        <box-icon name='brush-alt' color='#31304D' ></box-icon>
                </div>
            </div>
        </div>
        :
        <div className=' h-[150px] py-3 px-5 flex justify-between bg-Azul-oscuro mb-5 rounded-[10px] w-[680px] mx-auto'>
            {/* informacion del estudiante */}
            <div className='flex items-center gap-3'>
                <div className='h-[50px] w-[50px] rounded-full flex items-center justify-center border-[1px] border-white'>
                    <box-icon name='user' size='md' color="white"></box-icon>
                </div>
                <div className='space-y-1 py-2'>
                    <h1 className='text-xl font-normal text-white w-max '>{estudiante}</h1>
                    {/* icons */}
                    <h2 className='text-md font-normal text-white/75 w-max'>{carrera}</h2>
                    <p className='font-normal text-white/75 overflow-hidden w-[320px] h-7'>{descripcion}</p>
                </div>
            </div>
            <div className='text-center space-y-11'>
                {/* <h2 className='font-normal text-white'>{localidad}</h2> */}
                <div>
                    <h2 className='font-normal text-white'>{FechaPublicacion}</h2>
                    <h2 className='font-normal text-white'>{localidad}</h2>
                </div>
                <div className='space-x-3 pt-2'>
                        <box-icon name='plus-medical' color='white' size="xs"></box-icon>
                        <box-icon type='solid' name='baby-carriage' color='white' size="xs" ></box-icon>
                        <box-icon name='library'  color='white' size="xs"></box-icon>
                        <box-icon name='dog' type='solid' color='white' size="xs" ></box-icon>
                        <box-icon name='brush-alt' color='white' size="xs"></box-icon>
                </div>
            </div>
        </div>
        }
    </>
)
}

export default TarjetaPublicacion

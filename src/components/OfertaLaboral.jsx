import { useLocation } from "react-router-dom";

//Componente de la vista del estudiante para filtrar todo sobre las oportunidades Laborales
const OfertaLaboral = ({listStudent}) => {
    const {oferta, localidad, carrera, descripcion} = listStudent;
    const location = useLocation();
    
return (
    <>
    {/* foto del estudiante */}
        {location.pathname === '/OfferExploreStudent' 
            ?
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
            :
            <div className=' h-[150px] py-3 px-5 flex justify-between bg-Azul-oscuro mb-6 rounded-[10px] '>
            {/* informacion del estudiante */}
                <div className='flex items-center gap-6'>
                    <div className='h-[50px] w-[50px] rounded-full flex items-center justify-center border-[1px] border-white'>
                        <box-icon name='user' size='md' color="white" ></box-icon>
                    </div>
                    <div className='space-y-1'>
                        <h1 className='text-2xl font-normal text-white w-max'>{oferta}</h1>
                        {/* icons */}
                        <h2 className='text-md font-normal pt-3 text-white/75 overflow-hidden w-[320px] h-8'>{descripcion}</h2>
                    </div>
                </div>
                <div className='text-end flex flex-col justify-around items-end '>
                    <h2 className='font-normal text-white '>{localidad}</h2>
                    <div className='space-x-3 pt-5 text-md w-max text-white font-light '>
                            {carrera}
                    </div>
                </div>
        </div>
        }
    </>
)
}

export default OfertaLaboral
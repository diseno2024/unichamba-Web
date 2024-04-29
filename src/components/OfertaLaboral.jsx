import { useLocation } from "react-router-dom";

//Componente de la vista del estudiante para filtrar todo sobre las oportunidades Laborales
const OfertaLaboral = ({ listStudent }) => {
    const { oferta, localidad, carrera, descripcion } = listStudent;
    const location = useLocation();

    return (
        <>
            {/* foto del estudiante */}
            {location.pathname === '/OfferExploreStudent'
                ?
                <div className=' min-h-[225px]  py-3 px-5 flex justify-between mb-6 border-b-[1px] border-black/40'>
                    {/* informacion del estudiante */}
                    <div className='flex items-center gap-4'>
                        <div className='min-h-[200px] min-w-[225px] flex items-center justify-start '>
                            <img src="https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2020/11/empresas-en-el-Buen-Fin-que-estan-contratando-768x461.jpg" style={{ width: '225px', height: '173px' }} />
                        </div>
                        <div className='min-h-[160px] '>    
                            <h1 className='text-2xl font-normal text-Blue min-w-max'>{oferta}</h1>
                            <h2 className=' flex flex-nowrap font-normal text-Dark-Blue mt-2 mr-2'>
                                <span className="material-symbols-outlined">
                                    location_on
                                </span>
                                {localidad}</h2>
                            {/* icons */}
                            <h2 className='text-md font-normal pt-3 text-Dark-Blue overflow-hidden min-w-[320px] h-8'>{descripcion}</h2>

                            <div className='flex justify-end  pt-16 text-md min-w-[300px] text-Dark-Blue font-normal  '>
                                {carrera}
                            </div>

                        </div>
                    </div>


                </div>
                :
                <div className=' min-h-[225px]  py-3 px-5 flex justify-between mb-6 border-b-2 border-black/40 hover:bg-Malachite/10'>
                    {/* informacion del estudiante */}
                    <div className='flex items-center gap-3'>
                        <div className='min-h-[200px] min-w-[200px] flex items-center justify-start '>
                            <img src="https://d11cuk1a0j5b57.cloudfront.net/blog/wp-content/uploads/2020/11/empresas-en-el-Buen-Fin-que-estan-contratando-768x461.jpg" style={{ width: '200px', height: '173px' }} />
                        </div>
                        <div className='min-h-[160px] '>
                            <h1 className='text-2xl font-normal text-Blue min-w-max'>{oferta}</h1>
                            <h2 className=' flex flex-nowrap font-normal text-Dark-Blue mt-2 mr-2'>
                                <span className="material-symbols-outlined">
                                    location_on
                                </span>
                                {localidad}</h2>
                            {/* icons */}
                            <h2 className='text-md font-normal pt-3 text-Dark-Blue overflow-hidden min-w-[320px] h-8'>{descripcion}</h2>

                            <div className='flex justify-end  pt-16 text-md min-w-[300px] text-Dark-Blue font-normal  '>
                                {carrera}
                            </div>

                        </div>
                    </div>


                </div>
            }
        </>
    )
}

export default OfertaLaboral
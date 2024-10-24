import React from 'react'

export const Slice = ({card, fading, estudianteAleatorio, ofertaAleatoria}) => {
    const {id, titulo, texto, type} = card

    // console.log(ofertaAleatoria)
  return (
    <div className={`w-[400px] md:w-[700px] mx-[3px] h-full flex-shrink-0 cursor-pointer relative ${type === 'estudiante' ? 'bg-banner bg-left' : 'bg-bannerOferta phone:bg-left'} bg-cover bg-center rounded-xl`}>
        {/* <img src="public/bg_banner.png" alt=""/> */}
            {/* banner presentacion */}
            { id === 1 ?

                <div className={`flex flex-col items-center mt-[75px] space-y-3 transition-transform duration-500 w-[92%] mx-auto ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                    <img src="/LOGO-AZUL.svg" alt="logo" className='md:w-[250px] phone:w-[200px]' />
                    <h1 className='text-2xl lg:text-4xl font-bold whitespace-normal text-center'>{titulo}</h1>
                    <p className='font-normal text-xl text-center'>{texto}</p>
                </div>

                // presentacio
                
                : id !== 1 && id !== 5?

                //crear cuenta, experiencias y carreras

                    <div className={`flex justify-center items-center h-full gap-10 overflow-hidden px-3 transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                        <figure className='pt-[158px] w-[40%] hidden md:block'>
                            <img src={ type === 'estudiante' ? `/img_publicitarias_perfiles/img${id}.png` : `/img_publicitarias_ofertas/img${id}.png`} alt="" className='w-full h-full'/>
                        </figure>

                        <div className='w-full lg:w-[60%] whitespace-normal space-y-3 text-center md:text-left'>
                            <h1 className='text-3xl font-bold'>{titulo}</h1>
                            <p className='font-normal text-xl'>{texto}</p>
                        </div>
                    </div>            
                : titulo == 'estudiante' ?

                <div className={`flex justify-center items-center h-full gap-5 relative transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                    <figure className=' overflow-hidden w-[165px] h-[165px] md:w-[195px] md:h-[195px] bg-cover bg-center rounded-full'>
                        <img src={estudianteAleatorio.imageUrl} alt="perfil-aleatorio" className='-z-50'/>
                    </figure>

                    <div className='w-[60%] h-[60%] overflow-hidden whitespace-normal'>
                        <h3 className='text-[22px] font-normal'>{estudianteAleatorio.nombre}</h3>
                        <p className='text-sm font-light'>{estudianteAleatorio.carrera}</p>
                        <p className='font-normal py-3 h-[110px] overflow-hidden mt-1 px-1'>{estudianteAleatorio.acercaDe}</p>
                    </div>
                    <div className='absolute md:left-[85px] md:bottom-[35px] bottom-16 left-5'>

                    {estudianteAleatorio.trabajos.map( trabajo => 
                        <span className="material-symbols-outlined text-3xl" key={trabajo.nombre}>{trabajo.icono}</span>
                    )}
                        

                    </div>
                </div>

                :
        
                // perfil generico

                 // oferta de empleo
                 <div className={`flex justify-center items-center h-full space-x-6 space-y-4 relative px-2 transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'} `}>
                    <figure className='w-[250px] h-[250px] md:w-[32%] md:h-[85%] bg-center md:bg-cover bg-no-repeat rounded-md'>
                        <img src={ofertaAleatoria.imagen} alt='oferta' className='w-full h-full'/>
                    </figure>
                 <div className='w-[60%] h-[60%] overflow-hidden whitespace-normal hidden md:block'>
                    <p className='font-normal text-lg px-1'>{
                        ofertaAleatoria.description.length > 300 ? `${ofertaAleatoria.description.slice(0, 200)}...` : ofertaAleatoria.description
                    }</p>
                </div>

                <p className='absolute bottom-2 left-5 md:bottom-8 md:left-[250px] font-bold'>{ofertaAleatoria.carrera}</p>
                
                </div> 

            }
    </div>
  )
}

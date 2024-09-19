import React from 'react'

export const Slice = ({card, fading}) => {
    const {id, titulo, texto, nombres, descripcion, carrera} = card
    console.log(card)

  return (
    <div className={`w-[700px] mx-[3px] h-full flex-shrink-0 cursor-pointer relative bg-banner bg-cover bg-center rounded-xl`}>
        {/* <img src="public/bg_banner.png" alt=""/> */}
            {/* banner presentacion */}
            { id === 1 ?

                <div className={`flex flex-col items-center mt-20 space-y-3 transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                    <img src="public/LOGO-AZUL.svg" alt="logo" className='w-[250px]' />
                    <h1 className='text-3xl font-bold'>{titulo}</h1>
                    <p className='font-normal text-xl'>{texto}</p>
                </div>

                // presentacio
                
                : id !== 1 && id !== 5?

                //crear cuenta, experiencias y carreras

                    <div className={`flex justify-center items-center h-full gap-10 overflow-hidden px-5 transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                        <figure className='pt-[158px] w-[40%]'>
                            <img src={`public/img_publicitarias_perfiles/img${id}.png`} alt="" className='w-full h-full'/>
                        </figure>

                        <div className='w-[60%] whitespace-normal space-y-3'>
                            <h1 className='text-3xl font-bold'>{titulo}</h1>
                            <p className='font-normal text-xl'>{texto}</p>
                        </div>
                    </div>            
                :

                // perfil generico

                <div className={`flex justify-center items-center h-full gap-5 relative transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                    <figure className='bg-estudiante w-[180px] h-[180px] bg-cover bg-center rounded-full' />

                    <div className='w-[60%] h-[60%] overflow-hidden whitespace-normal'>
                        <h3 className='text-2xl font-normal'>{nombres}</h3>
                        <p className='text-sm font-light'>{carrera}</p>
                        <p className='font-normal py-3'>{descripcion}</p>
                    </div>
                    <div className='absolute right-10 top-[65px] '>

                        <span className="material-symbols-outlined" style={{fontSize:35}}>support_agent</span>
                        <span className="material-symbols-outlined" style={{fontSize:35}}>format_paint</span>
                        <span className="material-symbols-outlined" style={{fontSize:35}}>electrical_services</span>
                        <span className="material-symbols-outlined" style={{fontSize:35}}>computer</span>

                    </div>
                </div> 

            }
    </div>
  )
}

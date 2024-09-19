import React from 'react'

export const SliceOferta = ({card, fading}) => {
    const {id, titulo, texto} = card;

  return (
    <div className='w-[700px] mx-[3px] h-full flex-shrink-0 cursor-pointer relative bg-bannerOferta bg-cover bg-center rounded-xl'>
    {/* <img src="public/bg_banner.png" alt=""/> */}
        {/* banner presentacion */}
        { id === 1 ?

            <div className={`flex flex-col items-center mt-20 space-y-3 transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                <img src="public/LOGO-AZUL.svg" alt="logo" className='w-[250px]' />
                <h1 className='text-3xl font-bold whitespace-normal px-4 text-center'>{titulo}</h1>
                <p className='font-normal text-xl'>{texto}</p>
            </div>

            // presentacio
            
            : id !== 1 && id !== 5?

            //crear cuenta, experiencias y carreras

                <div className={`flex justify-center items-center h-full gap-8 overflow-hidden px-3 transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'}`}>
                    <figure className='w-[35%] pt-[100px]'>
                        <img src={`public/img_publicitarias_ofertas/img${id}.png`} alt="" className='w-full h-full'/>
                    </figure>

                    <div className='w-[50%] whitespace-normal space-y-3'>
                        <h1 className='text-3xl font-bold'>{titulo}</h1>
                        <p className='font-normal text-xl'>{texto}</p>
                    </div>
                </div>            
            :

            // perfil generico

            <div className={`flex justify-center items-center h-full space-x-6 space-y-4 relative px-2 transition-transform duration-500 ${fading ? 'translate-x-full' : 'translate-x-0'} `}>
                 <figure className='bg-oferta w-[32%] h-[90%] bg-cover bg-center rounded-md' />

                 <div className='w-[60%] h-[60%] overflow-hidden whitespace-normal'>
                    <p className='text-2xl font-semibold py-3 text-center'>{titulo}</p>
                    <p className='font-normal text-lg px-1'>{texto}</p>
                </div>

                <p className='absolute bottom-5 font-bold'>Aplican todas las carreras</p>
                
            </div> 

        }
</div>
  )
}

import React from 'react'
import Arealista from '../data/AreaTrabajo';

import { useState } from 'react';


const AreaTrabajo = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button className='bg-Gris-claro w-[220px] py-[10px] flex justify-between gap-10 rounded-[5px] active:text-white duration-300 font-normal px-6' onClick={() => setIsOpen((prev) => !prev)}>
                Area de trabajo
                <box-icon name='briefcase-alt' color="#161A30" ></box-icon>
            </button>
            {isOpen && <div className="absolute bg-white text-Naranje border-[1px] flex flex-col items-start rounded-[5px] p-2 font-semibold w-[200px] h-[300px] overflow-scroll overflow-x-hidden top-12">
                {Arealista.map(({ nombre, id }) => (
                    <div className="cursor-pointer w-full rounded-lg text-Azul-oscuro py-1 px-1" key={id}>
                        <h3>{nombre}</h3>
                    </div>
                ))}
            </div>}
        </>
    )
}

export default AreaTrabajo



/**
 * 
 * const AreaTrabajo = () => {
return(
    <>
        <button className='bg-Gris-claro w-[220px] py-[10px] flex justify-between gap-10 rounded-[5px] active:text-white duration-300 font-normal px-6' onClick={() => setIsOpen((prev) => !prev)}>
            Area de trabajo
            <span class="material-symbols-outlined">work</span>
        </button>
    </>
)
} */
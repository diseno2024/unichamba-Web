import React from 'react'

const AreaTrabajo = () => {
return(
    <>
        <button className='bg-Gris-claro w-[220px] py-[10px] flex justify-between gap-10 rounded-[5px] active:text-white duration-300 font-normal px-6' onClick={() => setIsOpen((prev) => !prev)}>
            Area de trabajo
            <span class="material-symbols-outlined">work</span>
        </button>
    </>
)
}

export default AreaTrabajo

import { useState } from 'react';
import listCarrers from '../data/carrers'

const CarreraFiltro = () => {
    const [isOpen, setIsOpen] = useState(false);

    return(
        <>
        <button className='bg-Gris-claro w-[200px] py-[10px] flex justify-between gap-10 rounded-[5px] active:text-white duration-300 font-normal px-5' onClick={() => setIsOpen((prev) => !prev)}>
            Carreras
            <box-icon type='solid' name='graduation' color="#161A30" ></box-icon>
        </button>
        {isOpen && <div className="absolute bg-white text-Naranje border-[1px] flex flex-col items-start rounded-[5px] p-2 font-semibold w-[200px] h-[300px] overflow-scroll overflow-x-hidden top-12">
                    {listCarrers.map(({nombre, id}) => (
                        <div className="cursor-pointer w-full rounded-lg text-Azul-oscuro py-1 px-1" key={id}>
                            <h3>{nombre}</h3>
                        </div>
                    ))}
                </div>}
        </>
    )
}

export default CarreraFiltro

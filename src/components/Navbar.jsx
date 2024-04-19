import React from 'react'
const Navbar = () => {
return (
    <>
        <nav className='h-[90px] flex items-center justify-between px-10 bg-Navbar shadow-md shadow-Gris-claro fixed top-0 w-full'>
            <div>
                <img src="/LOGO.svg" alt="" />
            </div>
            {/* search */}
            <div className='border-[1px] border-Azul-Fuerte h-[50px] rounded-[15px] w-[750px] flex items-center justify-between px-5'>
                <input type="search" placeholder='Cargo o Puesto' className='bg-inherit placeholder:text-Azul-Fuerte placeholder:font-normal w-[400px]'/>
                <box-icon name='x' color="#161A30"></box-icon>
                <span className='h-[90%] border-[1px] border-Azul-Fuerte/50 ml-2'></span>
                <input type="search" placeholder='Municipio' className='bg-inherit placeholder:text-Azul-Fuerte placeholder:font-normal h-full w-[400px] pl-[15px]'/>
                <box-icon name='x' color="#161A30"></box-icon>
            </div>
            {/* info del user  */}
            <div className='flex w-[200px] items-center justify-between'>
                <h2 className='text-xl font-normal'>User Account</h2>
                <div className='w-[50px] h-[50px] rounded-full border-[1px] border-Azul-Fuerte flex items-center justify-center'>
                    <box-icon name='user' color="#161A30"></box-icon>
                </div>
            </div>
        </nav>
    </>
)
}

export default Navbar

import React, { useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext';

const Navbar = () => {
    const location = useLocation();

    // proximo sprint 

    // const {user} = UserAuth();
    // const names = '';

    // const getNames = () => {
    //     if(Object.keys(user).length !== 0){
    //         const fullName = user.displayName; 
    //         const palabrasSeparadas = fullName.split(" ");
    //         names = palabrasSeparadas[0] +' ' + palabrasSeparadas[1];
    //     }
    // }
    
    // useEffect(() => {
        
    //     getNames();
        
    //     return () => {
    //         getNames()
    //     }
    // }, [])
    
return (
    <>
    {location.pathname === '/studentProfile' ?
        // falta validacion de que si es empleado de la ues, que no lo mande a un perfil(de el) y si es admin que lo mande a la vista de userAdmin, no a la vista de perfil (siguiente sprint)

            <nav className='h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50'>
                <NavLink to='/inicio'>
                    <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
                </NavLink>
                {/* search */}
                {/* <div className='border-[1px] border-Azul-Fuerte h-[50px] rounded-[15px] w-[750px] flex items-center justify-between px-5'>
                    <input type="search" placeholder='Cargo o Puesto' className='focus:outline-none font-normal bg-inherit placeholder:text-Azul-Fuerte placeholder:font-normal w-[400px]'/>
                    <span class="material-symbols-outlined text-white/50">close</span>
                    <span className='h-[90%] border-[1px] border-white/50 ml-2'></span>
                    <input type="search" placeholder='Municipio' className='focus:outline-none font-normal bg-inherit placeholder:text-Azul-Fuerte placeholder:font-normal h-full w-[400px] pl-[15px]'/>
                    <span class="material-symbols-outlined text-white/50">close</span>
                </div> */}
                {/* info del user  */}
                <div className='flex w-[200px] items-center justify-center'>
                    <NavLink to="/studentProfile"><h2 className='text-xl font-normal text-white'>Usuario</h2></NavLink>
                </div>
            </nav>

        :

            <nav className='h-[90px] flex items-center justify-between px-10 bg-Dark-Blue shadow-md shadow-Gris-claro fixed top-0 w-full z-50'>
                <NavLink to='/inicio'>
                    <img src="/LOGO.svg" alt="LOGO UNICHAMBA AZUL" />
                </NavLink>
                {/* search */}
                <div className='border-[1px] border-Azul-Fuerte h-[50px] rounded-[15px] w-[750px] flex items-center justify-between px-5'>
                    <input type="search" placeholder='Cargo o Puesto' className='focus:outline-none font-normal bg-inherit placeholder:text-Azul-Fuerte placeholder:font-normal w-[400px]'/>
                    <span className="material-symbols-outlined text-white/50">close</span>
                    <span className='h-[90%] border-[1px] border-white/50 ml-2'></span>
                    <input type="search" placeholder='Municipio' className='focus:outline-none font-normal bg-inherit placeholder:text-Azul-Fuerte placeholder:font-normal h-full w-[400px] pl-[15px]'/>
                    <span className="material-symbols-outlined text-white/50">close</span>
                </div>
                {/* info del user  */}
                <div className='flex w-[200px] items-center justify-center'>
                    <NavLink to="/studentProfile"><h2 className='text-xl font-normal text-white'>Usuario</h2></NavLink>
                </div>
            </nav>

}
        
    </>
)
}

export default Navbar

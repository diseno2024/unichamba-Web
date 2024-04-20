import React, { useState } from 'react'
import NavGeneral from "../../components/NavGeneral";
import { NavLink } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = () => {
        window.location.href = '/inicio'
    }

return (
        <>
            <header>
                <NavGeneral />
            </header>
            
                <main className='h-[775px]  bg-Blanco-cremoso pt-28'>
                    <section className='flex justify-between px-8 pt-10'>
                        <h1 className='text-2xl font-bold'>Inicia sesion para poder publicar una oferta laboral</h1>
                        <div><img src="/iniciar-sesion.svg" alt="" /></div>
                    </section>
                    <section className=' w-[90%] mx-auto mt-20'>

                        <div>
                            <h1 className='text-xl font-normal py-3'>Email</h1>
                            <div className='flex gap-5 border-[1px] border-Azul-oscuro rounded-[5px] w-[450px] h-12'>

                                <div className='px-3 h-12 border-[1px] border-Azul-oscuro rounded-[5px] flex items-center'>
                                    <box-icon name='user'></box-icon>
                                </div>
                                <input type="text" className='bg-Blanco-cremoso focus:outline-none font-normal' />
                            </div>
                        </div>

                        <div>
                            <h1 className='text-xl font-normal py-3'>Password</h1>
                            <div className='flex gap-5 border-[1px] border-Azul-oscuro rounded-[5px] w-[450px] h-12'>

                                <div className='px-3 h-12 border-[1px] border-Azul-oscuro rounded-[5px] flex items-center'>
                                    <box-icon name='lock-alt'></box-icon>
                                </div>
                                <input type="text" className='bg-Blanco-cremoso focus:outline-none font-normal' />
                            </div>
                        </div>

                        <NavLink to='/createOffer'>
                            <button className='h-[55px] w-[450px] bg-Azul-Crepúsculo mt-5 font-normal text-white rounded-[5px]'>Ingresar</button>
                        </NavLink>

                    </section>
                </main>
           


        </>
    )
}

export default Login

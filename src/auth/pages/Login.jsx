import React, { useState } from 'react'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const onSubmit = () => {
        window.location.href = '/inicio'
    }

    return (
        <div className='w-screen h-screen'> 
            <header className="flex items-start justify-between p-[15px] border-b-[3px] border-gray-500 bg-Gris-claro">
                <a href="./" className='max-w-[30px]'>
                    <img src="./public/arrow-left-solid.svg" className='w-full' />
                </a>

                <a href="./" className="max-w-[140px]">
                    <img src="./public/LOGO.svg" className='w-full' />
                </a>
            </header>
            <div className='flex flex-wrap justify-between items-center mx-[74px] mt-[20px] my-auto'>
                <h1 className='font-roboto font-semibold text-[26px]'>Iniciar sesión para Publicar una oferta</h1>
                <button className='max-w-[275px] mt-[80px]'>
                    <img src="./public/iniciar-sesion.svg" className='w-full'/>
                </button>
            </div>
            <div className='flex flex-wrap items-center justify-center p-[20px] pt-[40px]'>
                <div className='ml-[55px] m-auto'>              
                    <div className='relative'>
                        <label htmlFor='email' className='font-roboto font-normal'>Email</label><br />
                        <img src='./public/bx-user.svg' className='absolute top-[45%] w-[32px] h-[32px] p-[3px] translate-y-[-2%] border-[1px] border-black rounded-md'/>
                        <input 
                        id="emailInput" 
                        type="email" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='rounded-[5px] border-[1px] bg-white border-black p-[10px_15px] h-[32px] pl-[40px] w-[400px]'
                        />
                    </div>
                    <div className='relative my-[10px]'>
                        <label htmlFor='password' className='font-roboto font-normal'>Contraseña</label><br />
                        <img src='./public/bx-lock-alt.svg' className='absolute top-[45%] w-[32px] h-[32px] p-[3px] translate-y-[-2%] border-[1px] border-black rounded-md'/>
                        <input 
                        id="passwordInput" 
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='rounded-[5px] border-[1px] bg-white border-black p-[10px_15px] h-[32px] pl-[40px] w-[400px]'
                        />
                    </div>
                    <div 
                    id="alerta" 
                    className='hidden border-[1px] border-black font-medium font-roboto text-red-600'
                    >
                        El email o la contraseña son incorrectos. Por favor, inténtelo de nuevo.
                    </div>
                    <a href="./" className='font-roboto font-normal h-[40px]'>Olvide mi contraseña</a><br />
                    <button 
                    onClick={onSubmit} 
                    className='bg-Azul-oscuro border-[1px] border-black rounded-lg h-[35px] w-[400px]  text-white font-roboto font-semibold mt-[20px]'
                    >
                        Ingresar
                    </button>
                </div>
                
            </div>
        </div>
    )
}

export default Login

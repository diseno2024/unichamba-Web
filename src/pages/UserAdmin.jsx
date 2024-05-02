import React, { useState } from 'react'
import NavGeneral from '../components/NavGeneral'

const UserAdmin = () => {
    const [visibleComponent, setVisibleComponent] = useState()
    const [activeButton, setActiveButton] = useState()
    
    const showComponent = (component, buttonID) => {
        setVisibleComponent(component)
        setActiveButton(buttonID)
    }

    return (
        <>
            <header>
                <NavGeneral />
            </header>
            <main className='flex mt-[20px]'>
                <section className='min-w-[260px] max-w-[500px] mx-[20px] justify-center rounded-lg bg-[#D9D9D9]'>
                    <div className='grid my-[20px] py-[10px] justify-center items-center'>
                        <div className='flex justify-center items-center rounded-full border-[1px] border-black w-[140px] h-[140px]'>
                            <span class="material-symbols-outlined text-[70px]">
                                person
                            </span>
                        </div>
                        <h1 className='font-roboto font-medium text-[20px] mt-[10px] text-center'>User Admin</h1>
                    </div>
                    <div className='grid grid-cols-1 w-[400x] pl-[30px] justify-center'>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[45px] items-center pr-[30px] hover:bg-white ${activeButton === 'students' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<h1>Estudiantes</h1>, 'students')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                school
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Estudiantes</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[45px] items-center pr-[30px] hover:bg-white ${activeButton === 'users' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<h1>Usuarios</h1>, 'users')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                person
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Usuarios</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[85px] items-center pr-[30px] hover:bg-white ${activeButton === 'jobOffers' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<h1>Ofertas Laborales</h1>, 'jobOffers')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                description
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Ofertas Laborales</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[45px] items-center pr-[30px] hover:bg-white ${activeButton === 'municipalities' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<h1>Municipios</h1>, 'municipalities')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                location_city
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Municipios</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[45px] items-center pr-[30px] hover:bg-white ${activeButton === 'careers' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<h1>Carreras</h1>, 'careers')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                auto_stories
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Carreras</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[45px] items-center pr-[30px] hover:bg-white ${activeButton === 'blacklist' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<h1>Lista negra</h1>, 'blacklist')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                person_off
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Lista negra</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[45px] items-center pr-[30px] hover:bg-white ${activeButton === 'administrators' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<h1>Administradores</h1>, 'administrators')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                admin_panel_settings
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[70px]'>Administradores</h1>
                        </button>
                    </div>
                    
                    
                </section>
                <section className='min-w-[850px] max-w-[1000px] mx-auto justify-center rounded-md'>
                        <div className='grid grid-cols-3 grid-rows-2 gap-y-[20px] w-[750px] mx-auto'>   
                            <div className='flex items-center justify-between w-[200px] bg-[#D9D9D9] p-[15px] rounded-lg'>
                                <div className='mr-[20px]'>
                                    <h1 className='text-3xl font-medium font-roboto'>0</h1>
                                    <h1 className='text-xl font-roboto font-medium'>Estudiantes</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    school
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[200px] bg-[#D9D9D9] p-[15px] rounded-lg'>
                                <div className='mr-[20px]'>
                                    <h1 className='text-3xl font-medium font-roboto'>0</h1>
                                    <h1 className='text-xl font-roboto font-medium'>Usuarios</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    person
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[200px] bg-[#D9D9D9] p-[15px] rounded-lg'>
                                <div className='mr-[20px]'>
                                    <h1 className='text-3xl font-medium font-roboto'>0</h1>
                                    <h1 className='text-lg font-roboto font-medium'>Ofertas Laborales</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    description
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[200px] bg-[#D9D9D9] p-[15px] rounded-lg'>
                                <div className='mr-[20px]'>
                                    <h1 className='text-3xl font-medium font-roboto'>0</h1>
                                    <h1 className='text-xl font-roboto font-medium'>Estudiantes</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    auto_stories
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[200px] bg-[#D9D9D9] p-[15px] rounded-lg'>
                                <div className='mr-[20px]'>
                                    <h1 className='text-3xl font-medium font-roboto'>0</h1>
                                    <h1 className='text-xl font-roboto font-medium'>Estudiantes</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    admin_panel_settings
                                </span>
                            </div>
                        </div>
                        <div>
                            {visibleComponent}
                        </div>
                    </section>
            </main>
        </>
    )
}

export default UserAdmin
import React, { useEffect, useState } from 'react'
import NavGeneral from '../components/NavGeneral'
import TrabajosUserAdmin from '../components/TrabajosUserAdmin'
import AdministradoresUserAdmin from '../components/AdministradoresUserAdmin'
import AdmiCarrera from '../components/AdmiCarrera';
import AdmiMunicipio from '../components/AdmiMunicipio'
import DocNumber from '../components/DocNumber';
import { BlacklistUserAdmin } from '../components/BlacklistUserAdmin';
import { UserAuth } from '../context/AuthContext';
import AdminWorks from '../components/AdminWorks';



const UserAdmin = () => {
    const {user} = UserAuth();
    const [visibleComponent, setVisibleComponent] = useState()
    const [activeButton, setActiveButton] = useState()
    const showComponent = (component, buttonID) => {
        setVisibleComponent(component)
        setActiveButton(buttonID)
    }



    const fullName = user.displayName; 
    

    return (
        <>
            <header>
                <NavGeneral />
            </header>
            <main className='flex mt-[20px] pb-5'>
                <section className='w-[475px] h-[700px] mx-[20px] justify-center rounded-lg bg-[#D9D9D9]'>

                    <div className='grid my-[20px] py-[10px] justify-center items-center'>
                        <div className='flex justify-center items-center rounded-full border-[1px] border-black w-[140px] h-[140px] mx-auto'>
                            <span class="material-symbols-outlined text-[70px]">
                                person
                            </span>
                        </div>
                        <h1 className='font-roboto font-medium text-2xl pt-[20px] text-center'>PANEL ADMINISTRATIVO</h1>
                    </div>

                    <div className='flex flex-col justify-around space-y-1 py-5 '>

                        <button 
                        className={`grid grid-cols-2 rounded-md h-[55px] items-center pr-[30px] hover:bg-white ${activeButton === 'jobOffers' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<TrabajosUserAdmin/>, 'jobOffers')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                description
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Ofertas Laborales</h1>
                        </button>

                        <button 
                        className={`grid grid-cols-2 rounded-md h-[55px] items-center pr-[30px] hover:bg-white ${activeButton === 'students' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<AdminWorks/>, 'students')}
                        >
                            <span class="material-symbols-outlined text-[38px]">work</span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Trabajos</h1>
                        </button>

                        <button 
                        className={`grid grid-cols-2 rounded-md h-[55px] items-center pr-[30px] hover:bg-white ${activeButton === 'municipalities' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<AdmiMunicipio/>, 'municipalities')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                location_city
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Municipios</h1>
                        </button>

                        <button 
                        className={`grid grid-cols-2 rounded-md h-[55px] items-center pr-[30px] hover:bg-white ${activeButton === 'careers' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<AdmiCarrera/>, 'careers')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                auto_stories
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Carreras</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[55px] items-center pr-[30px] hover:bg-white ${activeButton === 'blacklist' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<BlacklistUserAdmin/>, 'blacklist')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                person_off
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[50px]'>Lista negra</h1>
                        </button>
                        <button 
                        className={`grid grid-cols-2 rounded-md h-[55px] items-center pr-[30px] hover:bg-white ${activeButton === 'administrators' ? 'bg-white' : ''}`}
                        onClick={() => showComponent(<AdministradoresUserAdmin/>, 'administrators')}
                        >
                            <span class="material-symbols-outlined text-[38px]">
                                admin_panel_settings
                            </span>
                            <h1 className='font-roboto font-light text-[20px] mr-[70px]'>Administradores</h1>
                        </button>
                    </div>
                    
                    
                </section>
                <section className='w-[1000px] mx-auto justify-center rounded-md'>
                        <div className='grid grid-cols-3 grid-rows-2 gap-y-[20px] w-[750px] mx-auto'>   
                            <div className='flex items-center justify-between w-[225px] bg-[#D9D9D9] p-[12px] rounded-lg'>
                                <div className='mr-[15px]'>
                                    <h1 className='text-3xl font-medium font-roboto'><DocNumber name='estudiantes'/></h1>
                                    <h1 className='text-xl font-roboto font-medium'>Estudiantes</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    school
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[225px] bg-[#D9D9D9] p-[12px] rounded-lg'>
                                <div className='mr-[15px]'>
                                    <h1 className='text-3xl font-medium font-roboto'><DocNumber name='usuarios'/></h1>
                                    <h1 className='text-xl font-roboto font-medium'>Usuarios</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    person
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[225px] bg-[#D9D9D9] p-[12px] rounded-lg'>
                                <div className='mr-[15px]'>
                                    <h1 className='text-3xl font-medium font-roboto'><DocNumber name='anuncios'/></h1>
                                    <h1 className='text-lg font-roboto font-medium'>Ofertas Laborales</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    description
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[225px] bg-[#D9D9D9] p-[12px] rounded-lg'>
                                <div className='mr-[15px]'>
                                    <h1 className='text-3xl font-medium font-roboto'><DocNumber name='carreras'/></h1>
                                    <h1 className='text-xl font-roboto font-medium'>Carreras</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    auto_stories
                                </span>
                            </div>
                            <div className='flex items-center justify-between w-[225px] bg-[#D9D9D9] p-[12px] rounded-lg'>
                                <div className='mr-[15px]'>
                                    <h1 className='text-3xl font-medium font-roboto'><DocNumber name='administradores'/></h1>
                                    <h1 className='text-xl font-roboto font-medium'>Administradores</h1>
                                </div>
                                <span class="material-symbols-outlined text-[40px]">
                                    admin_panel_settings
                                </span>
                            </div>
                        </div>
                        <div className='w-[950px] mx-auto'>
                            {visibleComponent}
                        </div>
                    </section>
            </main>
        </>
    )
}

export default UserAdmin
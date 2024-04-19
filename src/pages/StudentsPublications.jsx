import React from 'react'
import Navbar from '../components/Navbar'
import students from '../data/students'
import TarjetaPublicacion from '../components/TarjetaPublicacion'
import { NavLink } from 'react-router-dom'

const studentsPublications = () => {
return (
    <>
        <header>
            <Navbar />
        </header>
        <main className='bg-Blanco-cremoso h-auto mt-[6px] pt-28 space-y-8'>
            
            <section className='w-[90%] mx-auto'>
                {students.map( (student) => (
                        <NavLink to="/studentProfile">
                        <TarjetaPublicacion listStudent={student} key={student.id}/>
                        </NavLink>
                ))}

            </section>

        </main>
    </>
)
}

export default studentsPublications

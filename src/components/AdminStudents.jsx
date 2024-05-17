import React, { useEffect, useState } from 'react'
import TarjetaPublicacion from './TarjetaPublicacion'
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase';


const AdminStudents = () => { 
    
    
    const [student, setstudent] = useState  ([])
    const fetchData = async () => {
        const studentsSnapshot = await getDocs(collection(db, 'estudiantes')); // 'carreras' es el nombre de tu colección en Firestore
        const studentsData = studentsSnapshot.docs.map(doc => doc.data()); // Suponiendo que tienes un campo 'nombre' en tus documentos de carrera
        setstudent(studentsData); // emails de los estudiantes ya registrados 
    }

    useEffect(() => {
        fetchData()
        
        return () => {
            fetchData()
        }
    }, [])
    console.log(student)
    
    return (
        <main className='py-10'>
            <h1 className='text-2xl font-normal px-10 py-5'>Perfiles de estudiantes</h1>
            <div className='w-[90%] mx-auto'>
                {student.map((student) => (
                    <>
                    <div className='flex justify-between px-10'>
                        <TarjetaPublicacion listStudent={student} key={student.id}/>
                        <span class="material-symbols-outlined py-10 pr-5 cursor-pointer hover:text-Malachite" style={{fontSize:35}}>add_circle</span>
                    </div>
                    </>
                    ))}
            </div>
        </main>
    )
}

export default AdminStudents

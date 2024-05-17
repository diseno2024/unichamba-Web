import React, { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../data/firebase';

const Secure = ({children}) => {
    const {user} = UserAuth();
    const result = /@ues\.edu\.sv$/.test(user.email);
    let administradores = {};
    let estudiantes = {};
    const navigate = useNavigate();




    const fetchData = async () => {
        const studentsSnapshot = await getDocs(collection(db, 'estudiantes')); // 'carreras' es el nombre de tu colección en Firestore
        const studentsData = studentsSnapshot.docs.map(doc => doc.data().email); // Suponiendo que tienes un campo 'nombre' en tus documentos de carrera
        estudiantes = studentsData; // emails de los estudiantes ya registrados 
        // administradores 
        const adminSnapshot = await getDocs(collection(db, 'administradores'));
        const admins = adminSnapshot.docs.map( doc => doc.data().correo)
        administradores = admins;
    
        if(!user){
            navigate('/inicio')

        }else if(!result){
            navigate('/inicio')
        }
    };

    useEffect(() => {
        fetchData();
    
        return () => {
            fetchData();
        }
    }, [])


    return children
}

export default Secure

import React, { useEffect } from 'react'
import { UserAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


const Secure = ({children}) => {
    const {user} = UserAuth();
    const navigate = useNavigate();



    useEffect(() => {
        if(!user){
            navigate('/studentsPublications')
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debes iniciar sesión!",
            });
        }
    }, [])


    return children
}

export default Secure

import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'

export const useRandomStuden = () => {

    const [docStudent, setdocStudent] = useState({});
    const [docOffer, setdocOffer] = useState({});

    useEffect(() => {
      getStudents();
      getOffer();
    }, [])
    

    //hacemos la peticion a la base de datos, pero solo extraemos el numero de rows 
    const getStudents = async() => {
     const response = await axios.get(`https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?limit=1`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                // setrandom(Math.floor(Math.random()*response.data.total_rows))
                return (Math.floor(Math.random()*response.data.total_rows))
        })
    const student = await axios.get(`https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?skip=${response}&limit=1&include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
               return (response.data.rows);
            })


    setdocStudent(student[0].doc)
        
    }

    // oferta aleatoria 

    const getOffer = async() => {
        const response = await axios.get(`https://couchdbbackend.esaapp.com/unichamba-anuncios/_all_docs?limit=1`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
               .then((response) => {
                   // setrandom(Math.floor(Math.random()*response.data.total_rows))
                   return (Math.floor(Math.random()*response.data.total_rows))
           })
       const offer = await axios.get(`https://couchdbbackend.esaapp.com/unichamba-anuncios/_all_docs?skip=${response}&limit=1&include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
               .then((response) => {
                  return (response.data.rows);
               })
   
   
       setdocOffer(offer[0].doc)
           
       }

return{
    docStudent,
    docOffer
}


}

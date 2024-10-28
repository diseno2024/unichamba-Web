import axios from 'axios';
import { useEffect } from 'react'
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
     
        await axios.get(`https://couchdbbackend.esaapp.com/unichamba-estudiantes/_design/cuenta-reciente/_view/cuenta-reciente?descending=true&limit=1`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
               .then((response) => {
                   // setrandom(Math.floor(Math.random()*response.data.total_rows))
                   setdocStudent(response.data.rows[0].value)
           })
        
    }

    // oferta aleatoria 

    const getOffer = async() => {
        await axios.get(`https://couchdbbackend.esaapp.com/unichamba-anuncios/_design/anuncio-reciente/_view/anuncio-reciente?descending=true&limit=1`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
               .then((response) => {
                   // setrandom(Math.floor(Math.random()*response.data.total_rows))
                   setdocOffer(response.data.rows[0].value)
           })
   
   
           
       }


return{
    docStudent,
    docOffer
}


}

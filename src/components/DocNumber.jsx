import axios from 'axios'
import { collection } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'



const DocNumber = ({ name }) => {

    const [coleccion, setcoleccion] = useState(0)


    useEffect(() => {
        getDocsNumber();

        return () => {
            getDocsNumber();
        }
    }, [])

    const getDocsNumber = async() => {
    await axios.post(`https://couchdbbackend.esaapp.com/${name}/_find`,
        {
            selector: {
              
            }
          },
          {
            auth: {
              username: 'unichamba', 
              password: 'S3pt13mbre#2024Work' 
            }
          },

    )
            .then((response) => {
            setcoleccion(response.data.docs)
        })
    }

    return (
        <>
            {coleccion.length}
        </>
    )
}

export default DocNumber
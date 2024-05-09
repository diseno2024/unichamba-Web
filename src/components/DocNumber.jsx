import React, { useEffect, useState } from 'react'
import { db } from '../data/firebase'
import { collection, getDocs } from 'firebase/firestore'


const DocNumber = ({ name }) => {
    const [coleccion, setColeccion] = useState([])

    const getDoc = async () => {
        const collectionRef = collection(db, name)
        await getDocs(collectionRef)
            .then((resp) => {
                setColeccion(resp.docs.map((doc) => {
                    return { ...doc.data(), id: doc.id }
                }))
            })
    }

    useEffect(() => {
        return getDoc
    }, [])

    return (
        <>
            {coleccion.length}
        </>
    )
}

export default DocNumber
import axios from "axios";
import { useEffect, useState } from "react"

export const useFetch = (database) => {
  
    const [estudiantes, setestudiantes] = useState([]);
    const [admins, setAdministradores] = useState([]);
    const [carreras, setCarreras] = useState([]);
    const [municipios, setMunicipios] = useState([]);
    const [ofertas, setOfertas] = useState([]);
    const [anuncios, setAnuncios] = useState([]);
    const [trabajos, setTrabajos] = useState([]);


    useEffect(() => {
        getData(database);
    }, []);
  
    // , {auth: {username: "unichamba", password: "S3pt13mbre#2024Work"}}

    const getData = (database) => {
        if(database === 'unichamba-estudiantes'){
            axios.get(`https://couchdbbackend.esaapp.com/unichamba-estudiantes/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                setestudiantes(response.data.rows);
            })
        }else if (database === 'unichamba-administradores'){
            axios.get(`https://couchdbbackend.esaapp.com/unichamba-administradores/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                // console.log(response.data.rows);
                setAdministradores(response.data.rows);
            })
        }else if(database === 'unichamba-carreras'){
            axios.get(`https://couchdbbackend.esaapp.com/unichamba-carreras/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                setCarreras(response.data.rows);
            })
        }else if(database === 'unichamba-municipios'){
            axios.get(`https://couchdbbackend.esaapp.com/unichamba-municipios/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                setMunicipios(response.data.rows);
            })
        }else if(database === 'unichamba-ofertas'){
            axios.get(`https://couchdbbackend.esaapp.com/unichamba-ofertas/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                setOfertas(response.data.rows);
            })
        }else if( database === 'unichamba-anuncios'){
            axios.get(`https://couchdbbackend.esaapp.com/unichamba-anuncios/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                setAnuncios(response.data.rows);
            })
        }else if( database === 'unichamba-trabajos'){
            axios.get(`https://couchdbbackend.esaapp.com/unichamba-trabajos/_all_docs?include_docs=true`,{auth: {username  : 'unichamba', password : 'S3pt13mbre#2024Work'}})
            .then((response) => {
                setTrabajos(response.data.rows);
            })
        }
    }

    return {
        estudiantes,
        admins,
        carreras,
        municipios,
        ofertas,
        anuncios,
        trabajos,
    };
  
}

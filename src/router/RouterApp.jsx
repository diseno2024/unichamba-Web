import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import CreateStudentAccount from '../pages/CreateStudentAccount'
import DetailsOffer from '../pages/DetailsOffer'
import CreateOffer from '../pages/CreateOffer'
import StudentsPublications from '../pages/StudentsPublications';
import StudentProfile from '../pages/StudentProfile'
import OfferExploreStudent from '../pages/OfferExploreStudent'
import UserAdmin from '../pages/UserAdmin'
import Secure from '../components/Secure'

const RouterApp = () => {
return (
    <>
    
    <Routes>
        <Route path='/' element={<Navigate to='/inicio' />}/>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/createAccountStd' element={<CreateStudentAccount/>} />
        <Route path='/anuncios/:idOferta' element={<DetailsOffer/>} />{/*Esto permite crear una pagina distinta para cada anuncio */}
        <Route path='/createOffer' element={<CreateOffer/>} />
        <Route path='studentsPublications' element={<StudentsPublications/>}/>{/** Perfiles de estudiante, vista empleador */}
        <Route path='/studentProfile/:idPerfil' element={ <Secure> <StudentProfile/> </Secure>}/>
        <Route path='/studentProfile/' element={ <Secure> <StudentProfile/> </Secure>}/>
        <Route path='/OfferExploreStudent' element={<OfferExploreStudent/>}/> {/** Ofertas del empleo */}
        <Route path='/userAdmin' element={ <Secure> <UserAdmin/> </Secure> }/>

    </Routes>
    
    </>
)
}

export default RouterApp

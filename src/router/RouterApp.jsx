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

const RouterApp = () => {
return (
    <>
    
    <Routes>
        <Route path='/' element={<Navigate to='/inicio' />}/>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/createAccountStd' element={<CreateStudentAccount/>} />
        <Route path='/detailsOffer' element={<DetailsOffer/>} />
        <Route path='/createOffer' element={<CreateOffer/>} />
        <Route path='studentsPublications' element={<StudentsPublications/>}/>{/** Perfiles de estudiante, vista empleador */}
        <Route path='/studentProfile' element={<StudentProfile/>}/>
        <Route path='/OfferExploreStudent' element={<OfferExploreStudent/>}/> {/** Ofertas del empleo */}
        <Route path='/userAdmin' element={<UserAdmin/>}/>

    </Routes>
    
    </>
)
}

export default RouterApp

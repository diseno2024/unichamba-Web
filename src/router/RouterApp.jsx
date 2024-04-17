import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import CreateStudentAccount from '../pages/CreateStudentAccount'
import DetailsOffer from '../pages/DetailsOffer'
import CreateOffer from '../pages/CreateOffer'
import OfferExploreStudent from '../pages/OfferExploreStudent'
import StudentProfile from '../pages/StudentProfile'
import StudentsPublications from '../pages/StudentsPublications'

const RouterApp = () => {
return (
    <>
    
    <Routes>
        <Route path='/' element={<Navigate to='/inicio' />}/>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/createAccountStd' element={<CreateStudentAccount/>} />
        <Route path='/detailsOffer' element={<DetailsOffer/>} />
        <Route path='/createOffer' element={<CreateOffer/>} />
        <Route path='/offerExploreStd' element={<OfferExploreStudent/>} />
        <Route path='/studentProfile' element={<StudentProfile/>} />
        <Route path='/studentsPublications' element={<StudentsPublications/>} />
    </Routes>
    
    </>
)
}

export default RouterApp

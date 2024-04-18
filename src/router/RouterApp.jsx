import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Inicio from '../pages/Inicio'
import CreateStudentAccount from '../pages/CreateStudentAccount'
import DetailsOffer from '../pages/DetailsOffer'
import CreateOffer from '../pages/CreateOffer'
import OfferExploreStudent from '../pages/StudentsPublications'
import StudentProfile from '../pages/StudentProfile'
import StudentsPublications from '../pages/StudentsPublications'
import Login from '../auth/pages/Login'

const RouterApp = () => {
return (
    <>
    
    <Routes>
        <Route path='/' element={<Navigate to='/inicio' />}/>
        <Route path='/inicio' element={<Inicio/>} />
        <Route path='/createAccountStd' element={<CreateStudentAccount/>} />
        <Route path='/detailsOffer' element={<DetailsOffer/>} />
        <Route path='/createOffer' element={<CreateOffer/>} />
        <Route path='/studentsPublications' element={<StudentsPublications/>} />
        <Route path='/studentProfile' element={<StudentProfile/>} />
        <Route path='/offerExploreStd' element={<OfferExploreStudent/>} />
        <Route path='/login' element={<Login/>}/>

    </Routes>
    
    </>
)
}

export default RouterApp

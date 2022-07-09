import React from 'react'

import { Routes, Route } from 'react-router-dom'

import UserForm from './Components/UserForm/UserForm'
import Admin from './Components/Admin/Admin'

function AppRoutes() {
    return (
        <Routes>
            <Route 
                path='/' 
                element={<UserForm />} 
            />
            <Route
                path='/Admin' 
                element={<Admin />}
            />
        </Routes>
    )
}

export default AppRoutes
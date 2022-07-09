import './Navbar.css'

import React from 'react'
import { NavLink } from 'react-router-dom'

function Navbar() {
    return (
        <div className='navbar-root'>
            {/* <div className='navLink'>
                <NavLink to='users'>
                    Users
                </NavLink>
            </div> */}
            <div className='linkWrapper'>
                <NavLink className='navLink' to='admin'>
                    Admin
                </NavLink>
            </div>
            <div className='linkWrapper'>
                <NavLink className='navLink' to='/'>
                    Register
                </NavLink>
            </div>
        </div>
    )
}

export default Navbar
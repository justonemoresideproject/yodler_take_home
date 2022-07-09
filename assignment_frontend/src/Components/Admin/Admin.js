import './Admin.css'

import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { baseUrl } from '../../config'
import UserForm from '../UserForm/UserForm'
import SearchForm from '../SearchForm/SearchForm'

function Admin () {
    const getUsers = async () => {
        await axios.get(`${baseUrl}/users`).then(function(res) {
            setUsers(res.data)
            setErrors(null)
        }).catch(function(err) {
            setErrors(err)
        })
    }

    const [users, setUsers] = useState()
    const [errors, setErrors] = useState(null)
    const [newUserPopup, setNewUserPopup] = useState(false)
    const [findUserPopup, setFindUserPopup] = useState(false)

    useEffect(function() {
        getUsers()
    }, [])

    const toggleNewUserPopup = () => {
        setNewUserPopup(bool => !bool)
    }

    const toggleFindUserPopup = () => {
        setFindUserPopup(bool => !bool)
    }

    return (
        <div>
            <h1>
                Admin
            </h1>
            <div>
            <button onClick={toggleNewUserPopup} className='newUserButton'>
                Create New User
            </button>
            <button onClick={toggleFindUserPopup} className='findUserButton'>
                Find User
            </button>
            </div>
            {errors === null ? 
                users !== undefined ? 
                    users.map((user, index) => {
                        return (
                        <UserForm 
                            key={`${user.id}_${index}`}

                            email={user.email} 
                            firstName={user.firstName} 
                            lastName={user.lastName} 
                            method='edit' 
                            id={user.id} />
                        )
                    })   
                :
                <div>
                    No users...
                </div>
            :
            errors
            }
            <div className={`popup-${newUserPopup}`}>
                <button onClick={toggleNewUserPopup} className='exitButton'>Exit</button>
                <UserForm />
            </div>
            <div className={`popup-${findUserPopup}`}>
                <button onClick={toggleFindUserPopup} className='exitButton'>Exit</button>
                <SearchForm />
            </div>
        </div>
    )
}

export default Admin
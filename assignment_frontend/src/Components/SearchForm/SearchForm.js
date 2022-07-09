import './SearchForm.css'

import React, { useEffect, useState } from 'react'
import { useTimeout } from 'react-use'
import axios from 'axios'

import { baseUrl } from '../../config'
import UserForm from '../UserForm/UserForm'

function SearchForm() {
    const INITIAL_STATE = {
        firstName: '',
        lastName: '',
        email: ''
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [users, setUsers] = useState([])
    const [errors, setErrors] = useState('')
    const [loadingClass, setLoadingClass] = useState('hide')
    const [loading, setLoading] = useState('.')

    const handleChange = (e) => {
        setUsers([])
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    useEffect(function() {
        /* Creates empty object and then sends up to 3 api requests depending upon formData object. Finally takes response and uses arr map funciton to set matched users */
        const getUsers = async () => {
            
            const matchedUsers = {}

            if(formData.firstName !== '') {
                await axios.get(`${baseUrl}/users/query/f/${formData.firstName}`).then(function(res) {
                    res.data.forEach(user => {
                        matchedUsers[user.id] = user
                    })
                    console.log(matchedUsers)
                    setErrors(null)
                }).catch(function(err) {
                    setErrors(err)
                })
            }

            if(formData.lastName !== '') {
                await axios.get(`${baseUrl}/users/query/l/${formData.lastName}`).then(function(res) {
                    res.data.forEach(user => {
                        matchedUsers[user.id] = user
                    })
                    setErrors(null)
                }).catch(function(err) {
                    setErrors(err)
                })
            }

            if(formData.email !== '') {
                await axios.get(`${baseUrl}/users/query/e/${formData.email}`).then(function(res) {
                    res.data.forEach(user => {
                        matchedUsers[user.id] = user
                    })
                })
            }

            setUsers(Object.keys(matchedUsers).map(id => {
                return(matchedUsers[id])
            }))
        }

        setLoadingClass('show')

        let loadingInterval = setInterval(() => {
            if(loading.length > 3) {
                setLoading('.')
            } else {
                setLoading(curr => curr += '.')
            }
        }, 1000)

        let timer = setTimeout(() => {
            if(formData.firstName !== '' || formData.lastName !== '' || formData.email !== '') {
                getUsers().then(function() {
                    setLoadingClass('hide')
                })
            }
        }, 3000)

        return () => {
            clearTimeout(timer)
            clearInterval(loadingInterval)
        }
    }, [formData, users])

    return (
        <>
            <form className='searchForm'>
                <label className='label' htmlFor='firstName'>
                    First Name:
                </label>
                <input className='input' name='firstName' id='firstName' value={formData.firstName} onChange={handleChange} />

                <label className='label' htmlFor='lastName'>
                    Last Name:
                </label>
                <input className='input' name='lastName' id='lastName' value={formData.lastName} onChange={handleChange} />

                <label className='label' htmlFor='email'>
                    Email:
                </label>
                <input className='input' name='email' id='email' value={formData.email} onChange={handleChange} />
            </form>

            <div>
                {loadingClass === 'show' ? 
                    users.length <= '0' ? 
                    `No users found..` 
                    :
                    users.map((user, index) => {
                        return (
                            <UserForm id={user.id} firstName={user.firstName} lastName={user.lastName} email={user.email} method='edit' />
                        )
                    })
                :
                    <label className={`loading-${loadingClass}`}>
                        .
                    </label>
            }
            </div>
        </>
    )
}

export default SearchForm
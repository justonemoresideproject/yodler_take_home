import './UserForm.css'

import React, { useState } from 'react'
import axios from 'axios'

import { baseUrl } from '../../config'

function UserForm({email="", firstName="", lastName="", method="post", id = null}) {

    const INITIAL_STATE = {
        "id": id,
        "email": email,
        "firstName": firstName,
        "lastName": lastName
    }

    const [formData, setFormData] = useState(INITIAL_STATE)
    const [postRes, setPostRes] = useState('')
    const [resClassName, setResClassName] = useState('noShow')
    const [buttonClass, setButtonClass] = useState('hide')

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
        
        const emailCheck = formData.email !== '';
        const firstCheck = formData.firstName !== '';
        const lastCheck = formData.lastName !== '';
            
        if(emailCheck && firstCheck && lastCheck) {
            setButtonClass('show')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(buttonClass === 'hide') {
            return
        }

        if(method === 'post') {
        await axios.post(`${baseUrl}/users/`, formData).then(function(res) {
            setPostRes('Success!')
            setResClassName('success')
            setFormData(INITIAL_STATE)
        }).catch(function(err) {
            setPostRes(err)
            setResClassName('rejection')
        })}

        if(method === 'edit') {
            await axios.put(`${baseUrl}/users/${id}`, formData).then(function(res) {
                setPostRes('Success!')
                setResClassName('success')
            }).catch(function(err) {
                setPostRes(err)
                setResClassName('rejection')
            })
        }
    }

    return (
        <>
        <form onSubmit={handleSubmit}>
        { method === 'post' ? 
            <h1>
                Register
            </h1> : 
            <h4>
                User {id}
            </h4>
        }
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

            <button className={buttonClass}>
                {method === 'post' ? 'Submit' : 'Confirm Changes'}
            </button>
        </form>
        <div className={resClassName}>
            {postRes}
        </div>
        </>
    )
}

export default UserForm
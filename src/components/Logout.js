import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Login from './Login'


export default function Logout() {

    const navigate = useNavigate()

    useEffect(() => {
        localStorage.clear()
        const isLogin = localStorage.getItem('login')
        if (!isLogin) {
            navigate('/login')
        }


    }, [])

}

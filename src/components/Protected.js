import React, { useEffect } from 'react'
import {useNavigate} from 'react-router-dom'

export default function Protected(props) {
    const {Component} = props
    const navigate = useNavigate()
    useEffect(() => {
        const isLogin = localStorage.getItem('login')
        if(!isLogin) {
            navigate('/login')
        }
    },[])
    return <Component />
}

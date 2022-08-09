import React, { useEffect, useState } from 'react'
import {Card, Form, Container} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    function userLogin(e) {
        e.preventDefault()
        fetch("http://localhost:3000/login").then((res) => res.json().then((result) => {
            if(result[0].username == username && result[0].password == password) {
                localStorage.setItem('login', true)
                navigate('/list')
            }
        }))
    }

    useEffect(() => {
        const isLogin = localStorage.getItem('login')
        if(isLogin) {
            navigate('/list')
        } 
    },[])


    return (
        <Container className='mt-5'>
            <Card>
            <Card.Header>
                Sign In
            </Card.Header>
            <Card.Body>
                <Form onSubmit={(e) => userLogin(e)}>
                    <div className="mb-3">
                        <label>Email address</label>
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Enter email"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Enter password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </div>
                </Form>
            </Card.Body>
            </Card>
        </Container>
    )
}

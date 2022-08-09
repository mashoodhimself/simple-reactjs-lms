import React, { useEffect, useState } from 'react'
import { Card, Container, Form, Button, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

export default function Create() {

    const [book, setBook] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [rating, setRatings] = useState("")

    const [isAdded, setIsAdded] = useState(false)

    function addBook(e) {
        e.preventDefault()
        const data = { book, author, price, rating }
        fetch("http://localhost:3000/books", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then((res) => res.json()
                .then((result) => {
                    if(result)
                        setIsAdded(true)
                }))
    }

    return (
        <Container className='mt-5'>

            {isAdded ? <Alert variant='success'>
                Book added successfully.
            </Alert> : ''}

            <Card>
                <Card.Header>
                    Add Book
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={(e) => addBook(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Book</Form.Label>
                            <Form.Control type="text" placeholder='Book Name' onChange={(e) => setBook(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" placeholder='Book Author' onChange={(e) => setAuthor(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder='Book Price' onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Ratings</Form.Label>
                            <Form.Control type="number" placeholder='Book Ratings' onChange={(e) => setRatings(e.target.value)} />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Add
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

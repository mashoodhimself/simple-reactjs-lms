import React, { useEffect, useState } from 'react'
import { Card, Container, Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

export default function Update() {

    const [name, setName] = useState("")
    const [author, setAuthor] = useState("")
    const [price, setPrice] = useState("")
    const [ratings, setRatings] = useState("")

    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:3000/books/${params.id}`)
            .then((res) => res.json()
                .then((result) => {
                    setName(result.book)
                    setAuthor(result.author)
                    setPrice(result.price)
                    setRatings(result.rating)
                }))
    },[])

    function updateBook(e) {
        e.preventDefault()
        const bookData = { book: name, author, price, rating: ratings }
        fetch(`http://localhost:3000/books/${params.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookData)
        })
            .then((res) => res.json()
                .then((result) => {
                    if (result) {
                        window.alert('Book updated successfully')
                        navigate('/list')
                    }
                }))
    }


    return (
        <Container className='mt-5'>
            <Card>
                <Card.Header>
                    Update Book
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={(e) => updateBook(e)}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Book</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Author</Form.Label>
                            <Form.Control type="text" value={author} onChange={(e) => setAuthor(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Ratings</Form.Label>
                            <Form.Control type="number" value={ratings} onChange={(e) => setRatings(e.target.value)} />
                        </Form.Group>


                        <Button variant="primary" type="submit">
                            Update
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

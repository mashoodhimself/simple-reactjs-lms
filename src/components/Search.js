import React, { useEffect, useState } from 'react'
import { Card, Container, Form, Button, Alert, Table } from 'react-bootstrap'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Search() {

    const [keywords, setKeywords] = useState([])
    const [lastKey, setLastKey] = useState("")
    const [isDel, setIsDel] = useState(false)

    function searchBook(key) {
        setLastKey(key)
        window.setTimeout(() => {
            fetch(`http://localhost:3000/books?q=${key}`).then((res) => res.json().then((result) => {
                setKeywords(result)
            }))
        }, 2000)
    }

    const get_book_keys = () => {
        const key = lastKey
        fetch(`http://localhost:3000/books?q=${key}`).then((res) => res.json().then((result) => {
            setKeywords(result)
        }))
    }


    function deleteBook(id) {
        if (window.confirm('Are you sure want to delete this recored ?')) {
            fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' })
                .then((response) => response.json()
                    .then((result) => {
                        get_book_keys()
                        setIsDel(true)
                    }))
        }
    }

    return (
        <Container className='mt-5'>
            {isDel ? <Alert variant='success' >
                Book deleted successfully.
            </Alert> : ''}
            <Card>
                <Card.Body>
                    <h1 className='text-center' >Search Book</h1>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control type="text" placeholder='Search for a book .. ' onChange={(e) => searchBook(e.target.value)} />
                        </Form.Group>
                    </Form>
                    {keywords.length ?
                        <Table striped bordered hover className='text-center'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Book</th>
                                    <th>Author</th>
                                    <th>Price</th>
                                    <th>Rating</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {keywords.map((item, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{item.book}</td>
                                        <td>{item.author}</td>
                                        <td>{item.price}</td>
                                        <td>{item.rating}</td>
                                        <td>
                                            <Link to={`/update/${item.id}`}> <FontAwesomeIcon icon={faEdit} /></Link>&nbsp;
                                            <span onClick={() => deleteBook(item.id)}><FontAwesomeIcon icon={faTrash} color="red" /></span>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table> : ''}
                </Card.Body>
            </Card>
        </Container>
    )
}

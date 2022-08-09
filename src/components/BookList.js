import React, { useEffect, useState } from 'react'
import { Table, Container, Card, Button, Alert } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function BookList() {

    const [books, setBooks] = useState([])
    const [isDel, setIsDel] = useState(false)

    const get_all_books = () => {
        fetch("http://localhost:3000/books").then((response) => response.json().then((result) => {
            setBooks(result)
        }))
    };

    useEffect(() => {
        get_all_books()
    }, [])

    function deleteBook(id) {
        if (window.confirm('Are you sure want to delete this recored ?')) {
            fetch(`http://localhost:3000/books/${id}`, { method: 'DELETE' })
                .then((response) => response.json()
                    .then((result) => {
                        get_all_books()
                        setIsDel(true)
                    }))
        }
    }


    return (
        <Container className='mt-5'>

            {isDel ? <Alert variant='success'>
                Book deleted successfully.
            </Alert> : ''}

            <Card>
                <Card.Header>
                    Books List
                </Card.Header>
                <Card.Body>
                    <Table striped bordered hover className='text-center'>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Book</th>
                                <th>Author</th>
                                <th>Price</th>
                                <th>Ratings</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((item, i) => (
                                <tr key={i} >
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
                    </Table>
                </Card.Body>
            </Card>
        </Container>


    )
}

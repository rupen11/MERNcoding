import React from 'react'
import '../styles/notes.css'
import { Card } from 'react-bootstrap'
import { FaEdit, FaTrashAlt, FaCopy } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'

const Notes = () => {
    const history = useHistory();
    const token = localStorage.getItem("Token");
    if (!token) {
        history.push("/Login");
    }
    return (
        <>
            <div className='rowcard'>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>
                <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }}>
                    <Card.Body>
                        <Card.Title>Card Title</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                        <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                        </Card.Text>
                        <Card.Link><FaEdit /></Card.Link>
                        <Card.Link><FaTrashAlt /></Card.Link>
                        <Card.Link><FaCopy /></Card.Link>
                    </Card.Body>
                </Card>

            </div>
        </>
    )
}

export default Notes
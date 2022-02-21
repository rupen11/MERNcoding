import React, { useState, useEffect, useRef } from 'react'
import '../styles/notes.css'
import { Button, Card, Modal } from 'react-bootstrap'
import { FaEdit, FaTrashAlt, FaCopy } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import Swal from 'sweetalert2'
import { FaPlus } from 'react-icons/fa'

const Notes = () => {
    const history = useHistory();
    const token = localStorage.getItem("Token");
    if (!token) {
        history.push("/Login");
    }

    // Model
    const [show, setShow] = useState(false);
    const [modelState, setModelState] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = (val) => {
        setModelState(val);
        setShow(true);
    }

    const [newNote, setNewNote] = useState({ title: "", subtitle: "", description: "" });
    const [note, setNote] = useState([]);
    const [updateModelValue, setUpdateModelValue] = useState({ id: "", title: "", subtitle: "", description: "" });

    // Get Note
    const getNotes = async () => {
        try {
            const res = await fetch("http://localhost:5000/getnote", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "AuthToken": token
                }
            })
            const json = await res.json();
            if (res.status === 200) {
                setNote(json);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // Add Note
    const handleNote = (e) => {
        setNewNote({ ...newNote, [e.target.name]: e.target.value });
    }

    const handleNoteSubmit = async (e) => {
        try {
            e.preventDefault();
            const res = await fetch("http://localhost:5000/addnote", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "AuthToken": token
                },
                body: JSON.stringify(newNote)
            })
            if (res.status === 200) {
                console.log("Note Added");
                setNewNote({ title: "", subtitle: "", description: "" });
            }
            else {
                console.log("Note Note Added");
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    // Update Note
    const openUpdateModel = (id, title, subtitle, description) => {
        setUpdateModelValue({ id, title, subtitle, description });
        handleShow("update");
    }

    const handleUpdate = (e) => {
        setUpdateModelValue({ ...updateModelValue, [e.target.name]: e.target.value });
    }

    const handleUpdateSubmit = async () => {
        try {
            const res = await fetch("http://localhost:5000/updatenote/" + updateModelValue.id, {
                method: "PUT",
                headers: {
                    "Content-Type": 'application/json',
                    "AuthToken": token
                },
                body: JSON.stringify(updateModelValue)
            });
            const json = await res.json();
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Yeyy',
                    text: json
                })
                getNotes();
            }
            else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops',
                    text: json
                })
            }
        }
        catch (error) {
            console.log(error);
        }
        handleClose();
    }

    // Delete Note
    const deleteFire = async (id) => {
        try {
            const res = await fetch("http://localhost:5000/deletenote/" + id, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    "AuthToken": token
                }
            });
            const json = await res.json();
            if (res.status === 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Yeyy',
                    text: json
                })
                getNotes();
            }
            else {
                Swal.fire({
                    icon: 'success',
                    title: 'Yeyy',
                    text: json
                })
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getNotes();
        console.log("ok this is run");
    }, [newNote, show])

    return (
        <>

            <div>
                <button type="button" onClick={() => { handleShow("add") }} ><FaPlus className='icon' />Add Note</button>
            </div>

            <div className='rowcard'>
                {
                    note.length !== 0 ?
                        note.map((note) => {
                            return <Card className='my-5 mx-4 text-light' bg='dark' style={{ width: '20rem', height: '12.5rem' }} key={note._id}>
                                <Card.Body>
                                    <Card.Title>{note.title}</Card.Title>
                                    <Card.Subtitle className="mb-2 text-muted">{note.subtitle}</Card.Subtitle>
                                    <Card.Text>
                                        {note.description}
                                    </Card.Text>
                                    <Card.Link onClick={() => { openUpdateModel(note._id, note.title, note.subtitle, note.description) }}><FaEdit /></Card.Link>
                                    <Card.Link onClick={() => { deleteFire(note._id) }}><FaTrashAlt /></Card.Link>
                                    <Card.Link><FaCopy /></Card.Link>
                                </Card.Body>
                            </Card>
                        }) :
                        <p>No Notes Added</p>
                }
            </div>

            {/* Model */}
            <Button variant="primary" onClick={() => { handleShow("update") }} style={{ display: 'none' }}>
                Launch demo modal
            </Button>

            {modelState === "add" ? <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Note</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <input type="text" name="title" value={newNote.title} onChange={handleNote} />
                        <br />
                        <br />
                        <input type="text" name="subtitle" value={newNote.subtitle} onChange={handleNote} />
                        <br />
                        <br />
                        <input type="text" name="description" value={newNote.description} onChange={handleNote} />
                        <br />
                        <br />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleNoteSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal> : <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Note</Modal.Title>
                </Modal.Header>
                <Modal.Body> <form >
                    <input type="text" name="title" value={updateModelValue.title} onChange={handleUpdate} />
                    <br />
                    <br />
                    <input type="text" name="subtitle" value={updateModelValue.subtitle} onChange={handleUpdate} />
                    <br />
                    <br />
                    <input type="text" name="description" value={updateModelValue.description} onChange={handleUpdate} />
                </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" type="submit" onClick={handleUpdateSubmit}>
                        Update
                    </Button>
                </Modal.Footer>
            </Modal>}


        </>
    )
}

export default Notes
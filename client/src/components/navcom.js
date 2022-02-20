import React from 'react'
import { Container, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { FaPen, FaSignInAlt, FaUserPlus } from 'react-icons/fa'
import { Link, useHistory } from 'react-router-dom'
import '../styles/nav.css'

const NavCom = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.removeItem("Token");
    history.push("/Login");
  }

  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container>
        <Navbar.Brand className='Logo'><FaPen className='icon' /><Link to="/">NoTeS</Link></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/Notes">Notes</Nav.Link>
            <Nav.Link as={Link} to="/PlayWithNotes">PlayWithNotes</Nav.Link>
            <Nav.Link as={Link} to="/History">History</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/Login" >Login<FaSignInAlt className='mx-2' /> </Nav.Link>
            <Nav.Link as={Link} to="/Signup" >Signup<FaUserPlus className='mx-2' /> </Nav.Link>
            <button onClick={logout}>Logout</button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavCom;
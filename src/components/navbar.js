import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import Image from 'react-bootstrap/Image';

import { useAuth } from "../contexts/authContext";

function Navigation() {

  const { user, setUser, isLogged, setLogged } = useAuth();

  const logout = () => {
    setLogged(false);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <Navbar expand="lg" className="navbar-light bg-body-tertiary">
      <Container>
      <Navbar.Brand href="/">
        <img src={`${process.env.PUBLIC_URL}/logo.png`} width="40px" height="40px" className="d-inline-block align-center"/>
        {' '} J.K. Owling
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/authentication">Authentication</Nav.Link>
        </Nav>
        { isLogged && (
          <Nav className="d-flex align-items-center">
            <Dropdown autoClose="outside" align={{ lg: 'end' }}>
              <Dropdown.Toggle variant="info" className="bg-transparent border-black color-black">
                <Image src={user?.picture} width="30px" className="rounded-circle img-responsive"></Image>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={logout}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
}

export default Navigation;
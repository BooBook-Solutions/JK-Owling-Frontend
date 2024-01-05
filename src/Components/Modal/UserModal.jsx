import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import { useAuthContext } from "../Context/AuthContext";

function UserModal({ userInfo }) {

    const { authState } = useAuthContext();

    const user = userInfo || authState.user;

    const [show, setShow] = useState(false);

    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [surname, setSurname] = useState(user.surname);

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handleNameChange = (e) => setName(e.target.value);
    const handleSurnameChange = (e) => setSurname(e.target.value);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setEmail(user.email);
        setName(user.name);
        setSurname(user.surname);
        setShow(true);
    }

    const handleSaveChanges = () => {
        if (![email, name, surname].every(Boolean)) {
            alert("Please fill in all fields");
        } else {
            alert("Update");
        }
    };

    return (
        <>
        <Button variant="primary" onClick={handleShow}>Update</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change User Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="email" defaultValue={user.email} onChange={handleEmailChange} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="name" defaultValue={user.name} onChange={handleNameChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Surname</Form.Label>
                    <Form.Control type="text" placeholder="surname" defaultValue={user.surname} onChange={handleSurnameChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Role</Form.Label>
                    <Form.Control type="text" defaultValue={user.role} disabled readonly/>
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Save Changes</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
    }

export default UserModal;
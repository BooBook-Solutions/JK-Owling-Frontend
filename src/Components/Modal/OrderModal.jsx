import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function OrderModal() {

    const [show, setShow] = useState(false);

    const [user, setUser] = useState("");
    const [book, setBook] = useState("");
    const [quantity, setQuantity] = useState("");

    const handleUserChange = (e) => setUser(e.target.value);
    const handleBookChange = (e) => setBook(e.target.value);
    const handleQuantityChange = (e) => setQuantity(e.target.value);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setUser("");
        setBook("");
        setQuantity("");
        setShow(true);
    }

    const { handleFetch: createOrder, data: createdOrder, error: orderCreateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "ORDERS"
        }), 
        method: "POST",
        body: { user_id: user, book_id: book, quantity: quantity }
    })

    const handleSaveChanges = () => {
        if (![user, book, quantity].every(Boolean)) {
            alert("Please fill in all fields");
        } else { createOrder() }
    };

    useEffect(() => {
        if(createdOrder){
            alert(JSON.stringify(createdOrder));
            window.location.reload();
        }
    
        if(orderCreateError){
            alert("Something went wrong! Check console logs...");
            console.error(orderCreateError);
        }
    }, [createdOrder, orderCreateError]);

    return (
        <>
        <Button variant="success" style={{padding: "1px", display: "flex", marginLeft: "10px"}} onClick={handleShow}>
            <box-icon type="solid" color="white" name="plus-square"></box-icon>
        </Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create New Order</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>User</Form.Label>
                    <Form.Control type="text" placeholder="user id" defaultValue={user} onChange={handleUserChange} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Book</Form.Label>
                    <Form.Control type="text" placeholder="book id" defaultValue={book} onChange={handleBookChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" placeholder="quantity" defaultValue={quantity} onChange={handleQuantityChange} />
                </Form.Group>
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>Create Order</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
    }

export default OrderModal;
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function OrderModal({ order, type, statuses }) {

    const [show, setShow] = useState(false);

    const [user, setUser] = useState(order ? order.user : "");
    const [book, setBook] = useState(order ? order.book : "");
    const [status, setStatus] = useState(order ? order.status : "pending");
    const [quantity, setQuantity] = useState(order ? order.quantity : "");

    const handleUserChange = (e) => setUser(e.target.value);
    const handleBookChange = (e) => setBook(e.target.value);
    const handleQuantityChange = (e) => {
        e.target.value = parseInt(e.target.value, 10);
        setQuantity(e.target.value);
    }
    const handleStatusChange = (e) => setStatus(e.target.value);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setUser(order ? order.user : "");
        setBook(order ? order.book : "");
        setQuantity(order ? order.quantity : "");
        setStatus(order ? order.status : "pending");
        setShow(true);
    }

    const { handleFetch: updateOrder, data: updatedOrder, error: orderUpdateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "ORDER_DETAILS", 
          pathParams: { order_id: order?.id }
        }), 
        method: "PUT",
        body: { order_id: order?.id, quantity: parseInt(quantity, 10), status: status }
    })

    const { handleFetch: createOrder, data: createdOrder, error: orderCreateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "ORDERS"
        }), 
        method: "POST",
        body: { user_id: user, book_id: book, quantity: parseInt(quantity, 10) }
    })

    const handleSaveChanges = () => {

        const parsedQuantity = parseInt(quantity, 10);
        
        if (![user, book, quantity, parsedQuantity, status].every(Boolean) || parsedQuantity <= 0) {
            alert("Something is missing or wrong!");
        } else { 
            if(order) {
                if(parsedQuantity !== order.quantity || status !== order.status) updateOrder();
                else alert("No changes to save!");
            }
            else createOrder(); 
        }
    };

    useEffect(() => {
        if(updatedOrder || createdOrder){
            alert(JSON.stringify(updatedOrder || createdOrder));
            window.location.reload();
        }
    
        if(orderUpdateError || orderCreateError){
            alert("Something went wrong! Check console logs...");
            console.error(orderUpdateError || orderCreateError);
        }
    }, [updatedOrder, createdOrder, orderUpdateError, orderCreateError]);

    return (
        <>
        { order ? 
            <Button variant="primary" onClick={handleShow}>Update</Button> :
            (
            <Button variant="success" style={{padding: "1px", display: "flex", marginLeft: "10px"}} onClick={handleShow}>
                <box-icon type="solid" color="white" name="plus-square"></box-icon>
            </Button>
            )
        }

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ order ? "Change Order Info" : "Create New Order" }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>User ID</Form.Label>
                    <Form.Control type="text" placeholder="user id" defaultValue={user ? user.id + " - " + user.email : ""} disabled={type === "dashboard"} onChange={handleUserChange} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Book ID</Form.Label>
                    <Form.Control type="text" placeholder="book id" defaultValue={book ? book.id + " - " + book.title : ""} disabled={type === "dashboard"} onChange={handleBookChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" min={0} step={1} placeholder="quantity" defaultValue={quantity} onChange={handleQuantityChange} />
                </Form.Group>
                { order && 
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" defaultValue={status} onChange={handleStatusChange}>
                            { statuses?.map((status) => (<option value={status.name}>{status.name_translated}</option>)) }
                        </Form.Control>
                    </Form.Group>
                }
            </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" style={{marginRight: "5px"}} onClick={handleClose}>Close</Button>
                <Button variant="primary" onClick={handleSaveChanges}>{ order ? "Save Changes" : "Create Order"}</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
    }

export default OrderModal;
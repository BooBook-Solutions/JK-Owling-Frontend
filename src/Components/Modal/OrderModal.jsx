import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import useCustomEffect from '../../Hooks/useCustomEffect';

function OrderModal({ order, type, statuses, onCreate, onUpdate }) {

    const [currentOrder, setCurrentOrder] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setFormFields();
    
    const setFormFields = () => {
        setCurrentOrder({
            user: order?.user,
            book: order?.book,
            quantity: order?.quantity,
            status: order?.status
        })
        setShow(true);
    }

    const { handleFetch: updateOrder, error: updateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "ORDER_DETAILS", 
          pathParams: { order_id: order?.id }
        }), 
        method: "PUT",
        body: { order_id: order?.id }
    })

    const { handleFetch: createOrder, error: createError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "ORDERS"
        }), 
        method: "POST"
    })

    const handleSaveChanges = () => {

        const { user, book, quantity, status } = currentOrder;

        if(order) {
            // Can add quantity controls
            if(![status].every(Boolean)) {
                alert("Status must be selected!")
                return;
            }

            updateOrder({ status })
            .then((updatedOrder) => {
                if(updatedOrder) {
                    console.log("Order [" + updatedOrder.id + "] correctly updated!")
                    alert("Order [" + updatedOrder.id + "] correctly updated!");
                    onUpdate(updatedOrder);
                    handleClose();
                }
            })
            
        } else {
            if(![user.id, book.id, quantity].every(Boolean) || quantity <= 0) {
                alert("Please fill all the fields correctly! Quantity must be a positive number.");
                return;
            }
            
            createOrder({ user_id: user.id, book_id: book.id, quantity })
            .then((createdOrder) => {
                if(createdOrder) {
                    console.log("Order [" + createdOrder.id + "] correctly created!")
                    alert("Order [" + createdOrder.id + "] correctly created!");
                    onCreate(createdOrder);
                    handleClose();
                }
            });
        }
    };

    const handleUpdateError = () => {
		if(updateError){
			const errorMessage = updateError ? updateError : "check console for more details.";
            alert("Error while updating order [" + order.id + "]: " + errorMessage);
		}
	}

    const handleCreateError = () => {
		if(createError){
			const errorMessage = createError ? createError : "check console for more details.";
            alert("Error while creating order: " + errorMessage);
		}
	}

    useCustomEffect({functions: [handleUpdateError], dependencies: [updateError]}); // on update error, show error
    useCustomEffect({functions: [handleCreateError], dependencies: [createError]}); // on create error, show error

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
                    <Form.Label>User ID { currentOrder?.user?.email && " - " + currentOrder?.user?.email }</Form.Label>
                    <Form.Control type="text" placeholder="user id" defaultValue={currentOrder?.user?.id} disabled={type === "update"} onChange={(e) => setCurrentOrder({ ...currentOrder, user: { ...currentOrder.user, id: e.target.value }})} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Book ID { currentOrder?.book?.title && " - " + currentOrder?.book?.title }</Form.Label>
                    <Form.Control type="text" placeholder="book id" defaultValue={currentOrder?.book?.id} disabled={type === "update"} onChange={(e) => setCurrentOrder({ ...currentOrder, book: { ...currentOrder.book, id: e.target.value }})} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="number" min={0} step={1} placeholder="quantity" disabled={type === "update"} defaultValue={currentOrder?.quantity} onChange={(e) => setCurrentOrder({ ...currentOrder, quantity: parseInt(Number(e.target?.value), 10) })} />
                </Form.Group>
                { order && 
                    <Form.Group className="mb-3">
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" defaultValue={currentOrder?.status} onChange={(e) => setCurrentOrder({ ...currentOrder, status: e.target.value })}>
                            { statuses?.map((status) => (<option key={status.name} value={status.name}>{status.name_translated}</option>)) }
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
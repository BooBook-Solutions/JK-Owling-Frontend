import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function BookModal({ book }) {

    const [show, setShow] = useState(false);

    const [title, setTitle] = useState(book.title);
    const [author, setAuthor] = useState(book.author);
    const [description, setDescription] = useState(book.description);
    const [cover, setCover] = useState(book.cover);
    const [price, setPrice] = useState(book.price);
    const [quantity, setQuantity] = useState(book.quantity);

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleAuthorChange = (e) => setAuthor(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCoverChange = (e) => setCover(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleQuantityChange = (e) => setQuantity(e.target.value);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setCover(book.cover);
        setPrice(book.price);
        setQuantity(book.quantity);
        setShow(true);
    }

    const handleSaveChanges = () => {
        if (!title || !author || !description || !cover || !price || !quantity)
            alert("Please fill in all fields");
        else if (title === book.title && 
                author === book.author && 
                description === book.description && 
                cover === book.cover && 
                price === book.price &&
                quantity === book.quantity
        )
            alert("No changes detectd")
        else
            alert("User updated: " + title + ", " + author + ", " + price);
    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>Update</Button>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Change Book Info</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" placeholder="title" defaultValue={book.title} onChange={handleTitleChange} autoFocus/>
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="author" defaultValue={book.author} onChange={handleAuthorChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" placeholder="description" defaultValue={book.description} onChange={handleDescriptionChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cover</Form.Label>
                    <Form.Control type="text" placeholder="cover link" defaultValue={book.cover} onChange={handleCoverChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="text" placeholder="price" defaultValue={book.price} onChange={handlePriceChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Quantity</Form.Label>
                    <Form.Control type="text" placeholder="quantity" defaultValue={book.quantity} onChange={handleQuantityChange} />
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

export default BookModal;
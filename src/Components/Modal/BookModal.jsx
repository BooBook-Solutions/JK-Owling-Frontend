import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

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

    const { handleFetch: updateBook, data: updatedBook, error: bookUpdateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "BOOK_DETAILS", 
          pathParams: { bookId: book.id }
        }), 
        method: "PUT",
        body: { title: title, author: author, description: description, cover: cover, price: price, quantity: quantity }
    })

    const handleSaveChanges = () => {
        if (![title, author, description, cover, price, quantity].every(Boolean)) {
            alert("Please fill in all fields");
        } else { updateBook(); }
    };

    useEffect(() => {
        if(updatedBook){
            alert(JSON.stringify(updatedBook));
            window.location.reload();
        }
    
        if(bookUpdateError){
            alert("Something went wrong! Check console logs...");
            console.error(bookUpdateError);
        }
    }, [updateBook, bookUpdateError]);

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
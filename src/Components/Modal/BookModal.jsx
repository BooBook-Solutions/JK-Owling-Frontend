import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function BookModal({ book }) {

    const [show, setShow] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    // Function to handle next and previous page
    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handlePrevPage = () => setCurrentPage(currentPage - 1);

    const [title, setTitle] = useState(book ? book.title : "");
    const [author, setAuthor] = useState(book ? book.author : "");
    const [description, setDescription] = useState(book ? book.description : "");
    const [cover, setCover] = useState(book ? book.cover : "");
    const [price, setPrice] = useState(book ? book.price : "");
    const [quantity, setQuantity] = useState(book ? book.quantity : "");

    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleAuthorChange = (e) => setAuthor(e.target.value);
    const handleDescriptionChange = (e) => setDescription(e.target.value);
    const handleCoverChange = (e) => setCover(e.target.value);
    const handlePriceChange = (e) => setPrice(e.target.value);
    const handleQuantityChange = (e) => {
        e.target.value = parseInt(e.target.value, 10);
        setQuantity(e.target.value);
    }

    const handleClose = () => setShow(false);
    const handleShow = () => {
        setTitle(book ? book.title : "");
        setAuthor(book ? book.author : "");
        setDescription(book ? book.description : "");
        setCover(book ? book.cover : "");
        setPrice(book ? book.price : "");
        setQuantity(book ? book.quantity : "");
        setShow(true);
    }

    const { handleFetch: updateBook, data: updatedBook, error: bookUpdateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "BOOK_DETAILS", 
          pathParams: { book_id: book?.id }
        }), 
        method: "PUT",
        body: { book_id: book?.id, title: title, author: author, description: description, cover: cover, price: parseFloat(price), quantity: parseInt(quantity, 10) }
    })

    const { handleFetch: createBook, data: createdBook, error: bookCreateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "BOOKS"
        }), 
        method: "POST",
        body: { title: title, author: author, description: description, cover: cover, price: parseFloat(price), quantity: parseInt(quantity, 10) }
    })

    const handleSaveChanges = () => {
        const parsedQuantity = parseInt(quantity, 10);
        const parsedPrice = parseFloat(price);
        if (![title, author, description, cover, parsedQuantity, parsedPrice].every(Boolean) || parsedQuantity < 0 || parsedPrice <= 0) {
            alert("Something is missing or wrong!");
        } else { 
            if(book) updateBook();
            else createBook(); 
        }
    };

    useEffect(() => {
        if(updatedBook || createdBook){
            alert(JSON.stringify(updatedBook || createdBook));
            window.location.reload();
        }
    
        if(bookUpdateError || bookCreateError){
            alert("Something went wrong! Check console logs...");
            console.error(bookUpdateError || bookCreateError);
        }
    }, [updatedBook, createdBook, bookUpdateError, bookCreateError]);

    return (
        <>
        { book ? 
            <Button variant="primary" onClick={handleShow}>Update</Button> : 
            (
            <Button variant="success" style={{padding: "1px", display: "flex", marginLeft: "10px"}} onClick={handleShow}>
                <box-icon type="solid" color="white" name="plus-square"></box-icon>
            </Button>
            )
        }

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ book ? "Change Book Info" : "Create New Book" }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                { currentPage === 1 &&
                    <>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="title" defaultValue={title} onChange={handleTitleChange} autoFocus/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="author" defaultValue={author} onChange={handleAuthorChange} />
                    </Form.Group>
                    </>
                }
                { currentPage === 2 &&
                    <>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="description" defaultValue={description} onChange={handleDescriptionChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cover</Form.Label>
                        <Form.Control type="text" placeholder="cover link" defaultValue={cover} onChange={handleCoverChange} />
                    </Form.Group>
                    </>
                }
                { currentPage === 3 &&
                    <>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" min={0} step={0.01} placeholder="price" defaultValue={price} onChange={handlePriceChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" min={0} step={1} placeholder="quantity" defaultValue={quantity} onChange={handleQuantityChange} />
                    </Form.Group>
                    </>
                }
            </Form>
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <div>
                    {currentPage > 1 && <Button variant="dark" style={{marginRight: "5px"}} onClick={handlePrevPage}>Previous</Button>}
                    {currentPage < totalPages && <Button variant="dark" onClick={handleNextPage}>Next</Button>}
                </div>
                <div>
                    <Button variant="secondary" style={{marginRight: "5px"}} onClick={handleClose}>Close</Button>
                    { currentPage === totalPages && <Button variant="primary" onClick={handleSaveChanges}>{ book ? "Save Changes" : "Create Book" }</Button> }
                </div>
            </Modal.Footer>
        </Modal>
        </>
    );
    }

export default BookModal;
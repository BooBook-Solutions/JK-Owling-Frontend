import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import LoadingSpinner from '../Common/Spinner';

function BookModal({ book, onCreate, onUpdate }) {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 3;

    // Function to handle next and previous page
    const handleNextPage = () => setCurrentPage(currentPage + 1);
    const handlePrevPage = () => setCurrentPage(currentPage - 1);

    const [currentBook, setCurrentBook] = useState(null);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setFormFields();

    const setFormFields = () => {
        setCurrentBook({
            title: book?.title,
            author: book?.author,
            description: book?.description,
            cover: book?.cover,
            price: book?.price.toFixed(2),
            quantity: book?.quantity
        })
        setCurrentPage(1);
        setShow(true);
    }

    const [isUpdating, setIsUpdating] = useState(false);
    const [isCreating, setIsCreating] = useState(false);

    const { handleFetch: updateBook, error: updateError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "BOOK_DETAILS", 
          pathParams: { book_id: book?.id }
        }), 
        method: "PUT",
        body: { book_id: book?.id }
    })

    const { handleFetch: createBook, error: createError } = useAPIFetch({
        url: getUrl({ 
          endpoint: "BOOKS"
        }), 
        method: "POST"
    })

    const handleSaveChanges = () => {

        const { title, author, description, cover, quantity, price } = currentBook;

        if(![title, author, description, cover, quantity, price].every(Boolean) || quantity <= 0 || price <= 0) {
            alert("Please fill all the fields correctly! Quantity and price must be positive numbers.");
            return;
        }

        if(book) {
            handleClose();
            setIsUpdating(true);
            updateBook({ title, author, description, cover, quantity, price })
            .then((updatedBook) => {
                if(updatedBook) {
                    console.log("Book [" + updatedBook.id + "] correctly updated!")
                    alert("Book [" + updatedBook.id + "] correctly updated!");
                    onUpdate(updatedBook);
                }
            })
            .then(() => setIsUpdating(false));

        } else {
            handleClose();
            setIsCreating(true);
            createBook({ title, author, description, cover, quantity, price })
            .then((createdBook) => {
                if(createdBook) {
                    console.log("Book [" + createdBook.title + "] correctly created!")
                    alert("Book [" + createdBook.title + "] correctly created!");
                    onCreate(createdBook);
                }
            })
            .then(() => setIsCreating(false));
        }
    };

    const handleUpdateError = () => {
		if(updateError){
			const errorMessage = updateError ? updateError : "check console for more details.";
            alert("Error while updating book [" + book.id + "]: " + errorMessage);
		}
	}

    const handleCreateError = () => {
		if(createError){
			const errorMessage = createError ? createError : "check console for more details.";
            alert("Error while creating book: " + errorMessage);
		}
	}

    useEffect(() => { handleUpdateError() }, [updateError]); // on update error, show error
    useEffect(() => { handleCreateError() }, [createError]); // on create error, show error

    return (
        <>
        { (isUpdating || isCreating) && <LoadingSpinner position="fixed" /> }

        { book ? 
            <Button variant="primary" onClick={handleShow}>Update</Button> : 
            (
            <Button variant="success" style={{padding: "1px", display: "flex", marginLeft: "10px"}} onClick={handleShow}>
                <box-icon type="solid" color="white" name="plus-square"></box-icon>
            </Button>
            )
        }

        <Modal className="modal" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{ book ? "Change Book Info" : "Create New Book" }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>
                { currentPage === 1 &&
                    <>
                    <Form.Group className="mb-3">
                        <Form.Label>Title</Form.Label>
                        <Form.Control type="text" placeholder="title" defaultValue={currentBook?.title} onChange={(e) => setCurrentBook({ ...currentBook, title: e.target.value })} autoFocus/>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Author</Form.Label>
                        <Form.Control type="text" placeholder="author" defaultValue={currentBook?.author} onChange={(e) => setCurrentBook({ ...currentBook, author: e.target.value })} />
                    </Form.Group>
                    </>
                }
                { currentPage === 2 &&
                    <>
                    <Form.Group className="mb-3">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" placeholder="description" defaultValue={currentBook?.description} onChange={(e) => setCurrentBook({ ...currentBook, description: e.target.value })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Cover</Form.Label>
                        <Form.Control as="textarea" placeholder="cover link" defaultValue={currentBook?.cover} onChange={(e) => setCurrentBook({ ...currentBook, cover: e.target.value })} />
                    </Form.Group>
                    </>
                }
                { currentPage === 3 &&
                    <>
                    <Form.Group className="mb-3">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" min={0} step={0.01} placeholder="price" defaultValue={currentBook?.price} onChange={(e) => setCurrentBook({ ...currentBook, price: parseFloat(Number(e.target?.value)) })} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Quantity</Form.Label>
                        <Form.Control type="number" min={0} step={1} placeholder="quantity" defaultValue={currentBook?.quantity} onChange={(e) => setCurrentBook({ ...currentBook, quantity: parseInt(Number(e.target?.value), 10) })} />
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
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

import BookModal from '../Modal/BookModal';

import useAPIFetch from '../../Hooks/useAPIFetch';

import getUrl from '../../Endpoints/endpoints';
import LoadingSpinner from '../Common/Spinner';

function BookCard({ book, type, onUpdate, onDelete }) {

    const cardStyle = {
        height: "100%",
        width: type !== "dashboard" ? 'auto' : '18rem',
        maxWidth: '40rem',
        minWidth: '18rem'
    };

    const [isDeleting, setIsDeleting] = useState(false);

    const { handleFetch: deleteBook, error: deleteError } = useAPIFetch({
        url: getUrl({ 
            endpoint: "BOOK_DETAILS", 
            pathParams: { book_id: book.id }
        }), 
        method: "DELETE"
    })

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this book?")) {
            setIsDeleting(true);
            deleteBook()
            .then((deletedBook) => {
                if(deletedBook) {
                    console.log("Book [" + deletedBook.title + "] correctly deleted!")
                    alert("Book [" + deletedBook.title + "] correctly deleted!");
                    onDelete(deletedBook.id);
                }
            })
            .then(() => setIsDeleting(false));
        }
    }

    const handleDeleteError = () => {
		if(deleteError){
			const errorMessage = deleteError ? deleteError : "check console for more details.";
            alert("Error while deleting book [" + book.title + "]: " + errorMessage);
		}
	}

    useEffect(() => { handleDeleteError() }, [deleteError]);

    return (
        <>
            { isDeleting && <LoadingSpinner position="fixed" /> }
            <Card style={cardStyle}>
                <img alt="Cover" width="100px" style={{padding: "5px"}} src={book.cover}/>
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                    <Card.Text><b>Book ID: </b>{book.id}</Card.Text>
                </Card.Body>
                <Card.Footer><b>Price: </b>{book.price}€</Card.Footer>
                { type !== "catalogue" && <Card.Footer><b>Quantity: </b>{book.quantity > 0 ? book.quantity : <span style={{color: "red"}}>Out of stock</span>}</Card.Footer> }
                <Card.Footer>
                    { type === "dashboard" ? (
                            <>
                                <BookModal book={book} onUpdate={onUpdate}/>
                                <Button variant="danger" style={{ marginLeft: '10px' }}  onClick={handleDelete}>Delete</Button>
                            </>
                        ) : (
                            <Link to={`/catalogue/${book.id}`}>Details</Link>
                        )
                    }
                </Card.Footer>
            </Card>
        </>
    );
}

export default BookCard;
import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookModal from '../Modal/BookModal';
import { Link } from 'react-router-dom';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import { useAuthContext } from '../Context/AuthContext';

function BookCard({ book, type }) {

  const { authState } = useAuthContext();

  const { handleFetch: deleteBook, data: deletedBook, error: bookDeleteError } = useAPIFetch({
    url: getUrl("DELETE_BOOK", { bookId: book.id }), 
    method: "DELETE"
  })

  const { handleFetch: orderBook, data: orderedBook, error: bookOrderError } = useAPIFetch({
    url: getUrl("PLACE_ORDER"), 
    method: "POST", 
    body: book
  })

  const handleOrder = () => {
    if(authState.isAuth) orderBook();
    else window.location.href = "/authentication";
  }

  useEffect(() => {
    if(deletedBook){
      alert(deletedBook.id + " correctly deleted!");
      window.location.reload();
    }

    if(bookDeleteError){
      alert("Something went wrong! Check console logs...");
      console.error(bookDeleteError);
    }
  }, [deletedBook, bookDeleteError])

  useEffect(() => {
    if(orderedBook){
      alert(orderedBook.id + " correctly ordered!");
      window.location.reload();
    }

    if(bookOrderError){
      alert("Something went wrong! Check console logs...");
      console.error(bookOrderError);
    }
  }, [orderedBook, bookOrderError])

  return (
    <Card style={{ width: '18rem' }}>
      { type !== "catalogue" && <img alt="Cover" width="100px" style={{padding: "5px"}} src={book.cover}/> }
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <Card.Subtitle><b>ID: </b>{book.id}</Card.Subtitle>
        { type !== "catalogue" && type !== "dashboard" && <Card.Text>{book.description}</Card.Text> }
      </Card.Body>
      <Card.Footer><b>Price: </b>{book.price}</Card.Footer>
      { type !== "catalogue" && <Card.Footer><b>Quantity: </b>{book.quantity}</Card.Footer> }
      <Card.Footer>
        { type === "dashboard" ? (
            <>
            <BookModal book={book} />
            <Button variant="danger" style={{ marginLeft: '10px' }}  onClick={deleteBook}>Delete</Button>
            </>
          ) : (
            type === "catalogue" ? (
              <Link to={`/catalogue/${book.id}`}>Details</Link>
            ) : (
              <Button variant="primary" onClick={handleOrder}>Order</Button>
            )
          )
        }
      </Card.Footer>
    </Card>
  );
}

export default BookCard;
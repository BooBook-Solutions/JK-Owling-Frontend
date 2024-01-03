import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookModal from '../Modal/BookModal';
import { Link } from 'react-router-dom';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import { useAuthContext } from '../Context/AuthContext';

function BookCard({ book, type }) {

  const { authState } = useAuthContext();
  const [currentQuantity, setCurrentQuantity] = useState(null);

  const { handleFetch: deleteBook, data: deletedBook, error: bookDeleteError } = useAPIFetch({
    url: getUrl({ 
      endpoint: "BOOK_DETAILS", 
      pathParams: { book_id: book.id }
    }), 
    method: "DELETE"
  })

  const handleDelete = () => {  
    if(window.confirm("Are you sure you want to delete this book?")) deleteBook();
  }

  const { handleFetch: orderBook, data: orderedBook, error: bookOrderError } = useAPIFetch({
    url: getUrl({ endpoint: "ORDERS" }), 
    method: "POST", 
    body: { user_id: authState.user.id, book_id: book.id, quantity: currentQuantity }
  })

  const handleOrder = () => {
    if(book.quantity === 0) alert("Book out of stock!");
    else if(authState.isAuth) {
      const quantity = prompt('Enter the quantity:');

      if(quantity === null) return;

      const parsedQuantity = parseInt(quantity, 10);

      if(!isNaN(parsedQuantity) && parsedQuantity > 0 && parsedQuantity <= book.quantity) {
        setCurrentQuantity(parsedQuantity);
      }
      else alert("Invalid quantity!");
    }
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
    if(currentQuantity) orderBook();
  }, [currentQuantity])

  useEffect(() => {
    if(orderedBook){
      alert(orderedBook.book_id + " correctly ordered! Check your orders.");
      window.location.reload();
    }

    if(bookOrderError){
      alert("Something went wrong! Check console logs...");
      console.error(bookOrderError);
    }
  }, [orderedBook, bookOrderError])

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Text style={{marginLeft: "10px", marginTop: "5px"}}><b>Book ID: </b>{book.id}</Card.Text>
      { type !== "catalogue" && <img alt="Cover" width="100px" style={{padding: "5px"}} src={book.cover}/> }
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        { type !== "catalogue" && type !== "dashboard" && <Card.Text>{book.description}</Card.Text> }
      </Card.Body>
      <Card.Footer><b>Price: </b>{book.price}€</Card.Footer>
      { type !== "catalogue" && <Card.Footer><b>Quantity: </b>{book.quantity > 0 ? book.quantity : <span style={{color: "red"}}>Out of stock</span>}</Card.Footer> }
      <Card.Footer>
        { type === "dashboard" ? (
            <>
            <BookModal book={book} />
            <Button variant="danger" style={{ marginLeft: '10px' }}  onClick={handleDelete}>Delete</Button>
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
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookModal from '../Modal/BookModal';
import { Link } from 'react-router-dom';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import { useAuthContext } from '../Context/AuthContext';

function BookCard({ book, type, onUpdate, onDelete }) {

  const { authState } = useAuthContext();
  const [currentQuantity, setCurrentQuantity] = useState(null);

  const cardStyle = {
    width: type !== "dashboard" ? 'auto' : '18rem',
  };

  const { handleFetch: deleteBook } = useAPIFetch({
    url: getUrl({ 
      endpoint: "BOOK_DETAILS", 
      pathParams: { book_id: book.id }
    }), 
    method: "DELETE"
  })

  const { handleFetch: orderBook } = useAPIFetch({
    url: getUrl({ endpoint: "ORDERS" }), 
    method: "POST", 
    body: { user_id: authState.user.id, book_id: book.id, quantity: currentQuantity }
  })

  const handleDelete = () => {
    if(window.confirm("Are you sure you want to delete this book?")) {
      deleteBook().then((deletedBook) => {
        if(deletedBook) {
          console.log("Book [" + deletedBook.title + "] correctly deleted!")
          alert("Book [" + deletedBook.title + "] correctly deleted!");
          onDelete(deletedBook.id);
        } else {
          alert("Error while deleting book [" + book.title + "]. Check console for more details.");
        }
      });
    }
  }

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
    if(currentQuantity) {
      orderBook().then((order) => {
        if(order) {
          console.log("Book [" + order.book.title + "] correctly ordered!")
          alert("Book [" + order.book.title + "] correctly ordered! Check your orders for more details.");
          book.quantity -= currentQuantity;
        } else {
          alert("Error while ordering book [" + book.title + "]. Check console for more details.");
        }
      });
    }
  }, [currentQuantity]) // eslint-disable-line

  return (
    <Card style={cardStyle}>
      { type !== "catalogue" && <img alt="Cover" width="100px" style={{padding: "5px"}} src={book.cover}/> }
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        <Card.Text><b>Book ID: </b>{book.id}</Card.Text>
        { type !== "catalogue" && type !== "dashboard" && <Card.Text>{book.description}</Card.Text> }
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
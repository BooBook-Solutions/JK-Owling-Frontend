import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import BookModal from '../Modal/BookModal';
import { Link } from 'react-router-dom';

import { useAuthContext } from '../Context/AuthContext';

function BookCard({ book, type }) {

  const { authState } = useAuthContext();

  const handleOrder = () => {
    if(authState.isAuth)
      alert(authState.user.email + " ordered " + book.id)
    else window.location.href="/authentication";
  }

  const deleteBook = () => {
    alert("deleted " + book.title)
  };

  return (
    <Card style={{ width: '18rem' }}>
      { type !== "catalogue" && <img alt="Cover" width="100px" style={{padding: "5px"}} src={book.cover}/> }
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
        { type !== "catalogue" && <Card.Text>{book.description}</Card.Text> }
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
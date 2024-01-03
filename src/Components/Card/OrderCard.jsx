import { useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OrderModal from '../Modal/OrderModal';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function OrderCard({ order, type }) {

    const statusClass = order.status === "pending" ? "text-warning" : order.status === "confirmed" ? "text-success" : "text-danger";

    const { handleFetch: deleteOrder, data: deletedOrder, error } = useAPIFetch({
        url: getUrl({ 
            endpoint: "ORDER_DETAILS", 
            pathParams: { order_id: order.id }
        }), 
        method: "DELETE"
    })

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this order?")) deleteOrder();
    }

    useEffect(() => {
        if(deletedOrder){
            alert(deletedOrder.id + " correctly deleted!");
            window.location.reload();
        }

        if(error){
            alert("Something went wrong! Check console logs...");
            console.error(error);
        }
    }, [deletedOrder, error])

  return (
    <Card style={{ width: '18rem' }}>
        <img alt="Cover" width="50px" style={{padding: "5px", borderRadius: "10px"}} src={order.book.cover} />
        <Card.Body>
            <Card.Title>Order #{order.id}</Card.Title>
            <Card.Text><b>Book: </b>{order.book.title} [{order.book.id}]</Card.Text>
            { type === "dashboard" && <Card.Text><b>Buyer: </b>{order.user.email} [{order.user.id}]</Card.Text> }
            <Card.Text><b>Quantity: </b>{order.quantity}</Card.Text>
            <Card.Text><b>Status: </b><span className={statusClass}>{order.status}</span></Card.Text>
        </Card.Body>
        { type === "dashboard" &&
        <Card.Footer>
            <OrderModal order={order} type={type} />
            <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleDelete}>Delete</Button>
        </Card.Footer>
        }
    </Card>
  );
}

export default OrderCard;
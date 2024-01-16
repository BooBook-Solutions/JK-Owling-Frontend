import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OrderModal from '../Modal/OrderModal';

import LoadingSpinner from '../Common/Spinner';

import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';

function OrderCard({ order, type, statuses, onUpdate, onDelete }) {

    const statusClass = order?.status.name === "pending" ? "text-warning" : order?.status.name === "confirmed" ? "text-success" : "text-danger";
    const [isDeleting, setIsDeleting] = useState(false);

    const { handleFetch: deleteOrder, error: deleteError } = useAPIFetch({
        url: getUrl({ 
            endpoint: "ORDER_DETAILS", 
            pathParams: { order_id: order?.id }
        }), 
        method: "DELETE"
    })

    const handleDelete = () => {
        if(window.confirm("Are you sure you want to delete this order?")) {
            setIsDeleting(true);
            deleteOrder()
            .then((deletedOrder) => {
                if(deletedOrder) {
                    console.log("Order [" + deletedOrder?.id + "] correctly deleted!")
                    alert("Order [" + deletedOrder?.id + "] correctly deleted!");
                    onDelete(deletedOrder?.id);
                }
            })
            .then(() => setIsDeleting(false));
        }
    }

    const handleDeleteError = () => {
        if(deleteError){
            const errorMessage = deleteError ? deleteError : "check console for more details.";
            alert("Error while deleting order [" + order?.id + "]: " + errorMessage);
        }
    }

    useEffect(() => { handleDeleteError() }, [deleteError]) // on delete error, show error

    return (
        <>  
            { isDeleting && <LoadingSpinner position="fixed" /> } 
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Text><b>Book: </b>{order?.book?.title}</Card.Text>
                    { type === "dashboard" && <Card.Text><b>Buyer: </b>{order?.user?.email || "User deleted" }</Card.Text> }
                    <Card.Text><b>Order </b>#{order?.id}</Card.Text>
                </Card.Body>
                <Card.Footer><b>Quantity: </b>{order?.quantity}</Card.Footer>
                <Card.Footer><b>Status: </b><span className={statusClass}>{order?.status.name_translated}</span></Card.Footer>
                { type === "dashboard" &&
                    <Card.Footer>
                        <OrderModal order={order} type={"update"} statuses={statuses} onUpdate={onUpdate}/>
                        <Button variant="danger" style={{ marginLeft: '10px' }} onClick={handleDelete}>Delete</Button>
                    </Card.Footer>
                }
            </Card>
        </>
    );
}

export default OrderCard;
import React from 'react';
import { Table, Button } from 'react-bootstrap';
import PageManager from './PageManager';

const OrderList = ({ orders, pageItems, type }) => {
  
  const { pageManager, currentItems: currentOrders} = PageManager(orders, pageItems)

  const confirmOrder = (orderId) => {
    alert(orderId + " confirmed!")
  };

  const rejectOrder = (orderId) => {
    alert(orderId + " deleted!")
  };

  return (
    <>
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>{ type === "dashboard" ? "Actions" : "Status" }</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.user_id}</td>
              <td>{order.book_id}</td>
              <td>
                { /* pop up with update / confirm / reject => if update then modal with changes */ }
                { type === "dashboard" ? (
                  <div>
                    <Button variant="primary" onClick={() => confirmOrder(order.id)}>Confirm</Button>
                    <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => rejectOrder(order.id)}>Reject</Button>
                  </div>
                ) : (
                  <p>{order.status}</p>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      { pageManager }
    </div>
    </>
  );
};

export default OrderList;

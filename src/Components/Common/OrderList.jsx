import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';

const OrderList = ({ orders, page, type }) => {
  const [currentOrderPage, setCurrentOrderPage] = useState(1);
  const ordersPerPage = page >= orders.length ? orders.length : page;

  const indexOfLastUser = currentOrderPage * ordersPerPage;
  const indexOfFirstUser = indexOfLastUser - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => {
    setCurrentOrderPage(pageNumber);
  };

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
      { orders.length > page && <div className="pagination">
        <Button variant="primary" onClick={() => paginate(currentOrderPage - 1)} disabled={currentOrderPage === 1}>
          Previous
        </Button>
        <span className="mx-2" style={{display: "flex", alignItems: "center"}}>{currentOrderPage}</span>
        <Button variant="primary" onClick={() => paginate(currentOrderPage + 1)} disabled={indexOfLastUser >= orders.length}>
          Next
        </Button>
      </div> }
    </div>
    </>
  );
};

export default OrderList;

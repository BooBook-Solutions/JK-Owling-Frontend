import React, { useState, useEffect } from 'react';
import { Table, Form } from 'react-bootstrap';
import PageManager from './PageManager';
import useAPIFetch from '../../Hooks/useAPIFetch';
import getUrl from '../../Endpoints/endpoints';
import SearchBar from './SearchBar';

const OrderList = ({ orders, pageItems, type }) => {

  const statuses = ["pending", "confirmed", "rejected"] // Need to get this from API
  
  const [currentOrder, setCurrentOrder] = useState(null);

  const [filteredOrders, setFilteredOrders] = useState(orders);

  const { pageManager, currentItems: currentOrders } = PageManager(filteredOrders, pageItems);

  const { handleFetch: changeStatus, data: updatedOrder, error: orderUpdateError } = useAPIFetch({
    url: getUrl({ 
      endpoint: "ORDER_DETAILS", 
      pathParams: { order_id: currentOrder?.orderId }
    }), 
    method: "PUT",
    body: { status: currentOrder?.orderStatus }
  })

  const handleOrderChange = (values) => {
    const fieldName = Object.keys(values)[1];
    console.log(fieldName, values[fieldName])
    setCurrentOrder(prevOrder => ({
      ...prevOrder,
      ["orderId"]: values.order,
      [fieldName]: values[fieldName]
    }));
  };

  useEffect(() => {
    if(currentOrder) {
      console.log(currentOrder);
      //changeStatus()
    }
  }, [currentOrder])

  useEffect(() => {
    if(updatedOrder){
      alert(updatedOrder.status);
      window.location.reload();
    }

    if(orderUpdateError){
      alert("Something went wrong! Check console logs...");
      console.error(orderUpdateError);
    }
  }, [updatedOrder, orderUpdateError])

  return (
    <>
    <div>
      <SearchBar items={orders} setItems={setFilteredOrders} placeholder={"Search orders..."} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User ID</th>
            <th>Book ID</th>
            <th>Quantity</th>
            <th>Status</th>
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
                  <Form.Control type="number" min={0} defaultValue={order.quantity} onChange={(e) => handleOrderChange({"order": order.id, "quantity": e.target.value})} />
                ) : (
                  <p>{order.quantity}</p>
                )}
              </td>
              <td>
                { /* pop up with update / confirm / reject => if update then modal with changes */ }
                { type === "dashboard" ? (
                  <Form.Control as="select" defaultValue={order.status} onChange={(e) => handleOrderChange({"order": order.id, "status": e.target.value})}>
                      {statuses.map((status) => (
                          <option value={status}>{status}</option>
                      ))}
                  </Form.Control>
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

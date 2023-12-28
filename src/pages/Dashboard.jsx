import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import useFetch from "../Hooks/useAPIFetch";

import Sidebar from "../Components/Dashboard/Sidebar";
import UserList from "../Components/Dashboard/UserList";
import BookList from "../Components/Common/BookList";
import RoleList from "../Components/Dashboard/RoleList";
import OrderList from "../Components/Common/OrderList";

import "../Styles/dashboard.scss"
import LoadingSpinner from "../Components/Common/Spinner";

function Dashboard(){

  const [users, setUsers] = useState(null);
  const [books, setBooks] = useState(null);
  const [orders, setOrders] = useState(null);

  const { data: userData, error: userError } = useFetch("http://localhost:8000/api/users")
  const { data: bookData, error: bookError } = useFetch("http://localhost:8000/api/books")
  const { data: orderData, error: orderError } = useFetch("http://localhost:8000/api/orders")

  useEffect(() => {
    if(userData) { setUsers(userData.users); }
    if(userError) { console.error(userError); }
  }, [userData, userError])

  useEffect(() => {
    if(bookData) { setBooks(bookData.books); }
    if(bookError) { console.error(bookError); }
  }, [bookData, bookError])

  useEffect(() => {
    if(orderData) { setOrders(orderData.orders); }
    if(orderError) { console.error(orderError); }
  }, [orderData, orderError])

  return (
    <>
    <div className="main-wrapper">

      <Sidebar />

      <Container className="main-container container-fluid">
        
        { /* Modal to add new user ?!? */ }
        <Container id="users" className="mt-3 mb-5">
          <h1>Users</h1>
          { 
            users ? (
              users.length > 0 ? <UserList users={users} page={6}/> : "Empty" 
            ) : (
              <LoadingSpinner />
            )
          }
        </Container>
          
        <Container id="roles" className="mt-5 mb-5">
          <h1>Roles</h1>
          { 
            users ? (
              users.length > 0 ? <RoleList users={users} page={8}/> : "Empty" 
            ) : (
              <LoadingSpinner />
            )
          }
        </Container>
      
        { /* Modal to add new book */ }
        <Container id="books" className="mt-5 mb-5">
          <h1>Books</h1>
          { 
            books ? (
              books.length > 0 ?<BookList books={books} page={6} pagination={"left"} type={"dashboard"} /> : "Empty" 
            ) : (
              <LoadingSpinner />
            )
          }
        </Container>
        
            
        { /* Modal to add place new order */ }
        <Container id="orders" className="mt-5 mb-5">
          <h1>Orders</h1>
          { 
            orders ? (
              orders.length > 0 ? <OrderList orders={orders} page={8} type={"dashboard"} /> : "Empty" 
            ) : (
              <LoadingSpinner />
            )
          }
        </Container>

      </Container>
    </div>
    </>
  );
}

export default Dashboard;

import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

import Sidebar from "../Components/Dashboard/Sidebar";
import UserList from "../Components/Dashboard/UserList";
import BookList from "../Components/Common/BookList";
import RoleList from "../Components/Dashboard/RoleList";
import OrderList from "../Components/Common/OrderList";
import LoadingSpinner from "../Components/Common/Spinner";

import useFetch from "../Hooks/useAPIFetch";
import getUrl from "../Endpoints/endpoints";

import "../Styles/dashboard.scss"

function Dashboard(){

  const [users, setUsers] = useState(null);
  const [userError, setUserError] = useState(null);

  const [books, setBooks] = useState(null);
  const [bookError, setBookError] = useState(null);

  const [orders, setOrders] = useState(null);
  const [orderError, setOrderError] = useState(null);

  const { data: userData, error: userDataError } = useFetch(getUrl("ALL_USERS"))
  const { data: bookData, error: bookDataError } = useFetch(getUrl("ALL_BOOKS"))
  const { data: orderData, error: orderDataError } = useFetch(getUrl("ALL_ORDERS"))

  useEffect(() => {
    userData ? setUsers(userData) : setUserError(userDataError);
  }, [userData, userDataError])

  useEffect(() => {
    bookData ? setBooks(bookData) : setBookError(bookDataError);
  }, [bookData, bookDataError])

  useEffect(() => {
    orderData ? setOrders(orderData) : setOrderError(orderDataError);
  }, [orderData, orderDataError])

  return (
    <>
    <div className="main-wrapper">

      <Sidebar />

      <Container className="main-container container-fluid">

        { /* Modal to add new user ?!? */ }
        <Container id="users" className="mt-3 mb-5">
          <h1>Users</h1>
          { !users && !userError ? (
              <LoadingSpinner />
          ) : (
              userError ? (
                <p>{userError?.message}</p>
              ) : (
                users.length > 0 ? <UserList users={users} page={6}/> : "Empty" 
              )
          )}
        </Container>

        <Container id="roles" className="mt-5 mb-5">
          <h1>Roles</h1>
          { !users && !userError ? (
              <LoadingSpinner />
          ) : (
              userError ? (
                <p>{userError?.message}</p>
              ) : (
                users.length > 0 ? <RoleList users={users} page={8}/> : "Empty" 
              )
          )}
        </Container>
      
        { /* Modal to add new book */ }
        <Container id="books" className="mt-5 mb-5">
          <h1>Books</h1>
          { !books && !bookError ? (
              <LoadingSpinner />
          ) : (
               bookError ? (
                <p>{bookError?.message}</p>
              ) : (
                books.length > 0 ?<BookList books={books} page={6} pagination={"left"} type={"dashboard"} /> : "Empty" 
              )
          )}
        </Container>
            
        { /* Modal to add place new order */ }
        <Container id="orers" className="mt-5 mb-5">
          <h1>Orders</h1>
          { !orders && !orderError ? (
              <LoadingSpinner />
          ) : (
               orderError ? (
                <p>{orderError?.message}</p>
              ) : (
                orders.length > 0 ? <OrderList orders={orders} page={8} type={"dashboard"} /> : "Empty" 
              )
          )}
        </Container>
        
      </Container>
    </div>
    </>
  );
}

export default Dashboard;

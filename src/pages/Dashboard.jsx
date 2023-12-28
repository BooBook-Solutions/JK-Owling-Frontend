import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';

import Sidebar from "../Components/Dashboard/Sidebar";
import UserList from "../Components/Dashboard/UserList";
import BookList from "../Components/Common/BookList";
import RoleList from "../Components/Dashboard/RoleList";
import OrderList from "../Components/Common/OrderList";
import LoadingSpinner from "../Components/Common/Spinner";

import useAPIFetch from '../Hooks/useAPIFetch';
import getUrl from "../Endpoints/endpoints";

import "../Styles/dashboard.scss"

function Dashboard(){

  const { handleFetch: getUsers, data: users, error: userError } = useAPIFetch({url: getUrl("ALL_USERS")})
  const { handleFetch: getBooks, data: books, error: bookError } = useAPIFetch({url: getUrl("ALL_BOOKS")})
  const { handleFetch: getOrders, data: orders, error: orderError } = useAPIFetch({url: getUrl("ALL_ORDERS")})

  useEffect(() => {
    getUsers();
    getBooks();
    getOrders();
  }, [])

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
        <Container id="orders" className="mt-5 mb-5">
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

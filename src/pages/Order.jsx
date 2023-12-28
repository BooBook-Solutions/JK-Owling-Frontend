import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";
import useFetch from "../Hooks/useAPIFetch";
import OrderList from "../Components/Common/OrderList";
import { useAuthContext } from "../Components/Context/AuthContext";
import LoadingSpinner from "../Components/Common/Spinner";

const Order = () => {

    const { authState } = useAuthContext();

    const [orders, setOrders] = useState([]);
    const { data: orderData, error: orderError } = useFetch("http://localhost:8000/api/orders/" + authState.user.id)

    useEffect(() => {
        if(orderData) { setOrders(orderData.orders); }
        if(orderError) { console.error(orderError); }
    }, [orderData, orderError])

    return (
        <>
        <Navigation />
        <Container className="p-3">
            <Container id="orders" className="mt-5 mb-5">
                <h1>Orders</h1>
                { 
                    orders ? (
                        orders.length > 0 ? <OrderList orders={orders} page={8} type={"user_orders"} /> : "Empty" 
                    ) : (
                        <LoadingSpinner />
                    )
                }
            </Container>
        </Container>
        </>
    );
};

export default Order;
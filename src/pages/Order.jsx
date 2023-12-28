import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";
import OrderList from "../Components/Common/OrderList";
import LoadingSpinner from "../Components/Common/Spinner";

import { useAuthContext } from "../Components/Context/AuthContext";

import ErrorPage from "./ErrorPage";

import useFetch from "../Hooks/useAPIFetch";
import getUrl from "../Endpoints/endpoints";

const Order = () => {

    const { authState } = useAuthContext();

    const [orders, setOrders] = useState(null);
    const [error, setError] = useState(null);

    const { data: userOrders, error: ordersError } = useFetch(getUrl("USER_ORDERS", { userId: authState.user.id }))

    useEffect(() => {
        userOrders ? setOrders(userOrders) : setError(ordersError);
    }, [userOrders, ordersError])

    return (
        <>
        { !orders && !error ? (
            <LoadingSpinner />
        ) : (
            error ? (
                <ErrorPage eCode={error?.status} eText={error?.message} />
            ) : (
                <>
                    <Navigation />
                    <Container className="p-3">
                        <Container id="orders" className="mt-5 mb-5">
                            <h1>Orders</h1>
                            { orders.length > 0 ? <OrderList orders={orders} page={8} type={"user_orders"} /> : "Empty" }
                        </Container>
                    </Container>
                </>
            )
        )}
        </>
    );
};

export default Order;
// Login.jsx
import React from "react";

import { Navigation } from "../components";
import { jwtDecode } from "jwt-decode";

import { useAuth } from "../contexts/authContext";

const Home = () => {

    const { user, setUser, isLogged, setLogged } = useAuth();

    return (
        <>
        <Navigation></Navigation>
        <h1>Home</h1>
        <br></br>
        <p>Name: {user?.name}</p>
        <p>Surname: {user?.surname}</p>
        <p>Email: {user?.email}</p>
        <p>Token: {user?.token}</p>
        <p>Expired: {jwtDecode(user?.token)?.expires}</p>
        <p>Logged: {String(isLogged)}</p>
        </>
    );
};

export default Home;
import React from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";

import { useAuthContext } from "../Components/Context/AuthContext";

import { jwtDecode } from "jwt-decode";

const Profile = () => {

    const { authState } = useAuthContext();

    const expiringDate = new Date(jwtDecode(authState.user.token).expires * 1000);

    return (
        <>
        <Navigation />
        <Container className="p-3">
            <h1>Profile</h1>
            <br></br>
            <p><b>Name: </b>{authState.user.name}</p>
            <p><b>Surname: </b>{authState.user.surname}</p>
            <p><b>Email: </b>{authState.user.email}</p>
            <p><b>Roles: </b>{String(authState.user.roles)}</p>
            <p><b>Picture: </b>{authState.user.picture}</p>
            <p><b>Token: </b>{authState.user.token}</p>
            <p><b>Expired: </b>{String(expiringDate)}</p>
            <p><b>Logged: </b>{String(authState.isAuth)}</p>
        </Container>
        </>
    );
};

export default Profile;
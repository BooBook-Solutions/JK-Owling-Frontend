import React from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";

import { useAuthContext } from "../Components/Context/AuthContext";

const Profile = () => {

    const { authState } = useAuthContext();

    return (
        <>
        <Navigation />
        <Container className="p-3">
            <h1>Profile</h1>
            <br></br>
            <p><b>User ID: </b>{authState.user.id}</p>
            <p><b>Name: </b>{authState.user.name}</p>
            <p><b>Surname: </b>{authState.user.surname}</p>
            <p><b>Email: </b>{authState.user.email}</p>
            <p><b>Role: </b>{authState.user.role}</p>
        </Container>
        </>
    );
};

export default Profile;
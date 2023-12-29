import React from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";

const Home = () => {

    return (
        <>
        <Navigation />
        <Container className="p-3">
            <h1>Home</h1>
        </Container>
        </>
    );
};

export default Home;
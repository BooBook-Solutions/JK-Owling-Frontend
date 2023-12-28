import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";

import useAuthFetch from "../Hooks/useAuthFetch";

import "../Styles/style.css";
import LoadingSpinner from "../Components/Common/Spinner";

const Authentication = () => {

    const { handleGoogle, loading, error } = useAuthFetch("http://localhost:8000/authenticate/login")

    // To avoid Google button render issues
    useEffect(() => {
        const google = window.google;
        
        if (google) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogle
            });

            google.accounts.id.renderButton(document.getElementById("g_id_signin"), {
                // type: "standard",
                theme: "filled_black",
                // size: "small",
                text: "continue_with",
                shape: "pill",
            });
        }
    }, [handleGoogle]);

    return (
        <>
        <Navigation />
        <Container className="centered-div">
            { !loading && <h1>Authenticate to continue</h1> }
            { error && <p style={{ color: "red" }}>{error}</p>}
            { loading ? (<LoadingSpinner />) : (<div id="g_id_signin"></div>)}
        </Container>
        </> 
    );
};

export default Authentication;
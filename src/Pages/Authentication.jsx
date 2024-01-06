import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';

import Navigation from "../Components/Common/Navbar";
import LoadingSpinner from "../Components/Common/Spinner";

import useAuthFetch from "../Hooks/useAuthFetch";
import getUrl from "../Endpoints/endpoints";

const Authentication = () => {

    const { handleGoogle, loading, error } = useAuthFetch(getUrl({ endpoint: "AUTHENTICATION" }))

    // To avoid Google button render issues
    useEffect(() => {
        const loadGoogleClient = () => {
            const google = window.google;
            
            if (google && google.accounts) {
                google.accounts.id.initialize({
                    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                    callback: handleGoogle
                });

                google.accounts.id.renderButton(document.getElementById("g_id_signin"), {
                    // type: "standard",
                    theme: "filled_black",
                    // size: "small",
                    text: "continue_with",
                    shape: "pill"
                });
            }
        }

        // Check if the Google API is already loaded
        if (window.google && window.google.accounts) {
            loadGoogleClient();
        } else {
            // If not loaded, load the Google API dynamically
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.onload = loadGoogleClient;
            document.head.appendChild(script);
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
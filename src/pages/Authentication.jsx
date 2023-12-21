import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";

import Navigation from "../Components/Common/Navbar";

import { useAuthContext } from "../Components/Context/AuthContext";

import "../Styles/auth.css";

const Authentication = () => {

    const Navigate = useNavigate();
    const { login } = useAuthContext();

    const handleLogin = (authUser) => {
        login(authUser);
        Navigate("/");
    };

    const handleGoogleCredentialResponse = (response) =>{
        fetch(process.env.REACT_APP_AUTH_ENDPOINT, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({token: response.credential})
        })
        .then((response) => { return response.json(); })
        .then((data) => { 
            if(data?.user)
                handleLogin(data?.user);
            else
                throw new Error(data?.message || data);
        })
        .catch((error) => {
            console.log(error?.message);
        });
    }

    // To avoid render issues, use useEffect Hook
    useEffect(() => {
        const google = window.google;
        
        if (google) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleGoogleCredentialResponse
            });

            google.accounts.id.renderButton(document.getElementById("g_id_signin"), {
                // type: "standard",
                theme: "filled_black",
                // size: "small",
                text: "continue_with",
                shape: "pill",
            });
        }
    });

    return (
        <>
        <Navigation />
        <Container>
            <div className="centered-div">
                <div>
                    <h1>Authenticate to continue</h1>
                </div>
                <div className="break"></div>
                <div id="g_id_signin"></div>
            </div>
        </Container>
        </>
    );
};

export default Authentication;
// Login.jsx
import React, { useEffect } from "react";

import { Navigation } from "../components";

import { useAuth } from "../contexts/authContext";

import "../assets/styles/auth.css";

const Authentication = () => {

    const { user, setUser, isLogged, setLogged } = useAuth();

    const handleGoogleCredentialResponse = async (response) =>{
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
            if(data?.user){
                localStorage.setItem("user", JSON.stringify(data?.user));
                localStorage.setItem("login", true);
                window.location.reload();

                throw new Error(data?.message || data);
            }
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
    }, [handleGoogleCredentialResponse]);

    return (
        <>
        <Navigation ></Navigation>
        <div className="centered-div">
            <div>
                <h1>Authenticate to continue</h1>
            </div>
            <div className="break"></div>
            <div id="g_id_signin"></div>
        </div>
        </>
    );
};

export default Authentication;
import { useState } from "react";
import { useAuthContext } from "../Components/Context/AuthContext";

const useAuthFetch = (url, redirect) => {

    const { login } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = (authToken) => { login(authToken); };
    
    const handleGoogle = (response) =>{
        setLoading(true);
        fetch(url, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify({token: response.credential})
        })
        .then((response) => { 
            setLoading(false);
            return response.json(); 
        })
        .then((data) => { 
            if(data?.token){
                handleLogin(data?.token);
                window.location.reload();
            }
            
            throw new Error(data?.message || data);
        })
        .catch((error) => {
            setError(error?.message);
        });
    }

    return { handleGoogle, loading, error }
}

export default useAuthFetch;
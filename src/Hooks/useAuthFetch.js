import { useState } from "react";
import { useAuthContext } from "../Components/Context/AuthContext";
import { jwtDecode } from "jwt-decode";
import getUrl from "../Endpoints/endpoints";

const useAuthFetch = (url) => {

    const { login } = useAuthContext();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    
    const handleGoogle = async (response) => {
        
        let role = "user";
        let isRoleNeeded = false;
        
        await fetch(getUrl({ 
            endpoint: "USER_EMAIL", 
            queryParams: { user_email: jwtDecode(response.credential).email }
        }))
        .then((response) => { 
            if(!response.ok) { // User not found, so ask for role
                isRoleNeeded = true;
                if(window.confirm("Do you want to be an admin?"))
                    role = "admin";
            }
        })

        const body = isRoleNeeded ? { google_token: response.credential, role } : { google_token: response.credential };

        setLoading(true);
        await fetch(url, { 
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include',
            body: JSON.stringify(body)
        })
        .then((response) => { 
            setLoading(false);
            return response.json(); 
        })
        .then((data) => { 
            if(data?.token){
                login(data?.token);
            } else throw new Error(data?.message || data);
        })
        .catch((error) => {
            console.error("Fetch error:", error?.message);
            setError(error?.message);
        });
    }

    return { handleGoogle, loading, error }
}

export default useAuthFetch;
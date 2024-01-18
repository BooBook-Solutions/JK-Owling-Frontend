import { useState } from "react";
import { useAuthContext } from "../Components/Context/AuthContext";

const useAPIFetch = ({ url, method = "GET", body = null }) => {

    const { token } = useAuthContext();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleFetch = async (params = null) => {
        setData(null);
        setError(null);

        const headers = {
            "Content-Type": "application/json",
            ...(token && { "Authorization": `Bearer ${token}` }),
        };

        const options = {
            method,
            headers
        };

        body = params ? { ...body, ...params } : body;

        if(body) { options.body = JSON.stringify(body); }

        try {
            const response = await fetch(url, options);
            const json_data = await response.json();
        
            if (response.ok) {
                setData(json_data); // used in visual renderings (GET requests)
                return json_data; // used in POST, PUT and DELETE requests
            }
            
            throw new Error(json_data?.detail || json_data);

        } catch (error) {
            console.error("Fetch error:", error?.detail);
            setError(error?.detail);
            return null;
        }
    }

    return { handleFetch, data, setData, error }
}

export default useAPIFetch;
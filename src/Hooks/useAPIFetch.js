import { useState, useEffect } from "react";
import { useAuthContext } from "../Components/Context/AuthContext";

const useAPIFetch = (url, method="GET", body=null) => {

    const { token } = useAuthContext();
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const headers = {
                "Content-Type": "application/json",
                ...(token && { "Authorization": `Bearer ${token}` }),
            };

            const options = {
                method,
                headers
            };

            if(body) { options.body = JSON.stringify(body); }
            
            try {
                const response = await fetch(url, options);
                const jsonData = await response.json();

                if(response.status === 200)
                    setData(jsonData)
                else
                    setError({ "status": response.status, "message": jsonData?.message });
            } catch(error) {
                console.error("Fetch error:", error.message);
            }
        }

        fetchData();
    }, [url, method, body, token]);

    return { data, error }
}

export default useAPIFetch;
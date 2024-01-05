const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const endpoints = {
    AUTHENTICATION: () => "/authentication/login",
    USERS: () => "/users",
    ROLES: () => "/users/role",
    BOOKS: () => "/books",
    ORDERS: () => "/orders",
    STATUS: () => "/orders/status",
    USER_DETAILS: (params) => `/users/${params?.user_id}`,
    BOOK_DETAILS: (params) => `/books/${params?.book_id}`,
    ORDER_DETAILS: (params) => `/orders/${params?.order_id}`,
};

const getUrl = ({ endpoint, pathParams={}, queryParams={} }) => {
    const endpointFunction = endpoints[endpoint];
  
    if(!endpointFunction){
        console.error(`Endpoint "${endpoint}" not found.`);
        return null;
    }
  
    var endpointPath = endpointFunction(pathParams);

    if(pathParams && endpointPath.includes("undefined")){
        console.error(`Path parameters for "${endpoint}" contain undefined values.`);
        return null;
    }

    if(queryParams){
        const queryString = Object.keys(queryParams)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(queryParams[key]))
        .join('&');

        if(queryString)
            endpointPath += "?" + queryString; 
    }

    return `${BACKEND_URL}${endpointPath}`;
  };
  
  export default getUrl;
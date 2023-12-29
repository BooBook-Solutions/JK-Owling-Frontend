const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const endpoints = {
    AUTHENTICATION: () => "/authentication/login",
    USERS: () => "/users",
    BOOKS: () => "/books",
    ORDERS: () => "/orders",
    USER_DETAILS: (params) => `/users/${params?.userId}`,
    BOOK_DETAILS: (params) => `/books/${params?.bookId}`,
    ORDER_DETAILS: (params) => `/orders/${params?.orderId}`,
};

const getUrl = ({ endpoint, pathParams={}, queryParams={} }) => {
    const endpointFunction = endpoints[endpoint];
  
    if(!endpointFunction){
        console.error(`Endpoint "${endpoint}" not found.`);
        return null;
    }
  
    var endpointPath = endpointFunction(pathParams);

    if(endpointPath.includes("undefined")){
        console.error(`Path parameters for "${endpoint}" aren't defined, but still requested!`);
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
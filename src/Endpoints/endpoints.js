const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const endpoints = {
    AUTHENTICATION: () => "/authenticate/login",
    ALL_USERS: (params) => "/api/users",
    ALL_BOOKS: (params) => "/api/books",
    ALL_ORDERS: (params) => "/api/orders",
    USER_DETAILS: (params) => `/api/users/${params?.userId}`,
    BOOK_DETAILS: (params) => `/api/books/${params?.bookId}`,
    USER_ORDERS: (params) => `/api/users/${params?.userId}/orders`
};

const getUrl = (endpoint, params={}) => {
    const endpointFunction = endpoints[endpoint];
  
    if (!endpointFunction) {
        console.error(`Endpoint "${endpoint}" not found.`);
        return null;
    }
  
    const endpointPath = endpointFunction(params);
    return `${BACKEND_URL}${endpointPath}`;
  };
  
  export default getUrl;
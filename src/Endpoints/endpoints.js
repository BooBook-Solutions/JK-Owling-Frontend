const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const endpoints = {
    /* GET ENDPOINTS */
    ALL_USERS: () => "/users",
    ALL_BOOKS: () => "/books",
    ALL_ORDERS: () => "/orders",
    USER_DETAILS: (params) => `/users/${params?.userId}`,
    BOOK_DETAILS: (params) => `/books/${params?.bookId}`,
    USER_ORDERS: (params) => `/users/${params?.userId}/orders`,

    /* POST ENDPOINTS */
    AUTHENTICATION: () => "/authenticate/login",
    PLACE_ORDER: () => "/orders",

    /* PUT ENDPOINTS */
    UPDATE_USER: (params) => `/users/${params?.userId}`,

    /* DELETE ENDPOINTS */
    DELETE_USER: (params) => `/users/${params?.userId}/delete`,
    DELETE_BOOK: (params) => `/books/${params?.bookId}/delete`,
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
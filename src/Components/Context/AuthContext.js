import React, { createContext, useContext, useState, useEffect } from 'react';

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [userState, setUserState] = useState(() => {
    const storedUserState = localStorage.getItem('userState');
    return storedUserState ? JSON.parse(storedUserState) : { isAuth: false, token: "" };
  });

  const login = (authToken) => {
    setUserState({
        isAuth: true,
        token: authToken
    });
  }

  const getDecodedState = () => {
    if(userState.isAuth){
      const decodedToken = jwtDecode(userState.token);
      const isUserAdmin = decodedToken.user.role.toLowerCase() === "admin";
      return { isAuth: userState.isAuth, user: decodedToken.user, isAdmin: isUserAdmin, expires: decodedToken.expires }
    } else 
      return { isAuth: false, user: {}, expires: null };
  }

  const logout = () => {
    setUserState({
      isAuth: false,
      token: ""
    });
  };

  useEffect(() => {
    if(userState.isAuth)
      localStorage.setItem("userState", JSON.stringify(userState));
    else
      localStorage.removeItem("userState");
  }, [userState]);

  useEffect(() => {
    if(userState.isAuth){
      const exp = jwtDecode(userState?.token).expires * 1000;
      if (exp < Date.now()) { logout(); }
    }
  }, []); // eslint-disable-line

  return (
    //authState: userState, login, logout
    <AuthContext.Provider value={{ authState: getDecodedState(), token: userState.token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => { return useContext(AuthContext); };

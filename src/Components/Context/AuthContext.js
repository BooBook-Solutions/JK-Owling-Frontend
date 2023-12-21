import React, { createContext, useContext, useState, useEffect } from 'react';

import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [userState, setUserState] = useState(() => {
    const storedUserState = localStorage.getItem('userState');
    return storedUserState ? JSON.parse(storedUserState) : { isAuth: false, user: {} };
  });

  const login = (authUser) => {
    setUserState({
        isAuth: true,
        user: authUser
    });
  }

  const logout = () => {
    setUserState({
      isAuth: false,
      user: {}
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
      const exp = jwtDecode(userState.user.token).expires * 1000;
      if (exp < Date.now()) { logout(); }
    }
  });

  return (
    <AuthContext.Provider value={{ authState: userState, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => { return useContext(AuthContext); };

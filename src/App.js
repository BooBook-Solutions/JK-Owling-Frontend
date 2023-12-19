// App.js
import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

import { Home, Authentication } from "./pages";
import { useAuth } from "./contexts/authContext";

const App = () => {

  const { user, setUser, isLogged, setLogged } = useAuth();

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    const localLogin = localStorage.getItem("login");

    if (localUser && !localUser.includes("undefined")) {
      setUser(JSON.parse(localUser));
      setLogged(localLogin);
    }

  }, []);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    
    if (localUser) {
      const exp = jwtDecode(JSON.parse(localUser)?.token)?.expires;
      if (exp * 1000 < Date.now()) { logout(); }
    }
  }, []);

  const logout = () => {
    setLogged(false);
    localStorage.clear();
    window.location.reload();
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={user?.email ? <Home /> : <Navigate to="/authentication" />} />
        <Route path="/authentication" element={user?.email ? <Navigate to="/" /> : <Authentication />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

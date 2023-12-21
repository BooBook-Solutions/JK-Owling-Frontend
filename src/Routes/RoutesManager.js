import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import { useAuthContext } from "../Components/Context/AuthContext";

import Home from "../Pages/Home"; 
import Authentication from "../Pages/Authentication";
import Profile from "../Pages/Profile";
import Dashboard from "../Pages/Dashboard";

const RoutesManager = () => {

  const { authState } = useAuthContext();

  return (
    <>  
    <Routes>
        <Route path="/" element={<Home />} />

        { !authState.isAuth ? (
          <Route path="/authentication" element={<Authentication />} /> 
        ) : (
          <Route path="/authentication" element={<Navigate to="/" />} /> 
        )
        }

        <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute>} />

        { authState.isAuth && authState.user?.roles.includes("admin") && <Route path="/dashboard" element={<Dashboard />} />}

    </Routes>
    </>
  );
};

export default RoutesManager;

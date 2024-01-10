import React from "react";
import { Routes, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import AuthRoute from "./AuthRoute";

import Home from "../Pages/Home"; 
import Authentication from "../Pages/Authentication";
import Profile from "../Pages/Profile";
import Order from "../Pages/Order";
import Dashboard from "../Pages/Dashboard";
import ErrorPage from "../Pages/ErrorPage";
import Catalogue from "../Pages/Catalogue";
import Book from "../Pages/Book";

const RoutesManager = () => {

    return (
        <>  
        <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/authentication" element={<AuthRoute> <Authentication /> </AuthRoute> }/> 

            <Route path="/catalogue" element={<Catalogue />} />

            <Route path="/catalogue/:id" element={<Book />} />

            <Route path="/profile" element={ <PrivateRoute> <Profile /> </PrivateRoute>} />

            <Route path="/orders" element={ <PrivateRoute> <Order /> </PrivateRoute>} />

            <Route path="/dashboard" element={<AdminRoute> <Dashboard /> </AdminRoute>} />

            <Route path="*" element={<ErrorPage eCode={404} eText={"Page not found"} />} />
            
        </Routes>
        </>
    );
};

export default RoutesManager;

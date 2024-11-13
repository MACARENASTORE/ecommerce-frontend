// src/components/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children, adminOnly = false }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Loading...</p>;
    if (!user) return <Navigate to="/login" />;

    // Si `adminOnly` es true y el usuario no es administrador, redirigir al inicio
    if (adminOnly && user.role !== 'admin') {
        return <Navigate to="/" />;
    }

    return children;
};

export default PrivateRoute;

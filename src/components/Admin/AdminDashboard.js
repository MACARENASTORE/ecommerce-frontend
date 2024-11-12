// src/components/Admin/AdminDashboard.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminDashboard = () => {
    const { user } = useContext(AuthContext); // Accede al usuario autenticado del contexto
    const navigate = useNavigate();

    // Verificar si el usuario es administrador
    if (!user || user.role !== 'admin') {
        // Redirigir si no es administrador
        navigate('/'); 
        return null;
    }

    return (
        <div>
            <h1>Panel de Administración</h1>
            <p>Bienvenido, {user.username}. Desde aquí puedes gestionar todos los recursos.</p>
            <ul>
                <li><Link to="/admin/products">Gestionar Productos</Link></li>
                <li><Link to="/admin/suppliers">Gestionar Proveedores</Link></li>
                <li><Link to="/admin/invoices">Gestionar Facturas</Link></li>
                <li><Link to="/admin/users">Gestionar Usuarios</Link></li>
            </ul>
        </div>
    );
};

export default AdminDashboard;


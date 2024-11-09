// src/components/Admin/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div>
            <h1>Panel de Administración</h1>
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

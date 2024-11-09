// src/components/navbar/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext); // Obtener 'user' y 'logout' del contexto
    const navigate = useNavigate();

    // Función para cerrar sesión
    const handleLogout = () => {
        logout();
        navigate('/');  // Redirigir al inicio
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">MacarenaStore</Link>
            <ul className="nav-links">
                {/* Mostrar opciones de inicio de sesión y registro si el usuario no está autenticado */}
                {!user ? (
                    <>
                        <li><Link to="/login">Iniciar sesión</Link></li>
                        <li><Link to="/register">Registro</Link></li>
                    </>
                ) : (
                    <>
                        {/* Mostrar enlaces de productos, carrito y perfil si el usuario está autenticado */}
                        <li><Link to="/products">Productos</Link></li>
                        <li><Link to="/cart">Carrito</Link></li>
                        <li><Link to="/profile">Perfil</Link></li>
                        
                        {/* Mostrar enlaces de administración solo si el usuario es admin */}
                        {user.role === 'admin' && (
                            <>
                                <li><Link to="/admin">Panel de Administración</Link></li>
                                <li><Link to="/admin/products">Gestionar Productos</Link></li>
                                <li><Link to="/admin/suppliers">Gestionar Proveedores</Link></li>
                                <li><Link to="/admin/invoices">Gestionar Facturas</Link></li>
                                <li><Link to="/admin/users">Gestionar Usuarios</Link></li>
                            </>
                        )}
                        
                        <li><button onClick={handleLogout} className="logout-button">Cerrar sesión</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

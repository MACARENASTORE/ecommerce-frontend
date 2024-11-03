// src/components/navbar/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './Navbar.css';  // Archivo CSS para estilos

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">MacarenaStore</Link>
            <ul className="nav-links">
                {!user ? (
                    <>
                        <li><Link to="/login">Iniciar sesión</Link></li>
                        <li><Link to="/register">Registro</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/products">Productos</Link></li>
                        <li><Link to="/cart">Carrito</Link></li>
                        <li><Link to="/profile">Perfil</Link></li>
                        <li><button onClick={handleLogout} className="logout-button">Cerrar sesión</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

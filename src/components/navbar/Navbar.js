// src/components/navbar/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [adminMenuOpen, setAdminMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery}`);
            setSearchQuery('');
        }
    };

    const toggleAdminMenu = () => {
        setAdminMenuOpen(!adminMenuOpen);
    };

    const closeAdminMenu = () => {
        setAdminMenuOpen(false); // Cierra el menú cuando se selecciona un enlace
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">MacarenaStore</Link>
            <form onSubmit={handleSearch} className="search-form">
                <input
                    type="text"
                    placeholder="Buscar productos..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>
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
                        {user.role === 'admin' && (
                            <li className="admin-menu">
                                <button onClick={toggleAdminMenu} className="admin-button">
                                    Administración
                                </button>
                                {adminMenuOpen && (
                                    <ul className="admin-dropdown" onClick={closeAdminMenu}>
                                        <li><Link to="/admin">Panel de Administración</Link></li>
                                        <li><Link to="/admin/products">Gestionar Productos</Link></li>
                                        <li><Link to="/admin/suppliers">Gestionar Proveedores</Link></li>
                                        <li><Link to="/admin/invoices">Gestionar Facturas</Link></li>
                                        <li><Link to="/admin/users">Gestionar Usuarios</Link></li>
                                    </ul>
                                )}
                            </li>
                        )}
                        <li><button onClick={handleLogout} className="logout-button">Cerrar sesión</button></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

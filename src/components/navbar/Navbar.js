// src/components/navbar/Navbar.js
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [accountMenuOpen, setAccountMenuOpen] = useState(false);
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

    const toggleAccountMenu = () => {
        setAccountMenuOpen(!accountMenuOpen);
    };

    const toggleAdminMenu = () => {
        setAdminMenuOpen(!adminMenuOpen);
    };

    const closeMenus = () => {
        setAccountMenuOpen(false);
        setAdminMenuOpen(false);
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

                        {/* Menú de Cuenta del usuario */}
                        <li className="account-menu">
                            <button onClick={toggleAccountMenu} className="account-button">
                                {`Hola, ${user.username}`} {/* Saludo personalizado */}
                            </button>
                            {accountMenuOpen && (
                                <ul className="account-dropdown" onClick={closeMenus}>
                                    <li><Link to="/profile">Perfil</Link></li>
                                    <li><Link to="/orders">Mis Órdenes</Link></li>
                                    <li><button onClick={handleLogout} className="logout-button">Cerrar sesión</button></li>
                                </ul>
                            )}
                        </li>

                        {/* Menú de Administración solo para el rol de admin */}
                        {user.role === 'admin' && (
                            <li className="admin-menu">
                                <button onClick={toggleAdminMenu} className="admin-button">
                                    Administración
                                </button>
                                {adminMenuOpen && (
                                    <ul className="admin-dropdown" onClick={closeMenus}>
                                        <li><Link to="/admin">Panel de Administración</Link></li>
                                        <li><Link to="/admin/products">Gestionar Productos</Link></li>
                                        <li><Link to="/admin/suppliers">Gestionar Proveedores</Link></li>
                                        <li><Link to="/admin/invoices">Gestionar Facturas</Link></li>
                                        <li><Link to="/admin/orders">Gestor de Órdenes</Link></li>
                                        <li><Link to="/admin/users">Gestionar Usuarios</Link></li>
                                    </ul>
                                )}
                            </li>
                        )}
                    </>
                )}
            </ul>

            {/* Botón de WhatsApp */}
            <a
                href="https://wa.me/573106469827" // Reemplaza con el número de teléfono
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-button"
            >
                Contactar en WhatsApp
            </a>
        </nav>
    );
};

export default Navbar;

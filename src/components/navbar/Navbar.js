// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Inicio</Link>
                </li>
                {isAuthenticated ? (
                    <>
                        <li>
                            <Link to="/profile">Perfil</Link>
                        </li>
                        <li>
                            <button onClick={onLogout}>Cerrar Sesión</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/login">Iniciar Sesión</Link>
                        </li>
                        <li>
                            <Link to="/register">Registrarse</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;

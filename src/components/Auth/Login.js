// src/components/Auth/Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3009/api/auth/login', {
                email,
                password,
            });
            setMessage(response.data.message);
            localStorage.setItem('token', response.data.token);
            onLogin(); // Cambia el estado de autenticación
        } catch (error) {
            setMessage(error.response.data.message || 'Error al iniciar sesión');
        }
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Iniciar Sesión</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default Login;

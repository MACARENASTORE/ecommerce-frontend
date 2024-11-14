// src/components/Auth/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/AuthForm.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3009/api/auth/register', {
                username,
                email,
                password,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(error.response.data.message || 'Error al registrar');
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Registro</h2>
                <input 
                    type="text" 
                    placeholder="Nombre de usuario" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Correo" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Registrar</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default Register;

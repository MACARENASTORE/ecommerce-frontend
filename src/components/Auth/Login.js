import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../services/authService';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/AuthForm.css';

const Login = () => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const { authenticateUser } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await authLogin(credentials);
            if (response.token) {
                await authenticateUser(response);
                navigate('/products');
            } else {
                setError('Credenciales incorrectas');
            }
        } catch (err) {
            setError('Error en el inicio de sesión');
            console.error("Error en el inicio de sesión:", err);
        }
    };

    return (
        <div className="auth-container">
            <form onSubmit={handleSubmit} className="auth-form">
                <h2>Iniciar Sesión</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Correo"
                    onChange={handleChange}
                    value={credentials.email}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    onChange={handleChange}
                    value={credentials.password}
                    required
                />
                <button type="submit">Ingresar</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Login;

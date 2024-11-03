// src/components/Auth/Login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { login as authLogin } from '../../services/authService';
import AuthContext from '../../context/AuthContext';

const Login = () => {
   const [credentials, setCredentials] = useState({ email: '', password: '' });
   const [error, setError] = useState('');
   const { authenticateUser } = useContext(AuthContext);  // Llamar a authenticateUser
   const navigate = useNavigate();

   const handleChange = (e) => {
       setCredentials({ ...credentials, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
       e.preventDefault();
       try {
           const response = await authLogin(credentials);
           if (response.token) {
               authenticateUser(response);  // Autenticar usuario con datos obtenidos
               localStorage.setItem('token', response.token);  // Guardar token en localStorage
               navigate('/products');  // Redirigir a la página de productos
           } else {
               setError('Credenciales incorrectas');
           }
       } catch (err) {
           setError('Error en el inicio de sesión');
       }
   };

   return (
       <form onSubmit={handleSubmit}>
           <h2>Iniciar Sesión</h2>
           <input
               type="email"
               name="email"
               placeholder="Correo"
               onChange={handleChange}
               value={credentials.email}
           />
           <input
               type="password"
               name="password"
               placeholder="Contraseña"
               onChange={handleChange}
               value={credentials.password}
           />
           <button type="submit">Ingresar</button>
           {error && <p>{error}</p>}
       </form>
   );
};

export default Login;

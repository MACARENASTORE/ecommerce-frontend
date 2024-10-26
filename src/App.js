import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Profile from './components/Profile';
import { useContext } from 'react';
import AuthContext from './context/AuthContext';

const App = () => {
    const { isAuthenticated, logout } = useContext(AuthContext);

    return (
        <Router>
            <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/profile" element={
                        <PrivateRoute isAuthenticated={isAuthenticated}>
                            <Profile />
                        </PrivateRoute>
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;

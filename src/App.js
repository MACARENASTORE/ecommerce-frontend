import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Invoices from './pages/Invoices';
import Orders from './pages/Orders';
import Profile from './pages/Profile';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import Navbar from './components/navbar/Navbar';
import PrivateRoute from './components/PrivateRoute';  // Componente para rutas privadas
import AdminDashboard from './pages/AdminDashboard';  // Página principal del panel de administración
import ManageProducts from './pages/ManageProducts';  // Manejo de productos en el panel admin
import ManageSuppliers from './pages/ManageSuppliers'; // Manejo de proveedores
import ManageInvoices from './pages/ManageInvoices'; // Manejo de facturas
import ManageUsers from './pages/ManageUsers'; // Manejo de usuarios
import { AuthProvider } from './context/AuthContext';  // Importa AuthProvider para envolver las rutas

function App() {
    return (
        <AuthProvider>
            <Router>
                <Navbar />
                <Routes>
                    {/* Rutas públicas */}
                    <Route path="/" element={<Home />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/invoices" element={<Invoices />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    
                    {/* Rutas del panel de administración, protegidas */}
                    <Route 
                        path="/admin" 
                        element={<PrivateRoute><AdminDashboard /></PrivateRoute>} 
                    />
                    <Route 
                        path="/admin/products" 
                        element={<PrivateRoute><ManageProducts /></PrivateRoute>} 
                    />
                    <Route 
                        path="/admin/suppliers" 
                        element={<PrivateRoute><ManageSuppliers /></PrivateRoute>} 
                    />
                    <Route 
                        path="/admin/invoices" 
                        element={<PrivateRoute><ManageInvoices /></PrivateRoute>} 
                    />
                    <Route 
                        path="/admin/users" 
                        element={<PrivateRoute><ManageUsers /></PrivateRoute>} 
                    />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;

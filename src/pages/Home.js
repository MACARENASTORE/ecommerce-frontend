// src/pages/Home.js
import React from 'react';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <h1>Bienvenido a MacarenaStore</h1>
            <p>Explora nuestros productos y encuentra lo que necesitas.</p>

            <div className="category-links">
                <Link to="/products" className="button">Ver Todos los Productos</Link>
                <Link to="/categories" className="button">Explorar Categorías</Link>
            </div>

            <ProductCarousel /> {/* Carrusel de productos destacados */}
        </div>
    );
};

export default Home;

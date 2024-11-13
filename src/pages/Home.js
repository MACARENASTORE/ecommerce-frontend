// src/pages/Home.js
import React from 'react';
import ProductCarousel from '../components/ProductCarousel';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
    return (
        <div className="home">
            <div className="home-header">
                <h1>Bienvenido a MacarenaStore</h1>
                <p>Encuentra los mejores productos en nuestra tienda.</p>
            </div>

            <div className="category-links">
                <Link to="/products" className="button primary-button">Ver Todos los Productos</Link>
                <Link to="/categories" className="button secondary-button">Explorar Categorías</Link>
            </div>

            <div className="home-featured">
                <ProductCarousel />
            </div>

            <div className="home-categories">
                <h2>Categorías Destacadas</h2>
                <div className="category-cards">
                    {/* Añade enlaces a categorías aquí */}
                    <Link to="/category/electronics" className="category-card">Electrónica</Link>
                    <Link to="/category/fashion" className="category-card">Moda</Link>
                    <Link to="/category/home" className="category-card">Hogar</Link>
                    <Link to="/category/beauty" className="category-card">Belleza</Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

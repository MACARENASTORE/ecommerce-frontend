// src/pages/SearchResults.js
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { searchProducts } from '../services/productService';
import '../styles/SearchResults.css';

const SearchResults = () => {
    const [products, setProducts] = useState([]);
    const location = useLocation();

    // Extraer el término de búsqueda de la URL
    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const results = await searchProducts(query);
                setProducts(results);
            } catch (error) {
                console.error("Error al obtener resultados de búsqueda:", error);
            }
        };

        if (query) {
            fetchSearchResults();
        }
    }, [query]);

    return (
        <div className="search-results-container">
            <h1>Resultados de búsqueda para "{query}"</h1>
            {products.length > 0 ? (
                <div className="product-list">
                    {products.map((product) => (
                        <div key={product._id} className="product-card">
                            <img src={product.image[0] || 'placeholder.jpg'} alt={product.name} />
                            <h2>{product.name}</h2>
                            <p>{product.description}</p>
                            <span>${product.price}</span>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No se encontraron productos.</p>
            )}
        </div>
    );
};

export default SearchResults;

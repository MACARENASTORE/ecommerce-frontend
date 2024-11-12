// src/components/ProductCarousel.js
import React, { useEffect, useState } from 'react';
import { fetchFeaturedProducts } from '../services/productService';
import '../styles/ProductCarousel.css';

const ProductCarousel = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const loadProducts = async () => {
            const data = await fetchFeaturedProducts();
            setProducts(data);
        };
        loadProducts();
    }, []);

    return (
        <div className="product-carousel">
            <h2>Productos Destacados</h2>
            <div className="carousel-container">
                {products.map((product) => (
                    <div key={product._id} className="carousel-item">
                        <img src={product.image[0]} alt={product.name} />
                        <h3>{product.name}</h3>
                        <p>${product.price}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductCarousel;


// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { addToCart } from '../services/cartService';
import '../components/Product/ProductList.css'; // Asegúrate de tener este archivo CSS

const Products = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };
        getProducts();
    }, []);

    // Mantén solo una versión de handleAddToCart
    const handleAddToCart = async (productId) => {
        try {
            await addToCart(productId); // Realiza la llamada al servicio
            alert('Producto agregado al carrito');
        } catch (error) {
            alert('No se pudo agregar el producto al carrito. Inténtalo de nuevo.');
            console.error("Error en handleAddToCart:", error);
        }
    };

    return (
        <div className="products-container">
            <h2>Productos</h2>
            <div className="product-list">
                {products.map(product => (
                    <div key={product._id} className="product-card">
                        <img src={product.image[0]} alt={product.name} className="product-image" />
                        <h3>{product.name}</h3>
                        <p>Precio: ${product.price}</p>
                        <button onClick={() => handleAddToCart(product._id)}>Agregar al carrito</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Products;

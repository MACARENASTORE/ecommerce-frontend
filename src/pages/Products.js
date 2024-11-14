// src/pages/Products.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import { fetchCategoryWithProducts } from '../services/categoryService';
import { addToCart } from '../services/cartService';
import { useLocation } from 'react-router-dom';
import '../styles/ProductList.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({});
    const location = useLocation();
    const categoryId = new URLSearchParams(location.search).get('category');

    useEffect(() => {
        const getProducts = async () => {
            try {
                if (categoryId) {
                    const data = await fetchCategoryWithProducts(categoryId);
                    setProducts(data.products);
                } else {
                    const allProducts = await fetchProducts();
                    setProducts(allProducts);
                }
            } catch (error) {
                console.error('Error al obtener productos:', error);
                setProducts([]);
            }
        };
        getProducts();
    }, [categoryId]);

    const handleAddToCart = async (productId, quantity) => {
        try {
            await addToCart({ productId, quantity });
            alert('Producto agregado al carrito');
        } catch (error) {
            alert('No se pudo agregar el producto al carrito. Inténtalo de nuevo.');
            console.error("Error en handleAddToCart:", error);
        }
    };

    const handleQuantityChange = (productId, value) => {
        setQuantities({ ...quantities, [productId]: Math.max(1, value) });
    };

    return (
        <div className="products-container">
            <h2>Productos</h2>
            <div className="product-list">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.image[0]} alt={product.name} className="product-image" />
                            <h3>{product.name}</h3>
                            <p>Precio: ${product.price}</p>
                            <p>Descuento: {product.discount}%</p>
                            <p>Estado: {product.status}</p>
                            <p>Stock disponible: {product.stock}</p>
                            <input
                                type="number"
                                min="1"
                                max={product.stock}
                                value={quantities[product._id] || 1}
                                onChange={(e) => handleQuantityChange(product._id, parseInt(e.target.value))}
                            />
                            <button 
                                onClick={() => handleAddToCart(product._id, quantities[product._id] || 1)}
                                disabled={(quantities[product._id] || 1) > product.stock}
                            >
                                Agregar al carrito
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No se encontraron productos en esta categoría.</p>
                )}
            </div>
        </div>
    );
};

export default Products;

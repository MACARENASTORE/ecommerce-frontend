// src/pages/Cart.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Replace useHistory with useNavigate
import { getCart, updateCartItem, removeCartItem } from '../services/cartService';
import '../styles/Cart.css';


const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartData = await getCart();
                setCartItems(Array.isArray(cartData.products) ? cartData.products : []);
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
                setCartItems([]);
            }
        };
        fetchCartItems();
    }, []);

    const handleQuantityChange = async (productId, quantity) => {
        if (quantity < 1) return;
        try {
            await updateCartItem(productId, quantity);
            setCartItems(cartItems.map(item =>
                item.productId && item.productId._id === productId
                    ? { ...item, quantity }
                    : item
            ));
        } catch (error) {
            console.error('Error al actualizar la cantidad:', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await removeCartItem(productId);
            setCartItems(cartItems.filter(item => item.productId && item.productId._id !== productId));
        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
        }
    };

    return (
        <div className="cart-container">
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item) =>
                        item.productId ? (
                            <div key={item.productId._id} className="cart-item">
                                <img src={item.productId.image} alt={item.productId.name} className="cart-item-image" />
                                <div className="cart-item-details">
                                    <p><strong>Producto:</strong> {item.productId.name}</p>
                                    <p><strong>Precio:</strong> ${item.price}</p>
                                    <div className="cart-item-quantity">
                                        <label>Cantidad:</label>
                                        <input
                                            type="number"
                                            value={item.quantity}
                                            onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                                            min="1"
                                        />
                                    </div>
                                    <button className="remove-button" onClick={() => handleRemoveItem(item.productId._id)}>
                                        Eliminar
                                    </button>
                                </div>
                            </div>
                        ) : null
                    )}
                </div>
            )}
            {cartItems.length > 0 && (
                <button className="checkout-button" onClick={() => navigate('/checkout')}>
                    Proceder a Comprar
                </button>
            )}
        </div>
    );
};

export default Cart;

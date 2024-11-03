// src/pages/Cart.js
import React, { useEffect, useState } from 'react';
import { getCart } from '../services/cartService';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartData = await getCart();
                // Si `cartData.products` no es un array, configura `cartItems` como un array vacío
                setCartItems(Array.isArray(cartData.products) ? cartData.products : []);
            } catch (error) {
                console.error('Error al obtener el carrito:', error);
                setCartItems([]); // Configurar un array vacío en caso de error
            }
        };
        fetchCartItems();
    }, []);

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío</p>
            ) : (
                cartItems.map((item) => (
                    <div key={item.productId._id}>
                        <p>Producto: {item.productId.name}</p>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio: ${item.price}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default Cart;

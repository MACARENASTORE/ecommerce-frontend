// src/components/Cart/CartList.js
import React, { useEffect, useState } from 'react';
import { getCart } from '../../services/cartService';

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCartItems = async () => {
            const data = await getCart();
            setCartItems(data.products);
        };
        loadCartItems();
    }, []);

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                cartItems.map(item => (
                    <div key={item.productId._id}>
                        <h3>{item.productId.name}</h3>
                        <p>Cantidad: {item.quantity}</p>
                        <p>Precio: ${item.productId.price}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default CartList;

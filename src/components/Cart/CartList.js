import React, { useEffect, useState } from 'react';
import { getCart, updateCartItem, removeCartItem } from '../../services/cartService';

const CartList = () => {
    const [cartItems, setCartItems] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const loadCartItems = async () => {
            try {
                const data = await getCart();
                setCartItems(data.products);
            } catch (error) {
                setErrorMessage("Error al cargar el carrito. Por favor, inténtelo de nuevo.");
            }
        };
        loadCartItems();
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
            console.error('Error al actualizar cantidad:', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await removeCartItem(productId);
            setCartItems(cartItems.filter(item => item.productId && item.productId._id !== productId));
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
        }
    };

    return (
        <div>
            <h2>Carrito de Compras</h2>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {cartItems.length === 0 ? (
                <p>El carrito está vacío.</p>
            ) : (
                <div>
                    {cartItems.map(item => item.productId && (
                        <div key={item.productId._id}>
                            <h3>{item.productId.name}</h3>
                            <p>Precio: ${item.productId.price}</p>
                            <p>Cantidad: 
                                <input 
                                    type="number" 
                                    value={item.quantity} 
                                    onChange={(e) => handleQuantityChange(item.productId._id, parseInt(e.target.value))}
                                />
                            </p>
                            <button onClick={() => handleRemoveItem(item.productId._id)}>
                                Eliminar del carrito
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartList;

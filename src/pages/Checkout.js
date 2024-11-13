import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCart } from '../services/cartService';
import { createOrder } from '../services/orderService';
import '../styles/Checkout.css';

const Checkout = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });
    const [paymentMethod, setPaymentMethod] = useState('credit_card');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const cartData = await getCart();
                const items = Array.isArray(cartData.products) ? cartData.products : [];
                setCartItems(items);

                const total = items.reduce((acc, item) => 
                    item && item.productId ? acc + item.price * item.quantity : acc, 0
                );
                setTotalAmount(total);
            } catch (error) {
                console.error('Error al obtener los productos del carrito:', error);
            }
        };

        fetchCartItems();
    }, []);

    const handleAddressChange = (e) => {
        const { name, value } = e.target;
        setShippingAddress((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setPaymentMethod(e.target.value);
    };

    const handlePlaceOrder = async () => {
        setLoading(true);
        setErrorMessage('');
        try {
            await createOrder({
                shippingAddress,
                paymentMethod,
            });
            alert('Orden realizada exitosamente');
            navigate('/orders');
        } catch (error) {
            console.error('Error al crear la orden:', error);
            setErrorMessage(error.response?.data?.message || 'Error desconocido al procesar la orden.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="checkout-container">
            <h2>Resumen de Compra</h2>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {cartItems.length === 0 ? (
                <p>No tienes productos en el carrito.</p>
            ) : (
                <div>
                    <div className="checkout-items">
                        {cartItems.map((item) => 
                            item && item.productId ? (
                                <div key={item.productId._id} className="checkout-item">
                                    <img src={item.productId.image} alt={item.productId.name} className="checkout-item-image" />
                                    <div className="checkout-item-details">
                                        <p><strong>{item.productId.name}</strong></p>
                                        <p>Precio: ${item.price}</p>
                                        <p>Cantidad: {item.quantity}</p>
                                        <p>Total: ${item.price * item.quantity}</p>
                                    </div>
                                </div>
                            ) : null
                        )}
                    </div>
                    <div className="checkout-summary">
                        <h3>Total a Pagar: ${totalAmount.toFixed(2)}</h3>

                        <h3>Dirección de Envío</h3>
                        <form className="shipping-form">
                            <div>
                                <label>Nombre Completo:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={shippingAddress.name}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Dirección:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={shippingAddress.address}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Ciudad:</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={shippingAddress.city}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>Código Postal:</label>
                                <input
                                    type="text"
                                    name="postalCode"
                                    value={shippingAddress.postalCode}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                            <div>
                                <label>País:</label>
                                <input
                                    type="text"
                                    name="country"
                                    value={shippingAddress.country}
                                    onChange={handleAddressChange}
                                    required
                                />
                            </div>
                        </form>

                        <h3>Método de Pago</h3>
                        <div className="payment-method">
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="credit_card"
                                    checked={paymentMethod === 'credit_card'}
                                    onChange={handlePaymentMethodChange}
                                />
                                Tarjeta de Crédito
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="paypal"
                                    checked={paymentMethod === 'paypal'}
                                    onChange={handlePaymentMethodChange}
                                />
                                PayPal
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="paymentMethod"
                                    value="bank_transfer"
                                    checked={paymentMethod === 'bank_transfer'}
                                    onChange={handlePaymentMethodChange}
                                />
                                Transferencia Bancaria
                            </label>
                        </div>

                        <button className="place-order-button" onClick={handlePlaceOrder} disabled={loading}>
                            {loading ? 'Procesando...' : 'Confirmar Compra'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Checkout;

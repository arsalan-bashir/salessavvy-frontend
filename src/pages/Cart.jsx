import { useEffect, useState } from 'react'
import LoadingIcon from '@mui/icons-material/RefreshRounded';
import ErrorIcon from '@mui/icons-material/Error';
import Navbar from "./components/Navbar";
import CartItems from "./components/CartItems";
import { useNavigate } from "react-router-dom";

export default function Cart() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [cartItems, setCartItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchCartItems();
    },[]);

    
    const fetchCartItems = async () => {
        try {
            const response = await fetch("http://localhost:9090/api/cart/items", {
                credentials: 'include',
            });

            if(!response.ok) throw new Error("Failed to fetch cart items");

            const data = await response.json();

            setUser(data.user);
            setCartItems(data.cart)

            const totalItems = data.cart.products.reduce((total, item) => total + item.quantity, 0);
            setCartCount(totalItems);
        }
        catch(err) {
            setError("Error Fetching Cart Items--> "+ err);
        }
        finally {
            setLoading(false);
        }
    }

    const handleUpdateCart = async (product_id, quantity) => {
        if(!quantity) {
            deleteCartItem(product_id);
        }
        else {
            updateCartItem(product_id, quantity);
        }
    }

    const deleteCartItem = async (product_id) => {
        try {
            const response = await fetch("http://localhost:9090/api/cart/delete", {
                method: "DELETE",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    username: user.username,
                    productId: product_id
                })
            });

            if(response.ok) {
                fetchCartItems();
            }
            else {
                setError("Failed to delete item from Cart")
            }
        }
        catch(err) {
            setError("Error Deleting Cart Item--> "+ err);
        }
    }

    const updateCartItem = async (product_id, quantity) => {
        try {
            const response = await fetch("http://localhost:9090/api/cart/update", {
                method: "PUT",
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    },
                body: JSON.stringify({
                    username: user.username,
                    productId: product_id,
                    quantity: quantity
                })
            });
            if(response.ok) {
                fetchCartItems();
            }
            else {
                setError("Failed to update quantity of the cart item!!")
            }
        }
        catch(err) {
            setError("Error in quantity update:-->> "+err)
        }
    }

    const handleCheckout = async (totalAmount) => {
        try {
            const requestBody = {
                totalAmount: totalAmount,
                cartItems: cartItems.products.map((item) => ({
                    productId: item.product_id,
                    quantity: item.quantity,
                    pricePerUnit: item.price_per_unit,
                    totalPrice: item.total_price
                })),
            };

            const response = await fetch("http://localhost:9090/api/payment/create", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(requestBody)
            });

            if(!response.ok) {
                setError("Status: --> "+await response.text())
            }

            const razorpayOrderId = await response.text()

            const options = {
                key: import.meta.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: totalAmount * 100,
                currency: "INR",
                name: "SalesSavvy",
                description: "Test Payment for your cart items",
                order_id: razorpayOrderId,
                handler: async function(response) {
                    try {
                        const verifyResponse = await fetch("http://localhost:9090/api/payment/verify", {
                            method: "POST",
                            headers: { 'Content-Type': 'application/json' },
                            credentials: 'include',
                            body: JSON.stringify({
                                razorpayOrderId: response.razorpay_order_id,
                                razorpayPaymentId: response.razorpay_payment_id,
                                razorpaySignature: response.razorpay_signature,
                            }),
                        });

                        const result = await verifyResponse.text();
                        if(verifyResponse.ok) {
                            alert("Payment Verified Successfully:: Order Placed")
                            navigate('/customerHome')
                        }
                        else {
                            setError("Payment Verification Failed:: " + result)
                        }
                    }
                    catch(err) {
                        setError("Error Verifying Payment:: "+err)
                    }
                },
                prefill: {
                    name: user.username,
                    email: user.email,
                    contact: user.phone,
                },
                theme: {
                    color: '#777bff',
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        }
        catch(err) {
            setError("Error while creating order: "+err)
        }
    };

    return (
        <>
            <Navbar 
                user={user} 
                count={cartCount} />

            <div className="main-container">
                <div className="dashboard-container">
                    {error ? (
                        <div className="error-container">
                            <ErrorIcon sx={{ fontSize: 80, color: 'red' }} />
                            <h4>{error}</h4>
                        </div>
                    ) : loading ? (
                        <div className="loading-container">
                            <LoadingIcon 
                                className="spinner"
                                sx={{ fontSize: 60, color: '#777bff' }}
                            />
                        </div>
                    ) : (
                        <CartItems cartItems={cartItems} 
                            functions = {{
                                handleUpdateCart: handleUpdateCart,
                                handleCheckout: handleCheckout
                            }}
                             />
                    )}
                </div>
            </div>
        </>
    );
}
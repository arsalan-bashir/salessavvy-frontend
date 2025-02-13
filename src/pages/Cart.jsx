import { useEffect, useState } from 'react'
import LoadingIcon from '@mui/icons-material/RefreshRounded';
import ErrorIcon from '@mui/icons-material/Error';
import Navbar from "./components/Navbar";
import CartItems from "./components/CartItems";
import { useLocation } from "react-router-dom";

export default function Cart() {

    const location = useLocation();
    const fetchProducts = location.state?.fetchProducts;
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
        //dummy code
    }

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
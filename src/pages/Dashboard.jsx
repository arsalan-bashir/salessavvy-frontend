import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import CategoryNav from "./components/CategoryNavigation";
import ProductList from "./components/ProductList";
import LoadingIcon from '@mui/icons-material/RefreshRounded';
import ErrorIcon from '@mui/icons-material/Error';
import "../assets/styles.css";

export default function Dashboard() {
    const [username, setUsername] = useState("")
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(0)
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCartLoading, setIsCartLoading] = useState(true);
    const [cartError, setCartError] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetchProducts();
        if (username) {
          fetchCartCount();
        }
      }, [username]);

    const fetchProducts = async (category = '') => {
        try {
            const response = await fetch(`http://localhost:9090/api/products${category ? `?category=${category}` : ''}`, 
                { credentials: "include" })
                .then(response => {
                    if (!response.ok) {
                        alert("HTTP error! Status: ${response.status}");
                    }
                    return response.json();
                })
                .then(data => {
                    setUser(data.user || "Guest");
                    setUsername(data.user.username)
                    setProducts(data.products || []);
                    setCategories(data.categories || []);
                    setLoading(false);
                });
        }
        catch(err) {
            setError(err.message);
            setLoading(false);
        };
    }

    const fetchCartCount = async () => {
        setIsCartLoading(true)
        try {
            const response = await fetch(`http://localhost:9090/api/cart/items/count?username=${username}`, {
                credentials: 'include',
            });

            const count = await response.json();
            setCartCount(count)
            setCartError(false)
        }
        catch(err) {
            setCartError(true);
            alert("Error fetching cart count: "+ err);
        }
        finally {
            setIsCartLoading(false)
        }
    };

    const handleCategoryClick = (category) => {
        fetchProducts(category)
    }

    const handleAddToCart = async (productId) => {

        if(!username) {
            alert("Username issues!!");
            return;
        }

        try {
            const response = await fetch("http://localhost:9090/api/cart/add", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                    credentials: 'include',
                    body: JSON.stringify({ productId, username })
            })
            if(response.ok) {
                fetchCartCount();
            }
            else {
                alert("Failed to add product to cart");
            }
        } 
        catch(err) {
            alert("Error adding to cart: "+ err);
        } 
    };

    return (
        <>
            <Navbar 
                user={user} 
                count={cartCount} />

            <div className="main-container">
                <div className="dashboard-container">
                    <CategoryNav 
                        categories={categories} 
                        onCategoryClick={handleCategoryClick} />
                        
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
                        <ProductList 
                            products={products} 
                            onAddToCart={handleAddToCart} />
                    )}
                </div>
                
            </div>
        </>
    );
}

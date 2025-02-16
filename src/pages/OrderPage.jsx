import { useEffect, useState } from 'react'
import LoadingIcon from '@mui/icons-material/RefreshRounded';
import ErrorIcon from '@mui/icons-material/Error';
import Navbar from "./components/Navbar";
import Navigator from './components/Navigator';
import CartItems from "./components/CartItems";
import { useNavigate, useLocation } from "react-router-dom";

export default function Cart() {
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [cartCount, setCartCount] = useState(location.state?.count || 0);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {

        fetchOrders();
    },[]);

    
    const fetchOrders = async () => {
        try {
            setLoading(true)
            const response = await fetch("http://localhost:9090/api/orders", {
                credentials: 'include',
            });
            if(response.ok) {
                const data = await response.json()
                setUser(data.user);
                if(data.orders.length === 0) {
                    setOrders([])
                    setError("No order placed yet!!")
                    return;
                }
                setOrders(data.orders)
            }
            else {
                setError("Unable to fetch orders right now!! ::: " + await response.text())
            }
        }
        catch(err) {
            setError("Error fetching orders ::: "+err)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <>
            <Navbar 
                user={user} 
                count={cartCount} />

            <div className="main-container">
                <div className="dashboard-container">
                    <Navigator />
                    <div className="orders-container">
                    <h2>ORDERS</h2>
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
                        orders.map((order) => (
                            <div key={order.product_id} className="orders-list">
                                <div className="order-img">
                                    <img src={order.image_url} alt={order.name} />
                                </div>
                                <div className="order-info">
                                    <div className="order-detail">
                                        <h4>Order ID:</h4> 
                                        <h5>{order.order_id}</h5>
                                    </div>
                                    <div className="order-detail">
                                        <h4>Name:</h4>
                                        <h5>{order.name}</h5>
                                    </div>
                                    <div className="order-detail">
                                        <h4>Quantity:</h4> 
                                        <h5>{order.quantity}</h5>
                                    </div>
                                    <div className="order-detail">
                                        <h4>Description:</h4> 
                                        <h5>{order.description}</h5>
                                    </div>
                                    <div className="order-detail">
                                        <h4>Price per Unit:</h4> 
                                        <h5>&#8377;{order.price_per_unit}</h5>
                                    </div>
                                    <div className="order-detail">
                                        <h4>Total Price:</h4> 
                                        <h5>&#8377;{order.total_price}</h5>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                    </div>
                </div>
            </div>
        </>
    );
}
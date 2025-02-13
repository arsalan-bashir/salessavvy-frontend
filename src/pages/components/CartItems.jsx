import { useEffect, useState } from "react";
import DeleteIcon from '@mui/icons-material/DeleteForever';
import Navigator from "./Navigator";
import Button from '@mui/material/Button';

export default function CartItems({ cartItems, functions }) {
    const {handleUpdateCart, handleCheckout } = functions
    const [shipping, setShipping] = useState(0)
    const [totalAmount, setTotalAmount] = useState(0)
    useEffect(() => {
        if(cartItems) {
            setShipping(parseFloat(cartItems.overall_total_price * 0.001).toFixed(2))
            setTotalAmount(parseFloat(cartItems.overall_total_price + shipping).toFixed(2))
        }
    },[cartItems]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => {
        setLoading(false);
        }, 2000);
        return () => clearTimeout(timeout);
    });

    const handleCheckoutClick = (totalAmount) => {
        setLoading(true)
        setTimeout(() => {
            handleCheckout(totalAmount)
        }, 2000);
    }

    return (
        <div className="cart-container">
            <div className="item-container">
                <div className="items-heading">
                    <Navigator />
                    <h3>Shopping Cart</h3>
                    <p>You have {cartItems.products.length} items in your cart</p>
                </div>
                <div className="items-list">
                    {cartItems.products.map((item) => (
                        <div key={item.product_id} className="cart-item">
                            <div className="cart-item-image">
                                <img src={item.image_url} alt={item.name} />
                            </div>
                            <div className="cart-item-info" >
                                <h4>{item.product_name}</h4>
                                <p>{item.description}</p>
                                <h5>&#8377;{item.price_per_unit}</h5>
                            </div>
                            <div className="cart-item-controls">
                                <div className="quantity-controls">
                                    <button 
                                        className="minus-btn"
                                        onClick={() => handleUpdateCart(item.product_id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <h5>{item.quantity}</h5>
                                    <button 
                                        onClick={() => handleUpdateCart(item.product_id, item.quantity + 1)}
                                        className="plus-btn">
                                            +
                                    </button>
                                </div>
                                <div className="total-control">
                                    <h5>&#8377;{parseFloat(item.total_price).toFixed(2)}</h5>
                                    <button 
                                        onClick={() => handleUpdateCart(item.product_id)}
                                        className="remove-btn">
                                            <DeleteIcon />
                                        </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                </div>
            </div>
            <div className="summary-container">
                <h3>Order Summary</h3>
                <div className="summary-subtotal">
                    <p>Subtotal</p>
                    <p>&#8377;{parseFloat(cartItems.overall_total_price).toFixed(2)}</p>
                </div>
                <div className="summary-shipping">
                    <p>Shipping</p>
                    <p>&#8377;{shipping}</p>
                </div>
                <div className="summary-products">
                    <p>Total Products</p>
                    <p>{cartItems.products.length}</p>
                </div>
                <div className="summary-total">
                    <h4>Total</h4>
                    <h4>&#8377;{totalAmount}</h4>
                </div>
                <div className="summary-checkout">
                <Button 
                    variant="contained"
                    color="secondary"
                    className="checkout-btn"
                    onClick={() => handleCheckoutClick(totalAmount)} 
                    loading={loading}
                        >
                    Proceed To Checkout
                </Button>
                </div>
            </div>
        </div>
    )
}
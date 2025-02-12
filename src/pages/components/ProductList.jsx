import React from "react"
import "../../assets/styles.css";

export default function ProductList({ products, onAddToCart }) {
    return (
        <div className="product-container">
            {products.map((product) => (

                <div key={product.product_id} className="product-card">
                    <div className="image-box">
                        <img 
                            className="product-img"
                            loading="lazy"
                            src={product.images[0]}
                            alt={product.name + " Image"}>
                        </img>
                        <p className="product-desc">{product.description}</p>
                    </div>
                    <div className="product-info">
                        <h3>{product.name}</h3>
                        <p>&#8377;{product.price}</p>
                    </div>
                    <button
                        className="add-to-cart-btn"
                        onClick={() => onAddToCart(product.product_id)}
                    >
                        Add to Cart
                    </button>
                </div>

            ))}
            
        </div>
    )
}
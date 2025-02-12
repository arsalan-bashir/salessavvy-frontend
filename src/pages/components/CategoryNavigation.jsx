import React from "react"
import "../../assets/styles.css";

export default function CategoryNavigation({ categories, onCategoryClick }) {
    return (
        <nav className="category-nav">
            <ul className="category-list">
                {categories.map((category, index) => (
                    <li 
                        key={index}
                        className="category-item"
                        onClick={() => onCategoryClick(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>
        </nav>
    )
}
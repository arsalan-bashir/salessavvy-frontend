import React from "react"
import "../../assets/styles.css";
import NavIcon from '@mui/icons-material/ArrowBackRounded';

export default function Navigator() {

    const handleNavigator = () => {
        alert("AWWW!! Never Look Back")
    }
    return (
        <nav className="navigate-back">
            <div onClick={handleNavigator}>
                <NavIcon fontSize="medium" /> Continue Shopping
            </div>
        </nav>
    )
}
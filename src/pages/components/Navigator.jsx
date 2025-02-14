import React from "react"
import "../../assets/styles.css";
import NavIcon from '@mui/icons-material/ArrowBackRounded';
import { useNavigate } from "react-router-dom";

export default function Navigator() {

    const navigate = useNavigate();

    const handleNavigator = () => {
        navigate('/customerHome')
    }
    return (
        <nav className="navigate-back">
            <div onClick={handleNavigator}>
                <NavIcon fontSize="medium" /> Continue Shopping
            </div>
        </nav>
    )
}
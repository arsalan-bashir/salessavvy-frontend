import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"
import Cart from "./pages/Cart"
import OrderPage from "./pages/OrderPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customerHome" element={<Dashboard />} />
            <Route path="/adminHome" element={<AdminDashboard />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrderPage />} />
        </Routes>
    );
}

export default AppRoutes;
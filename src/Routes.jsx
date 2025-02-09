import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import Dashboard from "./pages/Dashboard"
import AdminDashboard from "./pages/AdminDashboard"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/customerHome" element={<Dashboard />} />
            <Route path="/adminHome" element={<AdminDashboard />} />
        </Routes>
    );
}

export default AppRoutes;
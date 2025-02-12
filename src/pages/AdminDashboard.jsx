import { useLocation } from "react-router-dom";
import "../assets/styles.css";

export default function AdminDashboard() {
    //const location = useLocation();
    //const user = location.state;
    return (
        <>
            <div className="main-container">
                <div className="dashboard-container">
                    <h1>Hello </h1>
                    <h2>Welcome to Admin Dashboard</h2>
                </div>  
            </div>
        </>
    );
}
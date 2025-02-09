import {useNavigate} from "react-router-dom";
import { useState } from "react";
import "../assets/styles.css";

const LoginPage = () => {
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [error,setError]=useState("")
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault()
        setError(null)

        if(!username.trim() || !password.trim()) {
            setError("Username and Password are required");
            return;
        }

        try {
            const response = await fetch("http://localhost:9090/api/auth/login", {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, password}),
                });

            const data = await response.json();

            if (response.ok) {
                if(data.role === "CUSTOMER") {
                    navigate("/customerHome", { state: data });
                }
                else if(data.role === "ADMIN") {
                    navigate("/adminHome", { state: data });
                }
                else {
                    alert("Invalid Role")
                    navigate("/login");
                }
            } else {
                setError(data.error || "Login failed");
            }
        }
        catch (err) {
            setError("Something went wrong");
        }
    };

    return (
        <div className="form-container">
            <h1>LOGIN</h1>
            <form className="login-form" onSubmit={handleLogin}>
                <label className="login-label" htmlFor="username">Username</label>
                <input type='text'
                       id="username"
                       value={username}
                       className="login-input"
                       onChange = {(event) => setUsername(event.target.value)}
                       placeholder='Enter Username' />
                <label className="login-label" htmlFor="password">Password</label>
                <input type='password'
                       id="password"
                       value={password}
                       className="login-input"
                       onChange = {(event) => setPassword(event.target.value)}
                       placeholder='Password' />
                <button
                    type='submit'
                    className="login-button">
                    Login
                </button>
            </form>
            <a className="login-redirect" href="/register">New User? Register here!</a>
            {error && <p className="login-error">{error}</p>}
        </div>
    );
}

export default LoginPage;
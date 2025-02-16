import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
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
                credentials: "include",
                body: JSON.stringify({username, password}),
                });

            const data = await response.json();

            if (response.ok) {
                if(data.role === "ADMIN") {
                    navigate("/adminHome", {state: {username: username}});
                }
                else {
                    alert("Invalid Role")
                    navigate("/");
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
        <div className="admin-container">
            <div className="form-container AdminLogin">
                <h1>ADMIN</h1>
                <form className="login-form admin-form" onSubmit={handleLogin}>
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
                        <hr></hr>
                    <button
                        type='submit'
                        className="login-button">
                        Login
                    </button>
                    <button
                        type=''
                        className="login-button home-button"
                        onClick={()=> navigate('/')}>
                        Home
                    </button>
                </form>
                <a className="login-redirect" href="/login">Not Admin? Login here!</a>
                {error && <p className="login-error">{error}</p>}
            </div>
        </div>
    );
}

export default AdminLogin;
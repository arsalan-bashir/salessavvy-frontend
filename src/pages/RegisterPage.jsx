import React, { useState } from "react";
import {useNavigate} from "react-router-dom";

const RegisterPage = () => {

    const [fullname,setName]=useState("")
    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")
    const [email,setEmail]=useState("")
    const [phone,setPhone]=useState("")
    const [age,setAge]=useState("")
    const [role,setRole]=useState("CUSTOMER")
    const [error,setError]=useState("")
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await fetch("http://localhost:9090/api/users/register",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    fullname, username,
                    password, email,
                    phone, age, role })
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message)
                navigate("/");
            }
            else {
                setError(data.error || "Registration failed")
            }
        }
        catch(err){
            alert(err);
            setError("Something went wrong");
        }
    }

    return (
        <div className="register-container">
            <h1>REGISTER</h1>
            <form className="form-box register-form" onSubmit={handleRegister}>
                <div className="item-group">
                    <div className="form-group">
                        <label className="login-label" htmlFor="name">Name</label>
                        <input type='text'
                               id="name"
                               value={fullname}
                               className="login-input"
                               onChange = {(event) => setName(event.target.value)}
                               placeholder='Enter Name' required />
                    </div>
                    <div className="form-group">
                        <label className="login-label" htmlFor="username">Username</label>
                        <input type='text'
                               id="username"
                               value={username}
                               className="login-input"
                               onChange = {(event) => setUsername(event.target.value)}
                               placeholder='Enter Username' required />
                    </div>
                </div>
                <div className="item-group">
                    <div className="form-group">
                        <label className="login-label" htmlFor="password">Password</label>
                        <input type='password'
                               id="password"
                               value={password}
                               className="login-input"
                               onChange = {(event) => setPassword(event.target.value)}
                               placeholder='Enter Password' required />
                    </div>
                    <div className="form-group">
                        <label className="login-label" htmlFor="email">Email</label>
                        <input type='email'
                               id="email"
                               value={email}
                               className="login-input"
                               onChange = {(event) => setEmail(event.target.value)}
                               placeholder='Enter Email' required />
                    </div>
                </div>
                <div className="item-group">
                    <div className="form-group">
                        <label className="login-label" htmlFor="phone">Phone</label>
                        <input type='text'
                        id="phone"
                        value={phone}
                        className="login-input"
                        onChange = {(event) => setPhone(event.target.value)}
                        placeholder='Enter Phone' required />
                    </div>
                    <div className="form-group">
                        <label className="login-label" htmlFor="age">Age</label>
                        <input type='number'
                        id="age"
                        value={age}
                        min="0"
                        step="1"
                        className="login-input"
                        onChange = {(event) => setAge(event.target.value)}
                        placeholder='Enter Age' required />
                    </div>
                    <div className="form-group">
                        <label className="login-label" htmlFor="role">Role</label>
                        <select
                               id="role"
                               className="login-input"
                               onChange = {(event) => setRole(event.target.value)}
                               required >
                            <option value="CUSTOMER">Customer</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>
                </div>
                <button
                    type='submit'
                    className="register-button">
                    Register
                </button>
            </form>
            <a className="register-redirect" href="/">Existing User? Login here!</a>
            {error && <p className="register-error">{error}</p>}
        </div>
    )
}

export default RegisterPage;
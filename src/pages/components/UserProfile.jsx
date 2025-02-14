import { React, useEffect, useState } from "react";

function UserProfile() {
    const [userId, setUserId] = useState();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [updatedAt, setUpdatedAt] = useState("");
    const [error, setError] = useState("")
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            const response = await fetch('http://localhost:9090/api/auth/profile', {
                credentials: 'include',
            });
            if(!response.ok) {
                const errorMessage = await response.text();
                setError(errorMessage);
                return;    
            }
            const data = await response.json();
            setUserId(data.userId);
            setUsername(data.username);
            setName(data.fullname);
            setEmail(data.email);
            setPhone(data.phone);
            setAge(data.age);
            setCreatedAt(data.createdAt);
            setUpdatedAt(data.updatedAt);
        }
        catch(err) {
            setError("Failed to load user profile. Please try again later.");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch("http://localhost:9090/api/auth/profile/update", {
                method: "PUT",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    },
                body: JSON.stringify({
                    "username": username,
                    "fullname": name,
                    "email": email,
                    "phone": phone,
                    "age": parseInt(age)
                }), 
            });

            if(response.ok) {
                await fetchUserProfile(); 
                setSuccess(true);
            }
            else {
                setError("Failed to update profile ::: "+ await response.text())
            }
        }
        catch(err) {
            setError("Failed to update profile. Please try again later. "+err);
            }
    };

    const handleReset = () => {
        
    };

    return (
        <div className="UserProfile">
            {error && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "red",
                        fontSize: "18px",
                    }}
                >
                    <div>
                        <h3>{error}</h3>
                    </div>
                </div>
            )}

            {!error && (
            <fieldset style={{ border: "none" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" value={username} disabled />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="userId">User ID</label>
                            <input type="text" id="userId" value={userId} disabled />
                        </div>
                    </div>
                    
                    <label htmlFor="name">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter Full Name"
                        required
                    />
                    
                    <label htmlFor="email">Enter Email </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email Address"
                        required
                    />
                    
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Phone number"
                        required
                    />
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                value={age}
                                min="0"
                                step="1"
                                onChange={(e) => setAge(e.target.value)}
                                required
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="role">Role</label>
                            <input
                                type="text"
                                id="role"
                                value={"role"}
                                disabled
                            />
                        </div>
                    </div>
                    
                    <div style={{ display: "flex", gap: "10px" }}>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="createdAt">Created At</label>
                            <input type="text" id="createdAt" value={createdAt} disabled />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label htmlFor="updatedAt">Updated At</label>
                            <input type="text" id="updatedAt" value={updatedAt} disabled />
                        </div>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-evenly", gap: "10px" }}>
                        <button type="reset" onClick={handleReset}>Reset</button>
                        <button type="submit">Save</button>
                    </div>
                </form>
                {success && (
                <p style={{textAlign: 'center', color: 'green'}}>Profile Update Successfull</p>
                )}
            </fieldset>
            )}
        </div>
    );
}

export default UserProfile;

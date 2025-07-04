import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "USER"
    });

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:8080/api/auth/register", user);
            alert("Registered Successfully! with Id" + res.id);
            console.log(res.data);
            navigate('/login');

        } catch (err) {
            console.error("Registration Error", err);
            alert("Registration failed!");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label>Name:</label>
                    <input name="name" className="form-control" value={user.name} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Email:</label>
                    <input name="email" type="email" className="form-control" value={user.email} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Password:</label>
                    <input name="password" type="password" className="form-control" value={user.password} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label>Role:</label>
                    <select name="role" className="form-control" value={user.role} onChange={handleChange}>
                        <option value="STUDENT">Student</option>
                        <option value="INSTRUCTOR">Instructor</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;

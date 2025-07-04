import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

const LoginForm = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    api.post("/auth/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    )
      .then(res => {
        const user = res.data;
        console.log("Logged in user:", user);
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/courses");
      })
      .catch(err => {
        console.error("Login error:", err);
        alert("Invalid email or password");
      });

  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
     
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;

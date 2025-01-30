import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      localStorage.setItem("email", formData.email);
      navigate("/Details");
    } catch (error) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="Full">
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        {error && <p className="error-message">{error}</p>}
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Password" />
        <button type="submit">Login</button>
        <p>New user? <button  className="Regbutton" type="button" onClick={() => navigate("/Register")}>Register</button></p>
      </form>
    </div>
    </div>
  );
};

export default Login;

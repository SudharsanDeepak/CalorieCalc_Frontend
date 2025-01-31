import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await axios.post("https://caloriecalc-backend.onrender.com/api/register", formData);
      navigate("/");
    } catch (error) {
      setError("Registration failed! Email might already be in use.");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        {error && <p className="error-message">{error}</p>}
        <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="Full Name" />
        <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="Email" />
        <input type="password" name="password" value={formData.password} onChange={handleInputChange} required placeholder="Password" />
        <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required placeholder="Confirm Password" />
        <button type="submit">Register</button>
        <p>Already have an account? <button type="button" onClick={() => navigate("/")}>Login</button></p>
      </form>
    </div>
  );
};

export default Register;

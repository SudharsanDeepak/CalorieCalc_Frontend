import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Details.css';
import Navbar from '../Components/Navbar';
const Details = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: 'sedentary',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/Calculate', { state: formData });
  };

  return (<>
  <Navbar />
    
    <div className="DetailsDiv">
      
      <div className="FormDiv">
        <h1>Details</h1>
        <form onSubmit={handleSubmit} className="details-form">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="age">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="weight">Weight (kg):</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (cm):</label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="activityLevel">Activity Level:</label>
            <select
              id="activityLevel"
              name="activityLevel"
              value={formData.activityLevel}
              onChange={handleInputChange}
              required
            >
              <option value="sedentary">Sedentary</option>
              <option value="light">Light</option>
              <option value="moderate">Moderate</option>
              <option value="active">Active</option>
              <option value="veryActive">Very Active</option>
            </select>
          </div>
          <button type="submit" className="calculate-btn">Calculate</button>
        </form>
      </div>
    </div>
    </>
  );
};

export default Details;

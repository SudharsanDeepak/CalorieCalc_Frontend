import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import './Calculate.css';
import Navbar from '../Components/Navbar';

const Calculate = () => {
  const location = useLocation();
  const formData = location.state;
  const [saved, setSaved] = useState(false);

  const calculateCalories = () => {
    const { age, weight, height, activityLevel } = formData;
    const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    const multipliers = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    return Math.round(bmr * (multipliers[activityLevel] || 1.2));
  };

  const calculateWaterIntake = () => {
    const { weight, height } = formData;
    const baseWater = weight * 0.035;
    const heightAdjustment = height > 170 ? 0.5 : height > 150 ? 0.3 : 0.2;
    return Math.round((baseWater + heightAdjustment) * 1000) / 1000;
  };

  const calculateOtherMetrics = () => {
    const { weight } = formData;
    return {
      proteinIntake: Math.round(weight * 0.8),
      fiberIntake: Math.round((14 / 1000) * calculateCalories()),
    };
  };

  const calories = calculateCalories();
  const waterIntake = calculateWaterIntake();
  const { proteinIntake, fiberIntake } = calculateOtherMetrics();

  const saveToHistory = async () => {
    try {
      const userEmail = localStorage.getItem("email");
      if (!userEmail) {
        console.error("User not logged in.");
        return;
      }
  
      await axios.post("http://localhost:5000/api/history", {
        userEmail,
        name: formData.name,
        age: formData.age,
        weight: formData.weight,
        height: formData.height,
        activityLevel: formData.activityLevel,
        calories,
        waterIntake,
        proteinIntake,
        fiberIntake,
      });
  
      setSaved(true);
    } catch (error) {
      console.error("Error saving history:", error);
    }
  };
  
  return (
    
   <>
   <Navbar/>
    <div className="calculate-container">
      
      <h1>Health Metrics</h1>
      <div className="data-container">
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Age:</strong> {formData.age} years</p>
        <p><strong>Weight:</strong> {formData.weight} kg</p>
        <p><strong>Height:</strong> {formData.height} cm</p>
        <p><strong>Activity Level:</strong> {formData.activityLevel}</p>
        <hr />
        <h2>Results</h2>
        <p><strong>Estimated Daily Calorie Needs:</strong> {calories} kcal</p>
        <p><strong>Recommended Water Intake:</strong> {waterIntake} liters/day</p>
        <p><strong>Recommended Protein Intake:</strong> {proteinIntake} g/day</p>
        <p><strong>Recommended Fiber Intake:</strong> {fiberIntake} g/day</p>
        <button onClick={saveToHistory} disabled={saved} className="save-btn">
          {saved ? 'Saved' : 'Save to History'}
        </button>
      </div>
    </div>
    </>
  );
};

export default Calculate;

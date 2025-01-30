import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './History.css';
import Navbar from '../Components/Navbar';

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("email");
    if (!userEmail) {
      navigate("/login");
    }
  
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/history/${userEmail}`);
        setHistory(response.data);
      } catch (error) {
        console.error("Error fetching history:", error);
      }
    };
  
    fetchHistory();
  }, [navigate]);
  
  return (
  <>
  <Navbar />
    <div className="history-container">
      
      <h1>History</h1>
      {history.length === 0 ? (
        <p>No history found</p>
      ) : (
        <ul className='history-entry'>
          {history.map((entry) => (
            <div key={entry._id}>
              <p><strong>Name:</strong> {entry.name}</p>
              <p><strong>Calories:</strong> {entry.calories}</p>
              <p><strong>Water Intake:</strong> {entry.waterIntake}</p>
              <p><strong>Protein Intake:</strong> {entry.proteinIntake}</p>
              <p><strong>Fiber Intake:</strong> {entry.fiberIntake}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default History;

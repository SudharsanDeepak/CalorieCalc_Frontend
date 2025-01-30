import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Details from './Requirements/Details';
import Calculate from './Requirements/Calculate';
import History from './Requirements/History';
import Login from './Requirements/Login';
import Register from "./Requirements/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/Details" element={<Details />} />
        <Route path="/Calculate" element={<Calculate />} />
        <Route path="/History" element={<History />} />
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

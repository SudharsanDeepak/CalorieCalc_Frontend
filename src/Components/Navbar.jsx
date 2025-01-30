import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className="Navi">
      <h1 className='NavHead'>MENU</h1>
      <nav>
        <ul>
          <Link to="/Details">Details</Link><br /><br />
          <Link to="/History">History</Link><br /><br />
          <Link to='/'>Logout</Link>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
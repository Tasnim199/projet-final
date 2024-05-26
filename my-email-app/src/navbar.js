
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://raw.githubusercontent.com/Madflows/gmail-navbar/869c744fce21fa5d60c39bc95249b231711395c2/logo.svg"
          alt="Google logo"
        />
        <span>Gmail</span>
      </div>

      <div className="search">
        <span className="material-symbols-outlined"> search </span>
        <input type="text" placeholder="Search mail" />
      </div>

      <nav>
        <button className="material-symbols-outlined">
          <Link to="/login">Login</Link>
        </button>
        <button className="material-symbols-outlined">
          <Link to="/register">Register</Link>
        </button>

        <img
          src="https://th.bing.com/th/id/OIP.iiO09Agba_CeJ881dKMzYQHaGW?w=183&h=180&c=7&r=0&o=5&pid=1.7"
          alt="madflows"
        />
      </nav>
    </nav>
  );
};

export default Navbar;

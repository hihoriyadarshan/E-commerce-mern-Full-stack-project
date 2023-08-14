// Header.js
import React from "react";
import { Link } from "react-router-dom"; // If using React Router
import logo from "../../../images/logo.png";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo-container">
        <Link to="/">
          <img src={logo} alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/products">Products</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/profile" >Profile</Link>
        <Link to="/login">Login</Link>

      </nav>
    </header>
  );
};

export default Header;

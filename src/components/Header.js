import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="container-fluid flex-nowrap">
          <Link to="#" className="navbar-brand">
            Logo
          </Link>
          <div className="navbar-collapse">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <Link className="d-flex btn btn-outline-primary singupBtn" to="/">
            Sign up
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;

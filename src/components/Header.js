import React from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthState";

import "./Header.css";

const Header = () => {
  const { user } = useAuthContext();

  const logout = () => {
    if (user) {
      console.log("log out");
    }
  };

  return (
    <div className="header">
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
                <Link to="/books" className="nav-link">
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className="nav-link">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {user && (
            <Link to="/user" className="header__user">
              Hello, {user.name}
            </Link>
          )}
          <Link className="header__link d-flex " to={!user ? "/signin" : "#"}>
            <div onClick={logout} className="header__linkOption">
              <span>{user ? "Sign Out" : "Sign In"}</span>
            </div>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;

import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/auth/AuthState";
import { useBookContext } from "../context/book/BookState";

import "./Header.css";

const Header = () => {
  const location = useLocation();
  const history = useHistory();
  const [theme, setTheme] = useState("");
  const { basket } = useBookContext();
  const { user, logout, isLogged, logoutSuccess } = useAuthContext();

  useEffect(() => {
    if (location.pathname === "/") {
      setTheme("light");
    } else {
      setTheme("");
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isLogged && logoutSuccess) {
      history.push("/");
    }
  }, [isLogged, logoutSuccess]);

  return (
    <div className={`header ${theme}`}>
      <nav className="navbar">
        <div className="container-fluid flex-nowrap">
          <Link to="#" className={`navbar-brand ${theme}`}>
            Logo
          </Link>
          <div className="navbar-collapse">
            <ul className="nav">
              <li className="nav-item">
                <Link to="/" className={`nav-link ${theme}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/books" className={`nav-link ${theme}`}>
                  Books
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/authors" className={`nav-link ${theme}`}>
                  Authors
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/signup" className={`nav-link ${theme}`}>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {Object.keys(user).length > 0 && (
            <Link to="/user" className={`header__user ${theme}`}>
              Hello, {user.given_name}
            </Link>
          )}
          {Object.keys(user).length === 0 ? (
            <Link className={`header__link d-flex ${theme}`} to="/signin">
              <div className={`header__linkOption ${theme}`}>
                <span>Sign In</span>
              </div>
            </Link>
          ) : (
            <Link className={`header__link d-flex ${theme}`} to="#">
              <div
                onClick={() => logout()}
                className={`header__linkOption ${theme}`}
              >
                <span>Sign Out</span>
              </div>
            </Link>
          )}
          <Link className={`header__basket ${theme}`} to="/user/basket">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="header__basketIcon bi bi-cart-fill"
              viewBox="0 0 16 16"
            >
              <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z" />
            </svg>
            {basket.length > 0 ? (
              <span className="header__basketCount">{basket.length}</span>
            ) : (
              <span className="header__basketCount hide">0</span>
            )}
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Header;

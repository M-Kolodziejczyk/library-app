import React, { useEffect, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useAuthContext } from "../../context/auth/AuthState";
import { useBookContext } from "../../context/book/BookState";

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

    //eslint-disable-next-line
  }, [isLogged, logoutSuccess]);

  return (
    <div className={`header ${theme}`}>
      <nav className="navbar">
        <div className="container-fluid flex-nowrap header__container">
          <Link to="/" className={`navbar-brand ${theme}`}>
            <svg
              id="Layer_1"
              viewBox="0 0 512 512"
              xmlns="http://www.w3.org/2000/svg"
              className={`navbar-brand-icon ${theme}`}
            >
              <path d="m512 154.73c0-14.147-11.495-25.657-25.624-25.657h-8.266c-7.887-11.481-12.046-24.867-12.046-38.879s4.159-27.398 12.047-38.88h8.265c32.977 0 33.203-51.314 0-51.314h-294.421c-9.697 0-9.697 15 0 15h294.421c13.297 0 13.901 21.314 0 21.314h-396.335c-29.662 0-53.793 24.17-53.793 53.88 0 29.709 24.132 53.879 53.793 53.879h396.335c13.553 0 13.683 22.149 0 22.149h-64.417-331.918c-19.936 0-38.756-7.965-52.993-22.427-14.218-14.441-22.048-33.478-22.048-53.601 0-41.462 33.663-75.194 75.041-75.194h61.952c9.697 0 9.697-15 0-15h-61.952c-49.649 0-90.041 40.461-90.041 90.194 0 24.085 9.361 46.858 26.358 64.125 4.439 4.509 9.258 8.478 14.372 11.903h-15.106c-14.129.001-25.624 11.51-25.624 25.659 0 14.147 11.495 25.657 25.624 25.657h8.265c7.888 11.481 12.047 24.866 12.047 38.879s-4.159 27.398-12.047 38.88h-8.265c-14.129 0-25.624 11.51-25.624 25.657s11.495 25.657 25.624 25.657h14.753c-24.314 16.167-40.377 43.835-40.377 75.195 0 49.733 40.392 90.194 90.041 90.194h396.335c32.977 0 33.203-51.315 0-51.315h-8.266c-7.887-11.481-12.046-24.867-12.046-38.879s4.159-27.397 12.046-38.879h8.266c32.977 0 33.203-51.315 0-51.315h-14.753c24.314-16.168 40.377-43.836 40.377-75.195s-16.063-59.027-40.377-75.194h14.753c13.89 0 25.624-12.132 25.624-26.493zm-460.752-64.536c0-21.438 17.403-38.88 38.793-38.88h370.578c-6.277 11.929-9.555 25.157-9.555 38.88 0 13.722 3.278 26.95 9.554 38.879h-370.577c-21.391 0-38.793-17.441-38.793-38.879zm.133 127.344h370.578c21.391 0 38.793 17.441 38.793 38.879s-17.403 38.88-38.793 38.88h-33.501v-31.38h17.927c9.697 0 9.697-15 0-15h-258.299c-9.697 0-9.697 15 0 15h159.497v31.38h-256.202c6.277-11.929 9.555-25.157 9.555-38.88s-3.279-26.95-9.555-38.879zm271.202 46.379h50.875v130.279l-19.648-18.981c-2.87-2.773-7.408-2.812-10.327-.091l-20.899 19.494v-130.701zm-296.959 67.694c-5.858 0-10.624-4.781-10.624-10.657s4.766-10.657 10.624-10.657h281.959v21.314zm434.995 129.074h-90.619c-9.697 0-9.697 15 0 15h116.376c13.297 0 13.901 21.315 0 21.315h-396.335c-41.378 0-75.041-33.732-75.041-75.194s33.663-75.194 75.041-75.194h217.542v21.315h-217.542c-29.662 0-53.793 24.17-53.793 53.879s24.132 53.879 53.793 53.879h239.934c9.697 0 9.697-15 0-15h-239.934c-21.391 0-38.793-17.441-38.793-38.879s17.403-38.879 38.793-38.879h217.542v28.943c0 6.43 7.914 9.871 12.616 5.484l28.309-26.405 27.239 26.314c4.782 4.624 12.711 1.018 12.711-5.394v-28.943h72.161c-6.276 11.929-9.554 25.156-9.554 38.879s3.278 26.951 9.554 38.88zm25.757-114.074c13.298 0 13.901 21.315 0 21.315h-97.918v-21.315h33.501zm10.624-90.194c0 41.462-33.663 75.194-75.041 75.194h-33.501v-21.314h33.501c29.662 0 53.793-24.17 53.793-53.88 0-29.709-24.132-53.879-53.793-53.879h-396.335c-5.858 0-10.624-4.781-10.624-10.657 0-5.877 4.766-10.658 10.624-10.658h64.417 331.918c41.378 0 75.041 33.732 75.041 75.194z" />
            </svg>
            <span>Library</span>
          </Link>
          <div className="navbar-collapse">
            <ul className="nav nav-container">
              <li className="nav-item nav-container-item">
                <Link to="/" className={`nav-link nav-container-link ${theme}`}>
                  Home
                </Link>
              </li>
              <li className="nav-item nav-container-item">
                <Link
                  to="/books"
                  className={`nav-link nav-container-link ${theme}`}
                >
                  Books
                </Link>
              </li>
              <li className="nav-item nav-container-item">
                <Link
                  to="/authors"
                  className={`nav-link nav-container-link ${theme}`}
                >
                  Authors
                </Link>
              </li>
            </ul>
          </div>
          <div className="header__containerUser">
            <div className="header__containerUserContent">
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
            </div>
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
        </div>
      </nav>
    </div>
  );
};

export default Header;

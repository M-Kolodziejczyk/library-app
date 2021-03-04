import React, { useEffect } from "react";
import MyDetails from "./componets/MyDetails";
import AddBook from "./componets/AddBook";
import AddAuthor from "./componets/AddAuthor";
import MyBooks from "./componets/MyBooks";
import { useAuthContext } from "../../context/auth/AuthState";
import { useBookContext } from "../../context/book/BookState";
import "./UserPage.css";

const UserPage = () => {
  const { group, user } = useAuthContext();
  const { getUserOrders, orders } = useBookContext();

  useEffect(() => {
    if (user) {
      getUserOrders(user.email);
    }
  }, [user]);

  return (
    <div className="userPage">
      <h1>User Page</h1>
      <div className="userPage__container">
        <div className="userPage__nav">
          <ul className="nav nav-pills flex-column" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <a
                className="userPage__navLink active"
                id="myDetails-tab"
                data-bs-toggle="pill"
                href="#myDetails"
                role="tab"
                aria-controls="myDetails"
                aria-selected="true"
              >
                My Details
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="userPage__navLink"
                id="myBooks-tab"
                data-bs-toggle="pill"
                href="#myBooks"
                role="tab"
                aria-controls="myBooks"
                aria-selected="false"
              >
                My Books
              </a>
            </li>
            <li className="nav-item" role="presentation">
              <a
                className="userPage__navLink"
                id="settings-tab"
                data-bs-toggle="pill"
                href="#settings"
                role="tab"
                aria-controls="settings"
                aria-selected="false"
              >
                Settings
              </a>
            </li>

            {group && group.includes("Admin") && (
              <li className="nav-item" role="presentation">
                <a
                  className="userPage__navLink"
                  id="addBook-tab"
                  data-bs-toggle="pill"
                  href="#addBook"
                  role="tab"
                  aria-controls="addBook"
                  aria-selected="false"
                >
                  Add Book
                </a>
              </li>
            )}
            {group && group.includes("Admin") && (
              <li className="nav-item" role="presentation">
                <a
                  className="userPage__navLink"
                  id="addAuthor-tab"
                  data-bs-toggle="pill"
                  href="#addAuthor"
                  role="tab"
                  aria-controls="addAuthor"
                  aria-selected="false"
                >
                  Add Author
                </a>
              </li>
            )}
          </ul>
        </div>
        <div className="userPage__content">
          <div className="tab-content">
            <div
              className="tab-pane fade show active"
              id="myDetails"
              role="tabpanel"
              aria-labelledby="myDetails-tab"
            >
              <MyDetails />
            </div>
            <div
              className="tab-pane fade"
              id="myBooks"
              role="tabpanel"
              aria-labelledby="myBooks-tab"
            >
              <div className="userPage__myBooksHeader">
                <p className="userPage__myBooksHeaderId">ID:</p>
                <p className="userPage__myBooksHeaderDate">Date:</p>
                <p className="userPage__myBooksHeaderStatus">Status:</p>
              </div>
              {orders.length > 0 ? (
                orders.map((order, id) => (
                  <MyBooks key={order.id} order={order} id={id} />
                ))
              ) : (
                <p className="myBooksTab__empty">No orders</p>
              )}
            </div>
            <div
              className="tab-pane fade tab-settings"
              id="settings"
              role="tabpanel"
              aria-labelledby="settings-tab"
            >
              <h2>Settings</h2>
            </div>
            {group && group.includes("Admin") && (
              <div
                className="tab-pane fade"
                id="addBook"
                role="tabpanel"
                aria-labelledby="addBook-tab"
              >
                <AddBook />
              </div>
            )}
            {group && group.includes("Admin") && (
              <div
                className="tab-pane fade"
                id="addAuthor"
                role="tabpanel"
                aria-labelledby="addAuthor-tab"
              >
                <AddAuthor />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

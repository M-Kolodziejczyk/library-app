import React from "react";
import "./UserPage.css";

const UserPage = () => {
  return (
    <div className="userPage">
      <div className="userPage__container container-xl">
        <h1>User Page</h1>

        <div className="row">
          <div className="col-3">
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
            </ul>
          </div>
          <div className="col-9 userPage__content">
            <div className="tab-content">
              <div
                className="tab-pane fade show active"
                id="myDetails"
                role="tabpanel"
                aria-labelledby="myDetails-tab"
              >
                <h2>My Details</h2>
              </div>
              <div
                className="tab-pane fade"
                id="myBooks"
                role="tabpanel"
                aria-labelledby="myBooks-tab"
              >
                <h2>My Books</h2>
              </div>
              <div
                className="tab-pane fade"
                id="settings"
                role="tabpanel"
                aria-labelledby="settings-tab"
              >
                <h2>Settings</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;

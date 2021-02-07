import React from "react";
import "./AuthorsPage.css";
import Author from "./components/Author";

const AuthorsPage = () => {
  return (
    <div className="authorsPage">
      <div className="container-xl">
        <div className="row">
          <div className="col-3">
            <h3>Nav</h3>
          </div>
          <div className="col-9 authorsPage__content">
            <h1>Authors</h1>
            <Author />
            <Author />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;

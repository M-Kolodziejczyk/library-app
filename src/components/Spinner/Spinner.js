import React from "react";
import "./Spinner.css";

const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <div className="spinner__modal"></div>
    </div>
  );
};

export default Spinner;

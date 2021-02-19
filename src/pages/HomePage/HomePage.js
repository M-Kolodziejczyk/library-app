import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { API, Storage } from "aws-amplify";
import * as mutations from "../../api/mutations";
import * as queries from "../../api/queries";

const HomePage = () => {
  const handleClick = async e => {
    e.preventDefault();

    try {
      const res = await API.graphql({
        variables: { id: "501e5bb0-1f60-4057-9477-5499ab305765" },
        query: queries.getCustomer
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="homePage">
      <h1>Home Page</h1>
      <button onClick={handleClick}>click</button>
    </div>
  );
};

export default HomePage;

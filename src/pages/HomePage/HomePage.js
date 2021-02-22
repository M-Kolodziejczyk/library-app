import React, { useState, useEffect } from "react";
import "./HomePage.css";
import { API, Storage } from "aws-amplify";
import { useBookContext } from "../../context/book/BookState";
import * as mutations from "../../api/mutations";
import * as queries from "../../api/queries";

const HomePage = () => {
  const { createOrder } = useBookContext();

  const handleClick = async e => {
    e.preventDefault();

    try {
      const res = await API.graphql({
        variables: { id: "c7d8691a-7e19-45c8-a8dc-af55157a9c14" },
        query: queries.getCustomer
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClickMutation = async e => {
    e.preventDefault();
    const date = new Date();
    const order = {
      customerID: "c7d8691a-7e19-45c8-a8dc-af55157a9c14",
      status: "New",
      date: date
    };
    createOrder(order);
  };

  return (
    <div className="homePage">
      <h1>Home Page</h1>
      <button onClick={handleClick}>click</button>
      <button onClick={handleClickMutation}>Create Mutation</button>
    </div>
  );
};

export default HomePage;

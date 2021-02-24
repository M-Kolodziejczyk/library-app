import React from "react";
import { format } from "date-fns";
import { Link, useHistory } from "react-router-dom";
import "./MyBooks.css";

const MyBooks = ({ id, date, status }) => {
  return (
    <div className="myBooks">
      <Link to="/" className="myBooks__id">
        {id}
      </Link>
      <p className="myBooks__date">{format(new Date(date), "dd-MMMM-yyyy")}</p>
      <p className="myBooks__status">{status}</p>
    </div>
  );
};

export default MyBooks;

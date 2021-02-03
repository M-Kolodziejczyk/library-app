import React from "react";
import "./Book.css";

const Book = ({ book }) => {
  return (
    <div className="Book">
      <p>{book.title}</p>
    </div>
  );
};

export default Book;

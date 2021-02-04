import React from "react";
import { Link } from "react-router-dom";
import "./Book.css";

const Book = ({ book }) => {
  return (
    <Link to="/" className="book">
      <div className="row">
        <div className="col-2">
          <div className="book__img">
            <img
              src="https://media.libris.to/jacket/04423361_game-of-thrones-reissue.jpg"
              alt=""
            />
          </div>
        </div>
        <div className="col-8 d-flex flex-column justify-content-between">
          <p className="book__title">{book.title}</p>
          <p className="book__author">
            {`${book.author.firstName} ${book.author.lastName}`}
          </p>
          <p className="book__category">{book.category}</p>
          <p className="book__totalPages">Total pages: {book.totalPages}</p>
        </div>
        <div className="col-2 d-flex flex-column justify-content-between">
          <span className="book__status">Available</span>
          <button className="book__cartBtn">Add to cart</button>
        </div>
      </div>
    </Link>
  );
};

export default Book;

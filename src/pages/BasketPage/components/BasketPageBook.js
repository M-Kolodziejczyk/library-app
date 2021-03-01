import React from "react";
import "./BasketPageBook.css";

const BasketPageBook = ({ book, basket, deleteElement }) => {
  const handleDelete = e => {
    e.preventDefault();
    const newBasket = basket.filter(item => {
      return item.id !== book.id;
    });
    deleteElement(newBasket);
  };

  return (
    <div className="basketPageBook">
      <div className="basketPageBook__container">
        <div className="basketPageBook__img">
          <img src={book.link} alt="" />
        </div>
        <div className="basketPageBook__containerDescription">
          <p className="basketPageBook__title">{book.title}</p>
          <p className="basketPageBook__author">{book.authorName}</p>
          <p className="basketPageBook__category">{book.category}</p>
          <p className="basketPageBook__totalPages">
            Total pages: {book.totalPages}
          </p>
          <div className="basketPageBook__containerBtn">
            <button
              className="basketPageBook__deleteBtn"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketPageBook;

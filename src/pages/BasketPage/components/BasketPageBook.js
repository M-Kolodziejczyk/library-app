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
      <div className="row">
        <div className="col-2">
          <div className="basketPageBook__img">
            <img src={book.link} alt="" />
          </div>
        </div>
        <div className="col-8 d-flex flex-column justify-content-between">
          <p className="basketPageBook__title">{book.title}</p>
          <p className="basketPageBook__author">{book.authorName}</p>
          <p className="basketPageBook__category">{book.category}</p>
          <p className="basketPageBook__totalPages">
            Total pages: {book.totalPages}
          </p>
        </div>
        <div className="col-2 d-flex align-items-end">
          <button className="basketPageBook__deleteBtn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BasketPageBook;

import React from "react";
import "./BasketPage.css";
import { useBookContext } from "../../context/book/BookState";
import BasketBookPage from "./components/BasketPageBook";

const BasketPage = () => {
  const { basket, deleteFromBasket, deleteBasket } = useBookContext();

  const handleDelete = e => {
    e.preventDefault();
    deleteBasket();
  };

  return (
    <div className="container basketPage">
      <div className="basketPage__header">
        <div className="basketPage__headerH1">
          <h1>Your Books:</h1>
        </div>
        <div className="basketPage__headerBtn">
          <button onClick={handleDelete}>Delete all books</button>
        </div>
      </div>

      {basket.length > 0 ? (
        basket.map(e => (
          <BasketBookPage
            key={e.id}
            book={e}
            basket={basket}
            deleteElement={deleteFromBasket}
          />
        ))
      ) : (
        <p>You didn't add any books</p>
      )}
    </div>
  );
};

export default BasketPage;

import React from "react";
import "./BasketPage.css";
import { useBookContext } from "../../context/book/BookState";
import BasketBookPage from "./components/BasketPageBook";

const BasketPage = () => {
  const { basket, deleteFromBasket } = useBookContext();

  return (
    <div className="container basketPage">
      <h1>Your Books:</h1>
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

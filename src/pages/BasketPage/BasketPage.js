import React, { useEffect } from "react";
import "./BasketPage.css";
import { useBookContext } from "../../context/book/BookState";
import { useAuthContext } from "../../context/auth/AuthState";
import BasketBookPage from "./components/BasketPageBook";

const BasketPage = () => {
  const { user } = useAuthContext();
  const {
    basket,
    deleteFromBasket,
    deleteBasket,
    createOrder,
    orderSuccess,
    errorMessage,
    clearForm
  } = useBookContext();

  const handleDelete = e => {
    e.preventDefault();
    deleteBasket();
  };

  const handleOrder = e => {
    e.preventDefault();
    if (user !== null && "email" in user && basket.length > 0) {
      createOrder({
        user: user.sub,
        email: user.email,
        cart: basket.map(book => ({ id: book.id, title: book.title }))
      });
    }
  };

  useEffect(() => {
    if (orderSuccess) {
      deleteBasket();
    }

    // eslint-disable-next-line
  }, [orderSuccess]);

  useEffect(() => {
    clearForm();
  }, []);

  return (
    <div className="container basketPage">
      <div className="basketPage__header">
        <div className="basketPage__headerH1">
          <h1>Your Books:</h1>
        </div>
        {basket.length > 0 && (
          <div className="basketPage__headerBtn">
            <button onClick={handleDelete}>Delete all books</button>
          </div>
        )}
      </div>

      {basket.length > 0 && (
        <div className="basketPage__basketContent">
          {basket.map(e => (
            <BasketBookPage
              key={e.id}
              book={e}
              basket={basket}
              deleteElement={deleteFromBasket}
            />
          ))}
          <button onClick={handleOrder}>Order</button>
        </div>
      )}
      {basket.length === 0 && !orderSuccess && (
        <p className="basketPage__paragraph">You didn't add any books</p>
      )}
      {basket.length === 0 && orderSuccess && (
        <p className="basketPage__orderSuccess">Order Success</p>
      )}
      {!orderSuccess && errorMessage && (
        <p className="basketPage__orderFail">{errorMessage}</p>
      )}
    </div>
  );
};

export default BasketPage;

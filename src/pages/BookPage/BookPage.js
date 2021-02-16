import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/book/BookState";
import { format } from "date-fns";
import "./BookPage.css";

const BookPage = props => {
  const { book, getBook, addToBasket, basket } = useBookContext();
  const [state, setState] = useState({});
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  let { id } = useParams();

  const handleBasket = e => {
    e.preventDefault();
    if (basket.length === 0) {
      addToBasket(state);
    } else {
      basket.map(e => {
        if (e.id === state.id) {
          setError(true);
        }
      });
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    if (props.location.book) {
      setState(props.location.book);
    } else if (book.id === id) {
      setState(book);
    } else {
      getBook(id);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (book.id === id) {
      setState(book);
    }

    // eslint-disable-next-line
  }, [book]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (isSubmitting && !error) {
      addToBasket(state);
    } else {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  if (Object.keys(state).length === 0) {
    return (
      <div className="bookPage__container">
        <div className="bookPage__containerSpinner text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="bookPage container-xl">
        <div className="bookPage__img">
          <img src={state.link} alt="" />
        </div>
        <div className="bookPage__content">
          <div className="bookPage__contentHeader">
            <p className="bookPage__contentHeaderTitle">{state.title}</p>
            <span className="bookPage__contentHeaderStatus">Available</span>
          </div>
          <Link
            to={{ pathname: `/author/${state.authorID}` }}
            className="bookPage__contentAuthor"
          >
            {state.authorName}
          </Link>
          <p className="bookPage__contentPublisher">{state.publisher}</p>
          <p className="bookPage__contentCategory">{state.category}</p>
          <p className="bookPage__contentPublishedDate">
            {format(new Date(state.publishedDate), "yyyy-MM-dd")}
          </p>
          <p className="bookPage__contentLanguage">
            Language: {state.language}
          </p>
          <p className="bookPage__contentPages">{state.totalPages} pages</p>
          <p className="bookPage__contentDescription">{state.description} </p>
          {error ? (
            <span className="bookPage__contentError">
              Already added to basket!
            </span>
          ) : (
            <span className="bookPage__contentError hide">
              Already added to basket!
            </span>
          )}
          <button onClick={handleBasket} className="bookPage__contentBtn">
            Add to cart
          </button>
        </div>
      </div>
    );
  }
};

export default BookPage;

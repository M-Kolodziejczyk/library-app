import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/book/BookState";
import { format } from "date-fns";
import "./BookPage.css";

const BookPage = props => {
  const { book, getBook } = useBookContext();
  const [state, setState] = useState({});
  let { id } = useParams();

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
          <img
            src="https://media.libris.to/jacket/04423361_game-of-thrones-reissue.jpg"
            alt=""
          />
        </div>
        <div className="bookPage__content">
          <div className="bookPage__contentHeader">
            <p className="bookPage__contentHeaderTitle">{state.title}</p>
            <span className="bookPage__contentHeaderStatus">Available</span>
          </div>
          <p className="bookPage__contentAuthor">
            {state.author.firstName} {state.author.lastName}
          </p>
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
          <button className="bookPage__contentBtn">Add to cart</button>
        </div>
      </div>
    );
  }
};

export default BookPage;

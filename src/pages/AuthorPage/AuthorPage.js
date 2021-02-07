import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/book/BookState";
import { format } from "date-fns";
import "./AuthorPage.css";

const AuthorPage = props => {
  const { author, getAuthor } = useBookContext();
  const [state, setState] = useState({});
  let { id } = useParams();

  useEffect(() => {
    if (props.location.author) {
      setState(props.location.author);
    } else if (author.id === id) {
      setState(author);
    } else {
      getAuthor(id);
    }

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (author.id === id) {
      setState(author);
    }

    // eslint-disable-next-line
  }, [author]);

  if (Object.keys(state).length === 0) {
    return (
      <div className="authorPage__container">
        <div className="authorPage__containerSpinner text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="authorPage container-xl">
        <h1 className="authorPage__name">{`${state.firstName} ${state.lastName}`}</h1>
        <p className="authorPage__birthDate">
          Born: {format(new Date(state.birthDate), "yyyy-MM-dd")}
        </p>
        <p className="authorPage__description">{state.description}</p>
        <div className="authorPage__booksContainer">
          <p>Books</p>
        </div>
      </div>
    );
  }
};

export default AuthorPage;

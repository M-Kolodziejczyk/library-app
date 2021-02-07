import React, { useEffect } from "react";
import { useBookContext } from "../../context/book/BookState";
import "./AuthorsPage.css";
import Author from "./components/Author";

const AuthorsPage = () => {
  const { authors, listAuthors } = useBookContext();

  useEffect(() => {
    listAuthors();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="authorsPage">
      <div className="container-xl">
        <div className="row">
          <div className="col-3">
            <h3>Nav</h3>
          </div>
          <div className="col-9 authorsPage__content">
            <h1>Authors</h1>
            {authors.map(author => (
              <Author key={author.id} author={author} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthorsPage;

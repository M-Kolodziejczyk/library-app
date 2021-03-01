import React, { useEffect, useState } from "react";
import { useBookContext } from "../../context/book/BookState";
import "./AuthorsPage.css";
import Author from "./components/Author";

const AuthorsPage = () => {
  const [search, setSearch] = useState("");
  const { authors, listAuthors } = useBookContext();

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    listAuthors();

    // eslint-disable-next-line
  }, []);

  return (
    <div className="authorsPage">
      <div className="authorsPage__content">
        <h1>Authors</h1>
        <input
          type="text"
          className="authorsPage__contentSearch"
          onChange={handleSearch}
          value={search}
          placeholder="Search Author"
          autoFocus
        />
        {authors.map(
          author =>
            (author.firstName
              .toLowerCase()
              .includes(search.toLocaleLowerCase()) ||
              author.lastName.toLowerCase().includes(search.toLowerCase())) && (
              <Author key={author.id} author={author} />
            )
        )}
      </div>
    </div>
  );
};

export default AuthorsPage;

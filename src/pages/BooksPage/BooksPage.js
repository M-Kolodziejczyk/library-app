import React, { useEffect, useState } from "react";
import { useBookContext } from "../../context/book/BookState";
import Book from "./components/Book";
import "./BooksPage.css";

const BooksPage = () => {
  const { listBooks, books } = useBookContext();
  const [categoryInput, setCategoryInput] = useState("Action and Adventure");
  const [search, setSearch] = useState("");

  const categories = [
    "Action and Adventure",
    "Classics",
    "Comic Book or Graphic Novel",
    "Detective and Mystery",
    "Fantasy",
    "Horror",
    "Literary Fiction",
    "Romance",
    "Science Fiction"
  ];

  const handleCategory = e => {
    setCategoryInput(e.target.value);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    if (!Object.keys(books).includes(categoryInput)) {
      listBooks(categoryInput);
    }

    // eslint-disable-next-line
  }, [categoryInput]);

  return (
    <div className="booksPage">
      <div className="booksPage__container">
        <div className="booksPage__containerNav">
          <h2>Category</h2>
          <div>
            {categories.map((category, id) => (
              <div className="form-check" key={id}>
                <input
                  className="form-check-input"
                  type="radio"
                  name="radioInput"
                  id={category}
                  onChange={handleCategory}
                  value={category}
                  checked={categoryInput === category}
                />
                <label className="form-check-label" htmlFor={category}>
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="booksPage__containerBooks">
          <h1>Books</h1>
          <input
            type="text"
            className="booksPage__containerBooksSearch"
            onChange={handleSearch}
            value={search}
            placeholder="Search Book"
            autoFocus
          />
          {Object.keys(books).includes(categoryInput) &&
            books[categoryInput].length > 0 &&
            books[categoryInput].map(
              book =>
                book.title
                  .toLowerCase()
                  .includes(search.toLocaleLowerCase()) && (
                  <Book key={book.id} book={book} />
                )
            )}
        </div>
      </div>
    </div>
  );
};

export default BooksPage;

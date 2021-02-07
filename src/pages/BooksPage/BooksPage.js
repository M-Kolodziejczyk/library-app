import React, { useEffect } from "react";
import { useBookContext } from "../../context/book/BookState";
import Book from "./components/Book";
import "./BooksPage.css";

const BooksPage = () => {
  const { listBooks, books } = useBookContext();

  useEffect(() => {
    if (books.length === 0) {
      listBooks();
    }
  }, []);

  return (
    <div className="booksPage">
      <div className="container-xl">
        <div className="row">
          <div className="col-3">
            <h3>Nav</h3>
          </div>
          <div className="col-9 booksPage__content">
            <h1>Books</h1>
            {books.map(book => (
              <Book key={book.id} book={book} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BooksPage;

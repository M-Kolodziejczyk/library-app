import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Storage } from "aws-amplify";
import "./AuthorBook.css";

const AuthorBook = ({ book }) => {
  const [img, setImg] = useState("");

  const getBookImg = async id => {
    try {
      setImg(await Storage.get(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookImg(book.image.name);

    // eslint-disable-next-line
  }, []);

  if (img) {
    book.link = img;
  }

  return (
    <Link
      to={{ pathname: `/book/${book.id}`, book: book }}
      className="authorBook"
    >
      <div className="authorBook__img">
        <img src={img} alt="book image" />
      </div>
      <div className="authorBook__content">
        <p className="authorBook__title">{book.title}</p>
        <p className="authorBook__category">{book.category}</p>
        <p className="authorBook__totalPages">Total pages: {book.totalPages}</p>
        <p className="authorBook__description">{book.description}</p>
      </div>
    </Link>
  );
};

export default AuthorBook;

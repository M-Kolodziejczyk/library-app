import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import "./Book.css";

const Book = ({ book }) => {
  const history = useHistory();
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

  const handleClick = e => {
    e.preventDefault();
    history.push(`/author/${book.authorID}`);
  };

  return (
    <Link to={{ pathname: `/book/${book.id}`, book: book }} className="book">
      <div className="row">
        <div className="col-2">
          <div className="book__img">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="col-8 d-flex flex-column justify-content-between">
          <p className="book__title">{book.title}</p>
          <p onClick={handleClick} className="book__author">
            {book.authorName}
          </p>
          <p className="book__category">{book.category}</p>
          <p className="book__totalPages">Total pages: {book.totalPages}</p>
        </div>
        <div className="col-2 d-flex flex-column justify-content-between">
          <span className="book__status">Available</span>
          <button className="book__cartBtn">Add to cart</button>
        </div>
      </div>
    </Link>
  );
};

export default Book;

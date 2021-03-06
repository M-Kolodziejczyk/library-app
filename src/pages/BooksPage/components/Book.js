import React, { useEffect, useState } from "react";
import { Storage } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import { useBookContext } from "../../../context/book/BookState";
import "./Book.css";

const Book = ({ book }) => {
  const history = useHistory();
  const [img, setImg] = useState("");
  const [error, setError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addToBasket, basket } = useBookContext();

  const getBookImg = async id => {
    try {
      setImg(await Storage.get(id));
    } catch (error) {
      console.log(error);
    }
  };

  if (img) {
    book.link = img;
  }

  const handleClick = e => {
    e.preventDefault();
    history.push(`/author/${book.authorID}`);
  };

  const handleBasket = e => {
    e.preventDefault();
    if (basket.length === 0) {
      addToBasket(book);
    } else {
      basket.map(e => {
        if (e.id === book.id) {
          setError(true);
        }
      });
      setIsSubmitting(true);
    }
  };

  useEffect(() => {
    getBookImg(book.image.name);

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError(false);
    }, 2500);

    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    if (isSubmitting && !error) {
      addToBasket(book);
    } else {
      setIsSubmitting(false);
    }
  }, [isSubmitting]);

  return (
    <Link to={{ pathname: `/book/${book.id}`, book: book }} className="book">
      <div className="book__container">
        <div className="book__containerImg">
          <div className="book__img">
            <img src={img} alt="" />
          </div>
        </div>
        <div className="book__containerContent">
          <div className="book__Content">
            <p className="book__ContentTitle">{book.title}</p>
            <p onClick={handleClick} className="book__ContentAuthor">
              {book.authorName}
            </p>
            <p className="book__ContentCategory">{book.category}</p>
            <p className="book__ContentTotalPages">
              Total pages: {book.totalPages}
              {error && (
                <span className="book__ContentBasketError">
                  Already added to basket!
                </span>
              )}
            </p>
          </div>
          <div className="book__Info">
            <span className="book__InfoStatus">Available</span>

            <button className="book__InfoCartBtn" onClick={handleBasket}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Book;

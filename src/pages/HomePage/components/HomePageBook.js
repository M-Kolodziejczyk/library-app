import React, { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import { Link, useHistory } from "react-router-dom";
import "./HomePageBook.css";

const HomePageBook = ({ book }) => {
  const [img, setImg] = useState("");

  console.log(book);

  const getBookImg = async id => {
    try {
      setImg(await Storage.get(id));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBookImg(book.image);

    // eslint-disable-next-line
  }, []);

  return (
    <Link to={`/book/${book.id}`} className="homePageBook">
      <div className="homePageBook__container">
        <div className="homePageBook__containerImg">
          <img src={img} alt="book Img" />
        </div>
        <p className="homePageBook__containerTitle">{book.title}</p>
        <p className="homePageBook__containerAuthor">{book.authorName}</p>
      </div>
    </Link>
  );
};

export default HomePageBook;

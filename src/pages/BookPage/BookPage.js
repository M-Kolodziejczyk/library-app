import React from "react";
import { useParams } from "react-router-dom";
import "./BookPage.css";

const BookPage = prop => {
  console.log(prop);
  let { id } = useParams();
  console.log(id);
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
          <p className="bookPage__contentHeaderTitle">A Game of Thrones</p>
          <span className="bookPage__contentHeaderStatus">Available</span>
        </div>
        <p className="bookPage__contentAuthor">George R.R. Martin</p>
        <p className="bookPage__contentPublisher">Voyager Books</p>
        <p className="bookPage__contentCategory">fantasy</p>
        <p className="bookPage__contentPublishedDate">10.20.2012</p>
        <p className="bookPage__contentLanguage">Language: English</p>
        <p className="bookPage__contentPages">260 pages</p>
        <p className="bookPage__contentDescription">
          Upon the death of Lord Jon Arryn, the principal advisor to King Robert
          Baratheon, Robert recruits his childhood friend Eddard "Ned" Stark,
          now lord of the North, to replace Arryn as "Hand of the King", and to
          betroth his daughter Sansa to Robert's son Joffrey. Ned accepts the
          position when he learns that Arryn's widow Lysa believes he was
          poisoned by Robert's wife Queen Cersei Lannister and her family.
          Shortly thereafter, Ned's son Bran discovers Cersei having sex with
          her twin brother Jaime Lannister, who throws Bran from the tower to
          conceal their affair, leaving him comatose and paralyzing his legs.
        </p>
        <button className="bookPage__contentBtn">Add to cart</button>
      </div>
    </div>
  );
};

export default BookPage;

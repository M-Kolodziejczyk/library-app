import React from "react";
import { Link } from "react-router-dom";
import "./Author.css";

const Author = () => {
  return (
    <Link to="/" className="author">
      <p className="author__name">Gerorge R.R. Martin</p>
      <p className="author__birthDate">Born: 1994.05.23</p>
      <p className="author__description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae quo
        sed commodi, ab dicta debitis, suscipit delectus velit quisquam
        repellendus neque quidem molestias, odit atque similique placeat quasi
        consequuntur eius. Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Repudiandae quo sed commodi, ab dicta debitis, suscipit delectus
        velit quisquam repellendus neque quidem molestias, odit atque similique
        placeat quasi consequuntur eius. similique placeat quasi consequuntur
        eius.similique placeat quasi consequuntur eius.
      </p>
    </Link>
  );
};

export default Author;

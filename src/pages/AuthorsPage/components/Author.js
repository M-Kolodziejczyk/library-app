import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./Author.css";

const Author = ({ author }) => {
  return (
    <Link
      to={{
        pathname: `author/${author.firstName}-${author.lastName}`,
        author: author
      }}
      className="author"
    >
      <p className="author__name">{`${author.firstName} ${author.lastName}`}</p>
      <p className="author__birthDate">
        Born: {format(new Date(author.birthDate), "yyyy-MM-dd")}
      </p>
      <p className="author__description">{author.description}</p>
    </Link>
  );
};

export default Author;

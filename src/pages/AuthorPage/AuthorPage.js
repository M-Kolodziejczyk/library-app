import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBookContext } from "../../context/book/BookState";
import { format } from "date-fns";
import "./AuthorPage.css";

const AuthorPage = props => {
  const { author, getAuthor } = useBookContext();
  const [state, setState] = useState({});
  let { id } = useParams();

  useEffect(() => {
    if (props.location.author) {
      setState(props.location.author);
    }

    // eslint-disable-next-line
  }, []);

  return (
    <div className="authorPage">
      <h2>author</h2>
    </div>
  );
};

export default AuthorPage;

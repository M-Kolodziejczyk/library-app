import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import "./MyBooks.css";

const MyBooks = ({ order, id }) => {
  return (
    <div className="myBooks">
      <div className="myBooks__header">
        <p className="myBooks__containerId">
          <button
            className="myBooks__id "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target={`#order${id}`}
            aria-expanded="false"
            aria-controls={`order${id}`}
          >
            {order.id}
          </button>
        </p>
        <p className="myBooks__date">
          {format(new Date(order.createdAt), "dd-MMMM-yyyy")}
        </p>
        <p className="myBooks__status">{order.status}</p>
      </div>
      <div className="myBooks__Collapse">
        <div className="collapse" id={`order${id}`}>
          {order.books.items.map(book => (
            <div className="myBooks__CollapseContent" key={book.id}>
              <Link
                to={`book/${book.book_id}`}
                className="myBooks__CollapseTitle"
              >
                <b>Title:</b> {book.book.title}
              </Link>
              <p className="myBooks__CollapseStatus">{book.status}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBooks;

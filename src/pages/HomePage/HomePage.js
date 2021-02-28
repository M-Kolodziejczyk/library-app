import React, { useState, useEffect } from "react";
import "./HomePage.css";
import HomePageBook from "./components/HomePageBook";

const HomePage = () => {
  const books = [
    {
      id: "bc501371-f465-42ef-aa0f-02de3f9ae823",
      title: "Ashes of Victory",
      authorName: "David Weber",
      authorId: "a5c3095f-f574-46d6-82f3-23497aa455b7",
      image: "ashes_of-Victory.jpg"
    },
    {
      id: "85e4160d-d4e7-462a-bb9b-9e31dca51710",
      title: "Uncompromising Honor",
      authorName: "David Weber",
      authorId: "a5c3095f-f574-46d6-82f3-23497aa455b7",
      image: "uncompromising_honor.jpg"
    },
    {
      id: "67d17b4c-5d4b-4b5d-a798-3f1ad4d58b91",
      title: "Kris Longknife: Deserter",
      authorName: "Mike Sheperd",
      authorId: "f64cca56-928e-4b0e-9944-611f96c2d24a",
      image: "deserter.jpg"
    }
  ];

  return (
    <div>
      <div className="homePage">
        <div className="homePage__container">
          <h1 className="homePage__containerH1">
            The Wonderful World of Reading
          </h1>
          <p className="homePage__containerParagraph">
            The library is a place for everyone to explore, discover, and engage
          </p>
        </div>
      </div>
      <div className="homePage__booksContainer">
        <h2 className="homePage__booksContainerHeader">Our New Books</h2>
        <div className="homePage__booksContainerContent">
          {books.map(book => (
            <HomePageBook key={book.id} book={book} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;

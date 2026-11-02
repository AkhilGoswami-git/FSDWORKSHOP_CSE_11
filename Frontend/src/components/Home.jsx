import React from "react";
import books from "../assets/Books";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <h1 className="heading">Welcome to the Book Store</h1>

      <div className="book-container">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img
              className="book-image"
              src={book.poster}
              alt={book.title}
            />

            <div className="book-details">
              <h2>{book.title}</h2>
              <p>Author: {book.author}</p>
              <p>Price: ₹{book.price}</p>

              <button className="buy-btn">
                Buy Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
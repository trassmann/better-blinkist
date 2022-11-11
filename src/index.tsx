import * as ReactDOM from "react-dom/client";
import React from "react";

import Book from "./Book";

import { getAllBooks } from "./blinkist";

const run = async () => {
  const books = await getAllBooks();
  const root = ReactDOM.createRoot(document.body);
  root.render(
    <div className="root">
      {books.map((book) => (
        <Book key={book.title} book={book} />
      ))}
    </div>
  );
};

run();

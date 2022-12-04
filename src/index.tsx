import * as ReactDOM from "react-dom/client";
import React from "react";

import App from "./App";
import { getAllBooks } from "./blinkist";

const run = async () => {
  const books = await getAllBooks();
  const root = ReactDOM.createRoot(document.body);
  root.render(<App books={books} />);
};

run();

import * as React from "react";

import Chapter from "./Chapter";
import { Book } from "./blinkist";

export default ({ book }: { book: Book }) => {
  return (
    <div className="book">
      <h2>{book.title}</h2>
      {book.chapters.map((chapter) => (
        <Chapter key={chapter.title} chapter={chapter} />
      ))}
    </div>
  );
};

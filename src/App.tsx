import React from "react";
import _ from "lodash";

import Book from "./Book";
import { Book as BookType } from "./blinkist";

type Props = {
  books: BookType[];
};

const sortCycle = ["originalSortIdx", "title"];

export default ({ books }: Props) => {
  const [currentSortCycleIdx, setCurrentSortCycleIdx] = React.useState(0);

  const sortedBooks = React.useMemo(() => {
    return _.sortBy(books, sortCycle[currentSortCycleIdx]);
  }, [currentSortCycleIdx]);

  return (
    <div className="root">
      <header className="header">
        <div className="header-inner">
          <h1>All Books</h1>
          <button
            onClick={() =>
              setCurrentSortCycleIdx(currentSortCycleIdx === 0 ? 1 : 0)
            }
            type="submit"
            className="px-4 rounded border-none font-cera-pro font-medium text-base leading-5 text-center items-center justify-center no-underline outline-none cursor-pointer disabled:cursor-not-allowed bg-green text-white hover:text-white py-3"
          >
            Sort by {currentSortCycleIdx === 0 ? "title" : "date"}
          </button>
        </div>
      </header>

      {sortedBooks.map((book) => (
        <Book key={book.title} book={book} />
      ))}
    </div>
  );
};
